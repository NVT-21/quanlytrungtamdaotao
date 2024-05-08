import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }
  @Post(':studentId/:classId')
  markAttendance(@Param('studentId') studentId: string,@Param('classId') classId: string, @Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.markAttendance(+studentId, createAttendanceDto,+classId);
  }

  @Get("getAttendanceByClass/:classId/:lesson")
  getAttendanceByClass(@Param('classId') classId: string,@Param('lesson') lesson: string) {
    return this.attendanceService.getAttendanceByClass(+classId,+lesson);
  }
  @Get("statistics/:studentId/:classId/")
  statistic(@Param('classId') classId: string,@Param('studentId') studentId: string){
    return this.attendanceService.statisticsOfStudent(+classId,+studentId)
  }
  @Get("getAttendance")
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
