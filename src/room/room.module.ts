import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { room } from './entities/room.entity';


@Module({
  imports: [TypeOrmModule.forFeature([room])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
