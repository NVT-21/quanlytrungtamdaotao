import { HttpException, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Class)private readonly classRepository: Repository<Class>,

  ) {}
  async create(id:number, scheduleClassDto: CreateScheduleDto) {
   
    const newSchedule = this.scheduleRepository.create(scheduleClassDto)
    return this.scheduleRepository.save(newSchedule);
  }

  findAll() {
    return this.scheduleRepository.find()
  }
 
  findEndDay(data){ 
const startDate = data.startDate; // 1/4/2024

const schedule = data.schedule

if(!startDate || !schedule){
  throw new HttpException("bạn chưa điền đủ thông tin",400)
}

const totalSessions = data.totalSessions;
let count=0
let endDate = new Date(startDate);
console.log(schedule)
// Chuyển đổi số biểu thị thứ sang chuỗi
let days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
while(count < totalSessions){

  if(schedule.includes(days[endDate.getDay()])){
    count ++;
  }
  endDate.setDate(endDate.getDate()+1)  
}
const formattedEndDate = endDate.toLocaleDateString('en-US');
return {endDay:formattedEndDate,status:"Success"};
  }
  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
