import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { scheduled } from 'rxjs';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('createClass/:id')
  create(@Param('id') id: string,@Body() createClassDto: CreateClassDto) {
    return this.classService.create(+id,createClassDto);
  }

  @Get('getAll')
  findAll() {
    return this.classService.findAll();
  }
  @Get('classByCourse/:name')
  findbyCourse(@Param('name') name: string){
    return this.classService.findByCourse(name)
  }
  // @Post('addStudent/:id')
  // addStudent(@Param('id') id: string,@Body() student:any){
  //   return this.classService.addStudent(+id,student)
  // }
  @Post('createSchedule/:id')
  createSchedule(@Param('id') id: string,@Body() schedule:any){
    return this.classService.createShedule(+id,schedule)
  }
  // @Get("countStudent")
  // countStudent(){
  //   return this.classService.countStudent()
  // }
  @Get("getAllStudent")
  getAllStudent() {
    return this.classService.getAllStudent()
  }
  @Patch('addStudent')
  addStudent(@Body() body:any){
    
    return this.classService.addStudent(body)
  }
  @Get('getSchedule/:id')
  getSchedule(@Param('id') id: string) {
    return this.classService.getScheduleOfClass(+id);
  }
  @Get('studentWaitng/:id')
  studentWaitng(@Param('id') id: string){
    return this.classService.studentWaiting(+id)
  }
  @Get('getStudentOfClass/:id')
  getStudentOfClass(@Param('id') id: string) {
    return this.classService.getStudentOfClass(+id);
  }
  @Get('getStudentWaiting/:id')
  getStudent(@Param('id') id: string) {
    return this.classService.getStudentWaiting(+id);
  }
  @Delete('deleteSchedule/:id')
  deleteSchedule(@Param('id') id: string){
    return this.classService.deleteSchedule(+id)
  }
  // @Post('addTeacher/:idTeacher/:idClass')
  // addTeacher(@Param('idTeacher')idTeacher: string,@Param('idClass')idClass: string){
  //   return this.classService.addTeacher(+idClass,+idTeacher)
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
  
}
