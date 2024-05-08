import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(room)private readonly roomRepository: Repository<room>,
  ) {}
  create(createRoomDto: CreateRoomDto) {
    const newRoom= this.roomRepository.create(createRoomDto)
    return this.roomRepository.save(newRoom)
  }

  findAll() {
    return this.roomRepository.find();
  }

  findOne(id: number) {
    return this.roomRepository.findOneBy({idRoom:id})
  }

 async update(id: number, updateRoomDto: UpdateRoomDto) {
   const room=await this.findOne(id)
   if (!room) {
    return {message:"room is not exist"}
  }
  
  // Check if the id in the updateRoomDto is different from the current id
  if (updateRoomDto.idRoom && updateRoomDto.idRoom !== room.idRoom) {
    // If it's different, attempt to find a room with the updated id
    const roomWithUpdatedId = await this.findOne(updateRoomDto.idRoom);

    // If a room with the updated id already exists, throw an error
    if (roomWithUpdatedId) {
      return {message:`:Room with id ${updateRoomDto.idRoom} already exists`}
    }
  }
   return this.roomRepository.save({...room,...updateRoomDto})
  }

 async remove(id: number) {
    const room = await this.findOne(id);
    return this.roomRepository.remove(room)
  }
}
