import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Register } from 'src/register/entities/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student,Register])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
