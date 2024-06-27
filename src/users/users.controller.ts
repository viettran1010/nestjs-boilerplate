import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UsePipes,
  UseGuards,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { ValidationPipe } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { MenuOption } from '../menu-options/menu-option.entity';
import { UnauthorizedAccessException } from './exceptions/unauthorized-access.exception';

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
    return await this.usersService.update(parseInt(id), body);
  }

  @Get('/menu-options')
  @UseGuards(AuthGuard)
  async getMenuOptions(@CurrentUser() user: User) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersService.getMenuOptions(user.id);
  }

  @Get('/api/menu-options/access')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async validateUserAccess(
    @Query('user_id') userId: number,
    @Query('menu_option_id') menuOptionId: number,
  ) {
    try {
      await this.usersService.validateUserAccess(userId, menuOptionId);
      const menuOption = await this.menuOptionsRepository.findOneBy({ id: menuOptionId });
      if (!menuOption) {
        throw new HttpException('Menu option does not exist', HttpStatus.NOT_FOUND);
      }
      return {
        status: HttpStatus.OK,
        access_granted: true,
        menu_option: menuOption,
      };
    } catch (error) {
      throw new UnauthorizedAccessException();
    }
  }
}