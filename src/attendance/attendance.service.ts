import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Class } from 'src/class/entities/class.entity';
import { format, parse } from 'date-fns';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Class)private readonly classRepository: Repository<Class>
  ) {}
  create(createAttendanceDto: CreateAttendanceDto) {
 
    return 'This action adds a new attendance';
  }
 async markAttendance(studentId: number, createAttendanceDto:CreateAttendanceDto,classId:number) {
  const{date,status,lesson}=createAttendanceDto
  const parsedDate = parse(date, 'dd-MM-yyyy', new Date());
  const formattedDate = format(parsedDate, 'yyyy-MM-dd');
  const newAttendance = this.attendanceRepository.create({status,date:formattedDate,lesson});

  // Fetch the student and class entities
  const student = await this.studentRepository.findOneBy({idStudent:studentId});
  const classEntity = await this.classRepository.findOneBy({idClass:classId});



  // Assign the fetched entities to the relationships
  newAttendance.student = student;
  newAttendance.classes = classEntity;

 return  await this.attendanceRepository.save(newAttendance);
  
 
  
    

  }
  async getAttendanceByClass(classId:number,lesson:number){
    return await this.attendanceRepository.find({
      where: { 
        classes: { idClass: classId }, 
        lesson:lesson
      },
       relations:
     {  
       classes:true,
       student:true
     }
    })

  }
  async statisticsOfStudent(idClass:number,idStudent:number){
    let numberAbsent=0
    let numberAttendance=0
    const listAttendance=  await this.attendanceRepository.find({
      where: { 
        classes: { idClass: idClass }, 
        student: { idStudent: idStudent}, 
      },
       relations:
     {  
       classes:true,
       student:true
     }
     })
     for (const attendance of listAttendance) {
      if(attendance.status==="vắng")
      {
        numberAbsent+=1
      }
      else{
        numberAttendance+=1
      }
      // Thực hiện công việc với mỗi đối tượng attendance
    
    }
    return {numberAbsent,numberAttendance}
  }
  findAll() {
    return this.attendanceRepository.find({ relations: ['student', 'classes'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
