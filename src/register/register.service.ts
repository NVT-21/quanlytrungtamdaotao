import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Repository } from 'typeorm';
import { Register } from './entities/register.entity';

@Injectable()
export class RegisterService {
  constructor(
    
    @InjectRepository(Student)private readonly StudentRepository: Repository<Student>,
    @InjectRepository(Register)private readonly registerRepository: Repository<Register>
  ) {}
  create(createRegisterDto: CreateRegisterDto) {
    return 'This action adds a new register';
  }

  findAll() {
    return `This action returns all register`;
  }

  findOne(id: number) {
    return `This action returns a #${id} register`;
  }

 async updateStatus(id: number, updateRegisterDto: UpdateRegisterDto) {
  const result = await this.registerRepository.update(
    { student: { idStudent: id } }, // Điều kiện tìm kiếm
    updateRegisterDto // Dữ liệu cập nhật
  );

  if (result.affected === 0) {
    return { message: "not found student" };
  }

  return { message: "updated successfully" };
  // return await this.registerRepository.save(newRegister)
  }

  remove(id: number) {
    return `This action removes a #${id} register`;
  }
}
