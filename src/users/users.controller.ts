import {
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AccountTypeInformation } from '../account-type-informations/account-type-information.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { User } from './user.entity';
import { ScheduledDeposit } from '../scheduled-deposits/scheduled-deposit.entity';
import { UsersService } from './users.service';
import { IsNumber, IsDateString, Min } from 'class-validator';
import { Type } from '@nestjs/common';
import { parseISO, isFuture, formatISO } from 'date-fns';

class CreateAccountTypeInformationDto {
  @IsNumber()
  @Min(0)
  deposit_amount: number;

  @IsDateString()
  deposit_date: string;

  @IsNumber()
  user_id: number;
}

const validateDepositDate = (value: string) => {
  const parsedDate = parseISO(value);
  if (!isFuture(parsedDate)) {
    throw new BadRequestException('Deposit date must be a valid future date.');
  }
  return value;
};

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

  @Post('/account-type-information')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async createAccountTypeInformation(
    @Body() createAccountTypeInformationDto: CreateAccountTypeInformationDto,
  ) {
    try {
      const { deposit_amount, deposit_date, user_id } = createAccountTypeInformationDto;

      // Additional validation for deposit_date
      const validatedDepositDate = validateDepositDate(deposit_date);

      const accountTypeInformation = await AccountTypeInformation.validateAndCreate(deposit_amount, validatedDepositDate, user_id);
      const scheduledDeposit = await ScheduledDeposit.scheduleDeposit(accountTypeInformation, new Date(validatedDepositDate));

      return {
        message: 'Account type information and scheduled deposit have been saved successfully.',
        accountTypeInformation,
        scheduledDeposit,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
}