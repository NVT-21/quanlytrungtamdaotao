// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema, user } from 'src/auth/schemas/user.schemas';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule } from '@nestjs/config';
// import { JwtStrategy } from './strategy/jwt.strategy';
// @Module({
//     imports: [MongooseModule.forFeature([{ name: user.name, schema: UserSchema }]),
//     ConfigModule.forRoot(),
//     JwtModule.register({}),

//   ],
//    controllers: [AuthController],
//    providers: [AuthService,JwtStrategy]
//   })
// export class AuthModule{

// }