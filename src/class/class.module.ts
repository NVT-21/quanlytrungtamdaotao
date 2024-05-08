import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Course } from 'src/course/entities/course.entity';
import { Student } from 'src/student/entities/student.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Register } from 'src/register/entities/register.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class,Course,Student,Schedule,Register,Teacher])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
