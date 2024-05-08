import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Equal, Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { format, parse } from 'date-fns';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)private readonly teacherRepository: Repository<Teacher>,
   
  ) {}
 async create(createTeacherDto: CreateTeacherDto) {
  console.log(createTeacherDto)
  const{Name,BirthDate,Sex,Status}=createTeacherDto
 
  const newTeacher= this.teacherRepository.create({Name,Sex,Status,BirthDate})
  
 return await this.teacherRepository.save(newTeacher)
  }

  findAll() {
    return this.teacherRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher=await this.teacherRepository.findOneBy({idTeacher:Equal(id)})
    if (!teacher) {
     return {message:"teacher is not exist"}
   }
   
   // Check if the id in the updateTeacherDto is different from the current id
  //  if (updateTeacherDto.idTeacher && updateTeacherDto.idTeacher !== teacher.idTeacher) {
  //    // If it's different, attempt to find a teacher with the updated id
  //    const teacherWithUpdatedId = await this.teacherRepository.findOneBy({idTeacher:Equal(id)})
 
  //    // If a teacher with the updated id already exists, throw an error
  //    if (teacherWithUpdatedId) {
  //      return {message:`:teacher with id ${updateTeacherDto.idTeacher} already exists`}
  //    }
  //  }
    return {teacher:this.teacherRepository.save({...teacher,...updateTeacherDto}),status:"Success"}
  }

  async remove(id: number) {
    const teacher = await this.teacherRepository.findOneBy({idTeacher:Equal(id)});
    return this.teacherRepository.remove(teacher)
  }
}
