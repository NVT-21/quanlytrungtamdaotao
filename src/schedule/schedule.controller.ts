import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('createSchedule/:id')
  create(@Param('id') id: string,@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(+id,createScheduleDto);
  }

  @Get('getAll')
  findAll() {
    return this.scheduleService.findAll();
  }
  @Post('findEndDay')
  findEndDay(@Body() data) {
    return this.scheduleService.findEndDay(data)
  }
 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
