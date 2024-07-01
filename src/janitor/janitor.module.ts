import { Module } from '@nestjs/common';
import { JanitorController } from './janitor.controller';
import { JanitorService } from './janitor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Janitor } from './janitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Janitor])],
  controllers: [JanitorController],
  providers: [JanitorService],
  exports: [JanitorService],
})
export class JanitorModule {}