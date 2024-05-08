import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from './room/room.module';
import { ClassModule } from './class/class.module';
import { CourseModule } from './course/course.module';
import { BaseModule } from './base/base.module';
import { ScheduleModule } from './schedule/schedule.module';
import { StudentModule } from './student/student.module';
import { AttendanceModule } from './attendance/attendance.module';
import { RegisterModule } from './register/register.module';
import { TeacherModule } from './teacher/teacher.module';
import { APP_FILTER } from '@nestjs/core';
import { ViewsModule } from './views/views.module';








@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    JwtModule.register({}),
    // AuthModule,
    // UserModule,
    TypeOrmModule.forRoot({
      type: 'mssql', // Loại cơ sở dữ liệu, có thể là 'mssql', 'mysql', 'postgres', 'sqlite', ...
      host: 'localhost', // Địa chỉ máy chủ SQL Server
      port: 1433, // Cổng SQL Server mặc định  
      username: 'NguyenDucThuan',
      password: '123',
      database: 'TrungTamDaoTao',
      entities:['dist/**/*.entity.js'],
      synchronize: true,
      // logging: true,
      options: {
        // driver: 'msnodesqlv8',
        // trustedConnection: true,
        encrypt: false,
      },
    }),
    RoomModule,
    ClassModule,
    CourseModule,
    BaseModule,
    ScheduleModule,
    StudentModule,
    AttendanceModule,
    RegisterModule,
    TeacherModule,
    ViewsModule
   
  

  ],
  providers: [
    
  ],

})
export class AppModule { }
