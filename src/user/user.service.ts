// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { AuthDTO } from 'src/auth/dto/auth.dto';
// import { user } from 'src/auth/schemas/user.schemas';

// @Injectable()
// export class UserService {
//     constructor(
//     @InjectModel(user.name) 
//     private  userModel: Model<user>){
//     }

//     getUsers(user: any){
//         return user
//     }
//     async editUser(user: any,updatedUserData:any){
//         try {
//             // Find the user by ID and update the data
//             const dataUpdate=updatedUserData.userName
//             const updatedUser = await this.userModel.findByIdAndUpdate(user.id, dataUpdate, { new: true })

//             return updatedUser;
//         } catch (error) {
//             console.error(error);
//             throw new Error('Failed to edit user');
//         }
//     }
//     async updateAvatar(userId: string, avatarPath: string): Promise<void> {
//         await this.userModel.findByIdAndUpdate(userId, { photo:avatarPath });
//       }
// }
