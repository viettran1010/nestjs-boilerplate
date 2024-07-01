import {
  Body,
  Controller,
  Delete, 
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AddressUpdateDto } from './dtos/address-update.dto'; // Ensure this file exists or create it
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AddressUpdate } from '../address_updates/address_update.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { AddressUpdateService } from '../address_updates/address_update.service'; // Ensure this file exists or create it
import { AuditLogService } from '../audit_logs/audit_log.service'; // Ensure this file exists or create it
import { AuditAction } from '../audit_logs/audit-action.enum'; // Ensure this enum exists or create it

@Controller('auth')
@Serialize(UserResponseDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
    private addressUpdateService: AddressUpdateService,
    private auditLogService: AuditLogService,
  ) {}

  @Post('/address-update/process')
  async initiateAddressUpdate(@Body() body: AddressUpdateDto, @CurrentUser() user: User) {
    // Validate user permission
    const hasPermission = await this.usersService.validateUserPermission(user.id, 'address_update');
    if (!hasPermission) {
      throw new HttpException('User does not have permission to initiate address update', HttpStatus.FORBIDDEN);
    }

    // Create and save the AddressUpdate entity
    const addressUpdate = new AddressUpdate();
    addressUpdate.user = user;
    addressUpdate.file_attachment = body.address_update_file;
    addressUpdate.date_to_start_converting = body.date_to_start_converting;
    addressUpdate.date_of_end_converting = body.date_of_end_converting;
    await this.addressUpdateService.create(addressUpdate);

    // Log the action in AuditLog
    const auditLog = new AuditLog();
    auditLog.action = AuditAction.ADDRESS_UPDATE_INITIATED;
    auditLog.timestamp = new Date();
    auditLog.user_id = user.id;
    await this.auditLogService.create(auditLog);

    return { message: 'Address update process initiated successfully' };
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return await this.usersService.findOne(parseInt(id));
  }

  @Get()
  async findUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(parseInt(id), body);
  }
}