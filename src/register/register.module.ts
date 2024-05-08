import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/class/entities/class.entity';
import { Course } from 'src/course/entities/course.entity';
import { Student } from 'src/student/entities/student.entity';
import { Register } from './entities/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class,Course,Student,Register])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
