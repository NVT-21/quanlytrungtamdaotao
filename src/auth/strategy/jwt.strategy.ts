// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';
// import { InjectModel } from '@nestjs/mongoose';
// import { user } from '../schemas/user.schemas';
// import { Model } from 'mongoose';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
//   constructor(private  configService: ConfigService,
//     @InjectModel(user.name) 
//     private  userModel: Model<user>
//     ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: configService.get('JWT_SECERT')
//     });
//   }
//   async validate(payload: any) {
//     // Thực hiện các logic xác thực và trả về thông tin người dùng nếu cần
//     const user=await this.userModel.findById(payload.id)
//     if (!user) {
//       // User not found
//       return null;
//     }
//     return user
//   }
// }