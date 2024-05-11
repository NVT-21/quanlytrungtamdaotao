import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
     @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService :JwtService,
    private configService: ConfigService) {}
    async register(authDTO: AuthDTO) {
       
            // Kiểm tra xem email đã tồn tại hay chưa
            const existingUser = await this.userRepository.findOne({where:{ UserName: authDTO.username} });

            if (existingUser) {
                throw new HttpException('Tài khoản đã tồn tại',400);
            }

            // Kiểm tra mật khẩu và xác nhận mật khẩu
            if (authDTO.password !== authDTO.passwordConfirm) {
                throw new HttpException('mật khẩu xác nhận không khớp',400);
            }

            const hashedPassword = await bcrypt.hash(authDTO.password, 10);

            // Tạo một user mới và lưu vào cơ sở dữ liệu
            const newUser = this.userRepository.create({
                UserName: authDTO.username,
                password: hashedPassword,
                PasswordCorfirm: authDTO.passwordConfirm,
            });

            await this.userRepository.save(newUser);

            return { message: 'Đăng ký thành công',
                     status:'success'};
        
    }

    async Login(authDTO: AuthDTO) {
        const user = await this.userRepository.findOne({where:{ UserName: authDTO.username}});

        if (!user || !(await bcrypt.compare(authDTO.password, user.password))) {
            throw new HttpException('Tài khoản hoặc mật khẩu không chính xác',400);
        }

        const token = await this.createToken(user.idUser);

        return { message: 'Đăng nhập thành công', token,status:"success" };
    }
    async createToken(id) :Promise<string> {
        const payload={
            id
        }
        return this.jwtService.signAsync(payload,{
            expiresIn:'1h',
            secret:this.configService.get('JWT_SECERT')
        })

    }
}
