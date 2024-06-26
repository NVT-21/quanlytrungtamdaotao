import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Class } from 'src/class/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule,Class])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
