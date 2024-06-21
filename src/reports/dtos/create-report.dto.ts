import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  IsEmail,
  Matches,
  MinLength,
  Max,
  Min,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEqualTo', async: false })
export class IsEqualToConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return propertyValue === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must match ${relatedPropertyName}`;
  }
}

export class ReportsRegistrationDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  password: string;

  @IsString()
  @ValidateIf(o => o.password && o.password_confirmation)
  @IsEqualToConstraint('password', {
    message: 'password_confirmation must match password',
  })
  password_confirmation: string;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}