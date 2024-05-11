import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken'; // Assuming you're using JWT for authentication

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // 1. Check for JWT authorization header
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Unauthorized: Missing JWT token', HttpStatus.UNAUTHORIZED);
    }

    // 2. Extract the token from the header
    const token = authHeader.split(' ')[1];

    // 3. Validate the token using a secret key (environment variable)
    try {
      const secret = 'secertToken'; // Replace with your actual secret key retrieval
      if (!secret) {
        throw new HttpException('Internal Server Error: Missing JWT secret', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      await jwt.verify(token, secret); // Throws an error if invalid
      return true; // User is authenticated
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new HttpException('Unauthorized: Invalid JWT token', HttpStatus.UNAUTHORIZED);
      } else {
        // Handle other errors (e.g., network issues)
        throw new HttpException('Internal Server Error: JWT verification failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
