import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get('getAll')
  findAll() {
    return this.roomService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch('updateRoom/:id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete('deleteRoom/:id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
