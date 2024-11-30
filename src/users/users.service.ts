import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ContractValidationDto } from './dtos/contract-validation.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    // to make sure user is valid before saving
    // also hooks are called
    const user = this.usersRepository.create({ email, password });
    return await this.usersRepository.save(user);
  }

  async validateContract(contractValidationDto: ContractValidationDto) {
    // Here you would implement the validation logic as per the business logic document
    // For example, checking if the 'opening_date' is not in the future
    if (contractValidationDto.opening_date > new Date()) {
      throw new BadRequestException('Opening date cannot be in the future.');
    }

    // Checking if the 'maturity_date' is after the 'opening_date'
    if (contractValidationDto.maturity_date <= contractValidationDto.opening_date) {
      throw new BadRequestException('Maturity date must be after the opening date.');
    }

    // Checking if the 'interest_rate' is within the acceptable range
    // Assuming there is a defined range for interest rates
    const minInterestRate = 0.0;
    const maxInterestRate = 10.0;
    if (contractValidationDto.interest_rate < minInterestRate || contractValidationDto.interest_rate > maxInterestRate) {
      throw new BadRequestException(`Interest rate must be between ${minInterestRate} and ${maxInterestRate}.`);
    }

    // If all validations pass, return a success message
    return 'Contract information is valid.';
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return await this.usersRepository.findOneBy({ id });
  }

  async find(email: string) {
    console.log('email: ', email);
    return await this.usersRepository.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return await this.usersRepository.remove(user);
  }
}