import {
  Body,
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { I18nService } from '@nestjs-modules/i18n';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ContractValidationDto } from './dtos/contract-validation.dto'; // Assuming this DTO exists

@Controller('auth')
@Serialize(UserResponseDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
    private i18n: I18nService,
  ) {}

  @Post('/validate-contract')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async validateContractInformation(@Body() contractInfo: ContractValidationDto) {
    const errors = [];
    const currentDate = new Date();

    // Check if all required fields are provided
    const requiredFields = ['contract_id', 'customer_id', 'customer_name_katakana', 'bank_code', 'branch_code', 'account_type', 'account_number', 'opening_date', 'deposit_period', 'maturity_date', 'interest_rate'];
    for (const field of requiredFields) {
      if (contractInfo[field] === undefined) {
        errors.push(this.i18n.translate('errors.missingField', { args: { field }, lang: 'en' }));
      }
    }

    // Validate 'opening_date' is not in the future
    if (contractInfo.opening_date && contractInfo.opening_date > currentDate) {
      errors.push(this.i18n.translate('errors.openingDateInFuture', { lang: 'en' }));
    }

    // Validate 'maturity_date' is after 'opening_date'
    if (contractInfo.maturity_date && contractInfo.opening_date && contractInfo.maturity_date <= contractInfo.opening_date) {
      errors.push(this.i18n.translate('errors.maturityDateBeforeOpeningDate', { lang: 'en' }));
    }

    // Validate 'interest_rate' is within acceptable range
    // Assuming there is a defined range for interest rates
    const minInterestRate = 0.0;
    const maxInterestRate = 10.0;
    if (contractInfo.interest_rate && (contractInfo.interest_rate < minInterestRate || contractInfo.interest_rate > maxInterestRate)) {
      errors.push(this.i18n.translate('errors.interestRateOutOfRange', { args: { min: minInterestRate, max: maxInterestRate }, lang: 'en' }));
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.i18n.translate('messages.validationSuccess', { lang: 'en' });
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