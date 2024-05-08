// import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { UserService } from './user.service';
// import { Request } from 'express';
// import { AuthDTO } from 'src/auth/dto/auth.dto';

// import { FileInterceptor } from '@nestjs/platform-express';
// import { StorageFunc } from './confi/upload.conf';

// @Controller('user')
// export class UserController {

//     constructor(private userService: UserService) {}
//     @UseGuards(AuthGuard('jwt'))
//     @Get('/getUser')
//     getUsers(@Req() request: Request) {
       
//         const user = request.user
//         console.log(user)
//         return this.userService.getUsers(user);
//     }
//     @UseGuards(AuthGuard('jwt'))
//     @Post('/editUser')
//     editUser(@Req() request: Request,@Body()body:any) {
//         const user = request.user
//         return this.userService.editUser(user,body);
//     }
//     @UseGuards(AuthGuard('jwt'))
//     // @Post('/upload-avatar')
//     // @UseInterceptors(this.upload.configure().single('avatar'))
//     // async uploadAvatar(@UploadedFile() file, @Req() req) {
//     //     try {
//     //         const user = req.user;
//     //         const imagePath = `${file.filename}`;
//     //          console.log(imagePath,user.id)
//     //         await this.userService.updateAvatar(user.id, imagePath);
//     //         return imagePath;
//     //       } catch (error) {
//     //         return 'Upload failed';
//     //       }
//     // }
//     @Post('upload-avatar')
// @UseInterceptors(FileInterceptor('avatar',{
//   storage:StorageFunc()
// }
// ))
// uploadFile(@UploadedFile() file: Express.Multer.File,@Req() req) {
//   console.log(file);
// }
//   }



