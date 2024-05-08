// import { Injectable } from '@nestjs/common';
// import { AuthDTO } from './dto/auth.dto';
// import { InjectModel } from '@nestjs/mongoose';

// import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt'
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class AuthService {
    // constructor(
    // @InjectModel(user.name) 
    // private  userModel: Model<user>,
    // private jwtService :JwtService,
    // private configService: ConfigService) {}
    // async register(authDTO: AuthDTO): Promise<{ message: string }> {
    //     try {
    //         // Kiểm tra xem email đã tồn tại hay chưa
    //         const existingUser = await this.userModel.findOne({ email: authDTO.email });
        
    //         if (existingUser) {
    //             const errorMessage = 'Email already registered';
    //             return { message: errorMessage };
    //         }
        
    //         // Kiểm tra mật khẩu và xác nhận mật khẩu
    //         if (authDTO.password !== authDTO.passwordConfirm) {
    //             const errorMessage = 'Passwords do not match';
    //             return { message: errorMessage };
    //         }
    //         const hashedPassword = await bcrypt.hash(authDTO.password, 10);
    //         // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    // // Tạo một user mới và lưu vào cơ sở dữ liệu
    //         const newUser = new this.userModel({ email:authDTO.email, password: hashedPassword,username:authDTO.username });
    //         await newUser.save();
        
    //         return { message: 'Registration successful' };
    //     } catch (error) {
    //         // Xử lý lỗi tại đây (nếu cần)
    //         return { message: 'Registration failed' }; // hoặc trả về thông báo lỗi khác
    //     }
    // }
//    async Login(authDto: AuthDTO) {
//         const user = await this.userModel.findOne({ email:authDto.email})
//         if(!user){
//             return { message: 'dont have email' };
//         }
//        else if (!user || !(await bcrypt.compare(authDto.password, user.password))) {
//             return { message: "tai khoan mat khau khong chinh xac"
//           }
//        }
//        else {
//         const token=await this.createToken(user.id)
//         return { message:"login success",token };
//        }
       

//     }
//     async createToken(id) :Promise<string> {
//         const payload={
//             id
//         }
//         return this.jwtService.signAsync(payload,{
//             expiresIn:'1h',
//             secret:this.configService.get('JWT_SECERT')
//         })

//     }
// }
