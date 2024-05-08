import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query } from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

 

  @Get('getAllCourse')
  @Render('index') // Assuming you are rendering some view
  async getAllCourse(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('name') name: string
  ) {
    try {
      const listCourse= await this.viewsService.findAllCourses(page, limit,name);
      const totalCourse=await listCourse.total
      const totalPage = Math.ceil(totalCourse / limit);
      return { courses: listCourse.data,
                totalPage: totalPage,
                currPage:page
       };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while retrieving the list of courses.');
    }
  }
  @Get('getAllTeacher')
  @Render('renderTeacher') // Assuming you are rendering some view
  async getAllTeacher(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('name') name: string
  ) {
    try {
      const listCourse= await this.viewsService.findAllTeacher(page, limit,name);
      const totalCourse=listCourse.total
      const totalPage = Math.ceil(totalCourse / limit);
      return { teachers: listCourse.data,
                totalPage: totalPage,
                currPage:page
       };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while retrieving the list of courses.');
    }
  }

  @Get('getAllClass')
  @Render('renderClass') // Assuming you are rendering some view
  async getAllClass(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('name') name: string
  ) {
    try {
      const listCourse= await this.viewsService.findAllClass(page, limit,name);
      const listClass=listCourse.data
      const newListClass = await Promise.all(listClass.map(async (item) => {
        const totalStudent = await this.viewsService.countStudentClass(item.idClass);
        return {
            ...item,
            totalStudent
        };
    }));
     
      const totalCourse=await listCourse.total
      const totalPage = Math.ceil(totalCourse / limit);
      const course = await this.viewsService.findCourse()
      return { classes: newListClass,
                totalPage: totalPage,
                currPage:page,
                course: course
       };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while retrieving the list of courses.');
    }
  }

  @Get('getAllStudent')
  @Render('renderStudent') // Assuming you are rendering some view
  async getAllStudent(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('name') name: string
  ) {
    try {
      const listCourse= await this.viewsService.findAllStudent(page, limit,name);
      const totalCourse=await listCourse.total
      const totalPage = Math.ceil(totalCourse / limit);
      const course = await this.viewsService.findCourse()
      return { student: listCourse.data,
                totalPage: totalPage,
                currPage:page,
                course: course
       };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while retrieving the list of courses.');
    }
  }
  
  @Get('getAllStudents')
  @Render('renderAllStudent')
  async renderStudent(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    
  ) {
    const totalCourse=await this.viewsService.totalStudent()
    const totalPage = Math.ceil(totalCourse / limit);
    const register = await this.viewsService.getAllStudent(page, limit);
    return {register,
      totalPage: totalPage,
                currPage:page,
    } 
  }
  @Get('createTeacher')
  @Render('CreateTeacher') 
  async createTeacher(){
    
  }
  @Get('addClass/:id')
  @Render('CreateClass')
  async addClass(@Param('id') id: string) {
    const course = await this.viewsService.findCourseById(+id);
   
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại ở đơn vị giây
    const nameClass = `${course.Name}_${currentTimeInSeconds}`;
const teachers = await this.viewsService.getAllTeacher()

    return { course,nameClass,teachers:teachers };
  }
  @Get('registerStudent')
  @Render('RegisterStudent')
  async registerStudent(){
    const courses = await this.viewsService.findCourse()
    return {courses}
  }
  @Get('StudentWaiting/:id')
  @Render('renderStudentWaiting')
  async StudentWaiting(@Param('id') id: string){
    
    const studentWaiting= await this.viewsService.studentWaiting(+id)
    const  listStudent =studentWaiting.listStudent
    const registerStudent = studentWaiting.listRegister
    listStudent.forEach(st =>{
      const date = new Date( st.BirthDay);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate= `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
      st.BirthDay = formattedDate;
     })
    return { registerStudent ,idClass:id}
  }
  @Get('StudentOfClass/:id')
  @Render('renderStudent')
  async getStudentOfClass(
    @Param('id') id: string,
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 8,
  ) {
   const Classes = await this.viewsService.getStudentOfClass(+id,page,limit)
   const totalPage = Math.ceil(Classes[0].register.length / limit);
   const register=Classes[0].register
   console.log(register)
   let student = []
   register.forEach(st =>{
    student.push(st.student)
   })
   student.forEach(st =>{
    const date = new Date( st.BirthDay);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate= `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
    st.BirthDay = formattedDate;
   })
    return { student,id,totalPage,page};
  }
  @Get('editCourse/:id')
  @Render('editCourse')
  async editCourse(@Param('id') id: string) {
    const course = await this.viewsService.findCourseById(+id);
    return { course };
  }
  @Get('editTeacher/:id')
  @Render('editTeacher')
  async editTeacher(@Param('id') id: string) {
    const teacher = await this.viewsService.findTeacherById(+id);
    return { teacher };
  }

  @Get('addCourse')
  @Render('CreateCourse')
 async addCourse() {
  
  }
 
 

  
}
