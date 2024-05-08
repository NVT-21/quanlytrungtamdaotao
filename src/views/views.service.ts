import { HttpException, Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/entities/course.entity';
import { Equal, Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Register } from 'src/register/entities/register.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Class } from 'src/class/entities/class.entity';

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(Course)private readonly courseRepository: Repository<Course>,
    @InjectRepository(Student)private readonly StudentRepository: Repository<Student>,
    @InjectRepository(Register)private readonly registerRepository: Repository<Register>,
    @InjectRepository(Teacher)private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Class)private readonly classRepository: Repository<Class>
  ) {}
 
  editCourse(){
    
  }
  findCourse(){
    return this.courseRepository.find()
  }
  async findAllCourses(page: number = 1, limit: number = 10,name) {
    const skip = (page - 1) * limit;
    let query = this.courseRepository.createQueryBuilder('course');
  
    if (name) {
        query = query.where('course.name LIKE :name', { name: `%${name}%` });
    }
  
    const [course, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount(); // Sử dụng getManyAndCount để lấy danh sách lớp học và tổng số lượng lớp học
  
    return { data: course, total };
  }

  async findAllStudent(page: number = 1, limit: number = 10,name) {
    const skip = (page - 1) * limit;
    let query = this.StudentRepository.createQueryBuilder('student');
  
    if (name) {
        query = query.where('student.name LIKE :name', { name: `%${name}%` });
    }
  
    const [student, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount(); // Sử dụng getManyAndCount để lấy danh sách lớp học và tổng số lượng lớp học
  
    return { data: student, total };
  }

  async getCourse(){
    return this.courseRepository.find()
  }
  async getAllStudent(page: number = 1, limit: number = 10){
      const skip=(page - 1) * limit
    return await this.registerRepository.find({
      relations: ["student", "classes", "course"],
      skip: skip,
      take: limit,
    });
  }
  async getStudentOfClass(id:number,page: number = 1, limit: number = 4){
    const skip = (page - 1) *limit; // Tính toán giá trị của skip
    const students = await this.classRepository.find({
        where: { idClass: id },
        relations: ['register', 'register.student'],
        skip: skip,
        take: limit,
    });
    return students;
   }
   async findAllClass(page: number = 1, limit: number = 10, name: string): Promise<{ data: Class[], total: number }> {
    const skip = (page - 1) * limit;
    let query = this.classRepository.createQueryBuilder('class');
  
    if (name) {
        query = query.where('class.name LIKE :name', { name: `%${name}%` });
    }
  
    const [classes, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount(); // Sử dụng getManyAndCount để lấy danh sách lớp học và tổng số lượng lớp học
  
    return { data: classes, total };
  }
  
async totalClass(){
  return await this.classRepository.count()
}
async getAllTeacher(){
  return await this.teacherRepository.find({ where: { Status: Equal("đang dạy") } });
}
async findAllTeacher(page: number = 1, limit: number = 10, name: string): Promise<{ data: Teacher[], total: number }> {
  const skip = (page - 1) * limit;
  let query = this.teacherRepository.createQueryBuilder('teacher');

  if (name) {
      query = query.where('teacher.name LIKE :name', { name: `%${name}%` });
  }

  const [teachers, total] = await query
    .skip(skip)
    .take(limit)
    .getManyAndCount(); // Sử dụng getManyAndCount để lấy danh sách giáo viên và tổng số lượng giáo viên

  return { data: teachers, total };
}

findTeacherById(id){
  return this.teacherRepository.findOneBy({idTeacher:id})
}
async totalTeacher(){
  return await this.teacherRepository.count()
}
 async totalCourse(){
    return await this.courseRepository.count()
  }
  async totalStudent(){
    return await this.StudentRepository.count()
  }
  findCourseById(id){
    return this.courseRepository.findOneBy({idCourse:id})
  }
  findOne(id: number) {
    return `This action returns a #${id} view`;
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
    
    const listRegister = await this.registerRepository.find({
      where: {course: { idCourse: idCourse } , Status:Equal("Đang chờ")},
      relations: { student:true}
    })
    let listStudent =[]
    listRegister.forEach(st =>{
     
      
      listStudent.push(st.student)
    }) 

    return {listStudent,listRegister}
  }
  update(id: number, updateViewDto: UpdateViewDto) {
    return `This action updates a #${id} view`;
  }
  async countStudentClass(id: number)  {
    const query = `
    SELECT COUNT(*) as sl
    FROM register
    WHERE classesIdClass = ${id} AND Status = N'Đang học'
  `;
  const result = await this.registerRepository.query(query);
  // Trả về số lượng đăng ký đang trong trạng thái "Đang học"
  return result[0].sl;
  }
  remove(id: number) {
    return `This action removes a #${id} view`;
  }
}
