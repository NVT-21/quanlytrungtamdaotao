import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { format, parse } from 'date-fns';
import { Register } from 'src/register/entities/register.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)private readonly StudentRepository: Repository<Student>,
    @InjectRepository(Register)private readonly registerRepository: Repository<Register>,
  ) {}
  create(createStudentDto: CreateStudentDto) {
  const{BirthDay,Name,Sex,Status,PhoneNumber,tuitionStatus,deposit}=createStudentDto
  const parsedDate = parse(BirthDay, 'dd-MM-yyyy', new Date());
  const formattedDate = format(parsedDate, 'yyyy-MM-dd'); 
  const newStudent= this.StudentRepository.create({tuitionStatus,deposit,Name,Sex,Status,PhoneNumber,BirthDay:formattedDate})
  this.StudentRepository.save(newStudent)
  
  }

  findAll() {
    return this.StudentRepository.find();
  }

  findOne(id: number) {
    return this.StudentRepository.findOneBy({idStudent:id})
  }

 async update(id: number, updateStudentDto: UpdateStudentDto) {
   const Student=await this.findOne(id)
   if (!Student) {
    return {message:"Student is not exist"}
  }
  
  // Check if the id in the updateStudentDto is different from the current id
  if (updateStudentDto.idStudent && updateStudentDto.idStudent !== Student.idStudent) {
    // If it's different, attempt to find a Student with the updated id
    const StudentWithUpdatedId = await this.findOne(updateStudentDto.idStudent);

    // If a Student with the updated id already exists, throw an error
    if (StudentWithUpdatedId) {
      return {message:`:Student with id ${updateStudentDto.idStudent} already exists`}
    }
  }
   return this.StudentRepository.save({...Student,...updateStudentDto})
  }

 async remove(id: number) {
    const Student = await this.findOne(id);
    return this.StudentRepository.remove(Student)
  }
}
