import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseFilters, Render } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { HttpExceptionFilter } from 'src/global-filter/http-exception.filter';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('createCourse')
  @UseFilters(HttpExceptionFilter)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }
  @Post('registerCourse')
  registerCourse(@Body() registerCourseDto: any) {
    return this.courseService.registerCourse(registerCourseDto);
  }
  @Get('getStudentOfCourse')
  getStudentOfCourse(){
    return this.courseService.getStudentOfCourse()
  }
  @Get('getAll')
  findAll() {
    return this.courseService.findAll();
  }
  @Render('index')
  root() {
    return this.courseService
    .findAll()
    .then((course) => course ?{course}:{course:[]})
  } 

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }
  
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
  @Get('search')
  async search(@Query('name') name: string) {
    return this.courseService.search(name);
  }
}
