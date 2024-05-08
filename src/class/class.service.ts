import { HttpException, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { Course } from 'src/course/entities/course.entity';
import { format, parse } from 'date-fns';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Student } from 'src/student/entities/student.entity';
import { Register } from 'src/register/entities/register.entity';
import { equal } from 'assert';

import { Teacher } from 'src/teacher/entities/teacher.entity';
import { ScheduleDto } from './dto/schedule.dto';


@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)private readonly classRepository: Repository<Class>,
    @InjectRepository(Course)private readonly courseRepository: Repository<Course>,
    @InjectRepository(Student)private readonly StudentRepository: Repository<Student>,
    @InjectRepository(Schedule)private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Register)private readonly registerRepository: Repository<Register>,
    @InjectRepository(Teacher)private readonly teacherRepository: Repository<Teacher>,


  ) {}
  async create(id: number, createClassDto: CreateClassDto) {
    let { Name, startDay,endDay,NumeberStudent,status } = createClassDto;
    // const parsedStartDate = parse(startDay, 'dd-MM-yyyy', new Date());
    status = "Đang học"
    // Format the parsed date as "MM/dd/yyyy"
    // const formattedStartDate = format(parsedStartDate, 'yyyy-MM-dd');
    // const parsedEndDate = parse(endDay, 'dd-MM-yyyy', new Date());

    // Format the parsed date as "MM/dd/yyyy"
    // const formattedEndDate = format(parsedEndDate, 'yyyy-MM-dd');
    const newClass = this.classRepository.create({
      Name,
      NumeberStudent,
      startDay,
      endDay,
      Status:status
      
    })
    const curCourse=await this.courseRepository.findOneBy({idCourse: id})
    newClass.course=curCourse
    return this.classRepository.save(newClass);
  }

  findAll() {
    return this.classRepository.find()
  }
  async findByCourse(name:string){
    return this.courseRepository.find({
      where: { Name: name },
       relations:
     {  
       classes:true
     }
    })
   }
//  async createShedule(id:number,schedule: Schedule){

//     const newSchedule = this.scheduleRepository.create(schedule);
//     const currClass = await this.classRepository.findOneBy({idClass: id})
//     console.log(newSchedule)
//     currClass.schedule = [newSchedule]
//     return this.classRepository.save(currClass)

//    }
  async createShedule(id:number, schedule:ScheduleDto){
    const {weekdays,startTime,endTime,nameTeacher} = schedule
    const currTeacher = await this.teacherRepository.findOneOrFail({ where: { Name:Equal(nameTeacher)  } });
    const newschedule=this.scheduleRepository.create({
      weekdays,
      startTime,
      endTime
    })
    await this.scheduleRepository.save(newschedule)
    const currClass = await this.classRepository.findOne({
      where: { idClass: id },
       relations:
     {  
       schedule:true
     }
    })
    if(newschedule&& currTeacher){
      newschedule.teacher = currTeacher
    }
    if (currClass) {
      // Kiểm tra xem lớp đã có lịch học hay chưa
      if (currClass.schedule) {
        // Nếu có lịch học, thêm lịch mới vào danh sách
        currClass.schedule.push(newschedule);
      } else {
        // Nếu chưa có lịch học, tạo danh sách mới với lịch mới
        currClass.schedule = [newschedule];
      }
  
      // Lưu lại thông tin lớp với lịch học mới
      return {class:this.classRepository.save(currClass),status:"Success"};
    } else {
     
        throw new HttpException ("Class not found",400)
    }
      
    
  }
  async getAllStudent(){
    return await this.registerRepository.find({
      relations: ["student", "classes", "course"]
    });
  }
 async getScheduleOfClass(id:number){
  return await this.classRepository.find({
    where: { idClass: id },
     relations:
   {  
     schedule:true,
    
   }
  })
 }
 async getStudentOfClass(id:number){
  return await this.classRepository.find({
    where: { idClass: id },
    relations: ['register', 'register.student'],
  })
 }
//  async addTeacher(idClass:number,idStudent:number){
//   const currTeacher=  await this.teacherRepository.findOne({
//     where: { idTeacher:Equal(idStudent)  },
//   })
//   const currClass= await this.classRepository.findOne({
//     where: { idClass}
//   })
//   if(!currTeacher){
//     throw new Error("Teacher not found")
//   }
//   else if(!currClass){
//     throw new Error("Class not found")
//   }
//   else{
//   if(currClass.teacher){
//     currClass.teacher.push(currTeacher)
//   }
//   else{ 
//     currClass.teacher=[currTeacher]
//   }
//   return await this.classRepository.save(currClass)
//   }
//  }
 async deleteSchedule(id: number) {
  return await this.scheduleRepository
    .createQueryBuilder('schedule')
    .delete()
    .where('idSchedule = :idSchedule', { idSchedule: id })
    .execute();
}
async countStudent(id){
  const query = `
      SELECT COUNT(*) as sl
      FROM register
      WHERE classesIdClass = ${id} AND Status = N'Đang học'
    `;
    const result = await this.registerRepository.query(query);
    // Trả về số lượng đăng ký đang trong trạng thái "Đang học"
    return result[0].sl;
}
async addStudent(body: any){
 
  const currRegister =await this.registerRepository.findOne({
    where:{registerId:body.idRegister}
  })
  const currClass =await this.classRepository.findOne({
    where:{idClass:body.idClass}
  })
  console.log(body)
  if(!currClass){
throw new HttpException("class not found",400)
  }
  const currNumeberStudent=await this.countStudent(currClass.idClass)
  const totalStudent= currClass.NumeberStudent
  if(currNumeberStudent>=totalStudent){
    throw new HttpException("Lớp học đã đầy ",400)
  }

  if (!currRegister) {
    throw new HttpException('Registration not found',400);
  }
  currRegister.Status="Đang học"
  currRegister.classes=currClass
  return {register:this.registerRepository.save(currRegister) ,status:"Success"};
}
  //  async addStudent(id:number, student:Student){
  //   const newStudent=this.StudentRepository.create(student)
  //   const currClass = await this.classRepository.findOne({
  //     where: { idClass: id },
  //   })
  //   if (currClass) {
     
  //   } else {
  //     // Xử lý khi không tìm thấy lớp
  //     return "message:Class not found"
  //   }
  //  }
  //  async getStudentOfClass(id:number){
  //   return await this.classRepository.find({
  //     where: { idClass: id },
  //      relations:
  //    {  
  //      student:true
  //    }
  //   })
  //  }
  async getStudentWaiting(idCourse:number){
    const listStudent = await this.registerRepository.find({
      where: { Status:Equal("Đang chờ")},
      relations: { student:true}
    })
    return listStudent
  }
  async studentWaiting(id: number) {
    const curClass =await this.classRepository.findOne({
      where: {idClass:id},
      relations:['course']
    })
    if(!curClass){
      throw new HttpException("not found class",400)
    }
    const idCourse=curClass.course.idCourse
    
    const listStudent = await this.registerRepository.find({
      where: {course: { idCourse: idCourse } , Status:Equal("Đang chờ")},
      relations: { student:true}
    })
    return listStudent
    
  }
  findOne(id: number) {
    
    return `This action returns a #${id} class`;
  }
 

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
