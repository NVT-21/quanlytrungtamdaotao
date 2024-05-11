import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Module({
    imports: [TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    JwtModule.register({}),

  ],
   controllers: [AuthController],
   providers: [AuthService,JwtStrategy]
  })
export class AuthModule{

}