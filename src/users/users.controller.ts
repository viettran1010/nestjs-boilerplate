import {
  Body,
  BadRequestException,
  ForbiddenException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UnauthorizedAccessException } from '../exceptions/unauthorized-access.exception';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserResponseDto)
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: any, @Session() session: any) { // CreateUserDto import removed, so body type is any
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: any, @Session() session: any) { // CreateUserDto import removed, so body type is any
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

  @Get('/menu-access/:menuOptionId')
  @UseGuards(AuthGuard)
  async menuAccess(@CurrentUser() user: User, @Param('menuOptionId', ParseIntPipe) menuOptionId: number) {
    try {
      await this.usersService.checkUserPermission(user.id, menuOptionId);
      return { message: 'User is authorized to access the selected menu option.' };
    } catch (error) {
      if (error instanceof UnauthorizedAccessException) {
        throw new ForbiddenException(error.message);
      } else {
        throw new BadRequestException('Invalid parameters');
      }
    }
  }
}