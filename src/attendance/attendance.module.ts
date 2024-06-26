import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Attendance } from './entities/attendance.entity';
import { Class } from 'src/class/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Attendance,Class])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
