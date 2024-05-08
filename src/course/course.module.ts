import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { Register } from 'src/register/entities/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class,Course,Student,Register])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
