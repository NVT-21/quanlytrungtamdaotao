import { HttpException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Equal, Like, Repository } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { format, parse } from 'date-fns';
import { Register } from 'src/register/entities/register.entity';
import { HttpExceptionFilter } from 'src/global-filter/http-exception.filter';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)private readonly courseRepository: Repository<Course>,
    @InjectRepository(Student)private readonly StudentRepository: Repository<Student>,
    @InjectRepository(Register)private readonly registerRepository: Repository<Register>,
    @InjectRepository(Class)private readonly classRepository: Repository<Class>
  ) {}
 async create(CoursecourseDto: CreateCourseDto) {
    try {
     console.log(CoursecourseDto)
      if(!CoursecourseDto.Name){
       throw new HttpException("not have nameCourse",400)
      }
      CoursecourseDto.status="Đang giảng dạy"
      const newCourse = this.courseRepository.create(CoursecourseDto);
      const savedCourse = await this.courseRepository.save(newCourse);
      
      return {savedCourse,status:"Success"}
  } catch (error) {
      // Handle the error
      console.error('Error creating and saving course:', error);
      throw error; // Re-throw the error to propagate it upwards
  }
  }

  findAll() {
    return this.courseRepository.find();
  }
  async registerCourse(registerCourseDto:any){
    const { BirthDay, Name, Sex, Status, PhoneNumber, nameCourse,nameClass, deposit, tuitionStatus } = registerCourseDto;
  

  const newStudent = await this.StudentRepository.create({
    deposit,
    tuitionStatus,
    Name,
    Sex,
    Status,
    PhoneNumber,
    BirthDay
  });

  // Lưu newStudent vào cơ sở dữ liệu trước
  await this.StudentRepository.save(newStudent);

  
  
 
  if(nameCourse && newStudent &&!nameClass) {
    const curCourse = await this.courseRepository.findOne({
      where: { Name: nameCourse },
    });
    const newRegister=new Register()
    newRegister.student=newStudent;
    newRegister.course=curCourse;
    newRegister.Status="Đang chờ "
    return this.registerRepository.save(newRegister);
  }
  else if(nameCourse && newStudent && nameClass) {
    const curCourse = await this.courseRepository.findOne({
      where: { Name: nameCourse },
    });
    const currClass = await this.classRepository.findOne({
      where: { Name: nameClass },
    })
    const newRegister=new Register()
    newRegister.student=newStudent;
    newRegister.course=curCourse;
    newRegister.classes=currClass;
    newRegister.Status="Đang học "
    return {register:this.registerRepository.save(newRegister),status:"Success"};
  }
   else {
    return 'message: not found course ' + nameCourse;
  }
    
  
  }
  async getStudentOfCourse(){
   return this.registerRepository.find(
    {
      where: { Status:  Equal("Đang chờ")},
      relations:{
        student:true
      }
    })
  }
 
  findOne(id: number) {
    return this.courseRepository.findOneBy({idCourse:id})
  }

 async update(id: number, updateCourseDto: UpdateCourseDto) {
   const course=await this.findOne(id)
   if (!course) {
    throw new HttpException("course is not exist",400) 
  }
  
  // Check if the id in the updateCourseDto is different from the current id
  if (updateCourseDto.idCourse && updateCourseDto.idCourse !== course.idCourse) {
    // If it's different, attempt to find a course with the updated id
    const courseWithUpdatedId = await this.findOne(updateCourseDto.idCourse);

    // If a course with the updated id already exists, throw an error
    if (courseWithUpdatedId) {
      throw new HttpException(`:course with id ${updateCourseDto.idCourse} already exists`,400)
    }
  }
   return {newCourse:this.courseRepository.save({...course,...updateCourseDto}),status:"Success"}
  }

 async remove(id: number) {
    const course = await this.findOne(id);
    if(!course) {
      throw new HttpException("not found course",400)
    }
    return this.courseRepository.remove(course)
  }
 async search(Name: string){
    const course =await this.courseRepository.find({
      where: {
      Name: Like(`%${Name}%`), 
    },})
    return course
  }

}

