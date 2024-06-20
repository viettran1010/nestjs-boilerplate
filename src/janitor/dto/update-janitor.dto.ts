import { PartialType } from '@nestjs/mapped-types';
import { CreateJanitorDto } from './create-janitor.dto';

export class UpdateJanitorDto extends PartialType(CreateJanitorDto) {}
