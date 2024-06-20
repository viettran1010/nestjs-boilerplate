import { Module } from '@nestjs/common';
import { JanitorService } from './janitor.service';
import { JanitorController } from './janitor.controller';

@Module({
  controllers: [JanitorController],
  providers: [JanitorService],
})
export class JanitorModule {}
