import { Module } from '@nestjs/common';
import { JanitorService } from './services/janitor.service';
import { JanitorController } from './controllers/janitor.controller';

@Module({
  controllers: [JanitorController],
  providers: [JanitorService],
})
export class JanitorModule {}