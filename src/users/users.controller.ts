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
  UsePipes,
  HttpException,
  HttpStatus,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserResponseDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

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
    try {
      return await this.usersService.update(parseInt(id), body);
    } catch (error) {
      if (error.message === 'DuplicateRecordException') {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Cannot update record due to duplicate email or user_id',
        }, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  @Put('/students/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateStudentRecord(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedStudent = await this.usersService.updateStudentRecord(parseInt(id), updateUserDto);
      return {
        status: HttpStatus.OK,
        message: 'Student record updated successfully.',
        student: updatedStudent,
      };
    } catch (error) {
      throw new HttpException({ status: error.status, error: error.message }, error.status);
    }
  }
}