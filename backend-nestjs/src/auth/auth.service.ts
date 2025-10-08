import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';

export interface LoginCredentials {
  username: string;
  password: string;
  remember_device?: boolean;
}

export interface LoginResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
      first_name: string;
      last_name: string;
      full_name: string;
    };
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(usernameOrEmail: string, password: string): Promise<any> {
    // Support both username and email login
    // Currently using email field for both username and email login
    // TODO: Add separate username field if needed in the future
    
    const user = await this.userRepository.findOne({
      where: { email: usernameOrEmail },
    });

    if (user && await this.comparePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const user = await this.validateUser(credentials.username, credentials.password);
      
      if (!user) {
        return {
          status: 'error',
          message: 'Invalid credentials. Please check your username and password.',
        };
      }

      const payload = {
        sub: user.user_id,
        email: user.email,
        user_type: user.user_type,
      };

      const token = this.jwtService.sign(payload);

      // Update user token in database if remember_device is true
      if (credentials.remember_device) {
        await this.userRepository.update(user.user_id, { token: token });
      }

      return {
        status: 'success',
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user.user_id,
            username: user.email, // Using email as username
            email: user.email,
            role: this.getUserRole(user.user_type),
            first_name: user.first_name,
            last_name: user.last_name,
            full_name: `${user.first_name} ${user.last_name}`.trim(),
          },
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        status: 'error',
        message: 'An error occurred during login. Please try again.',
      };
    }
  }

  async logout(userId: number): Promise<LoginResponse> {
    try {
      // Clear user token
      await this.userRepository.update(userId, { token: null });
      
      return {
        status: 'success',
        message: 'Logout successful',
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        status: 'error',
        message: 'An error occurred during logout.',
      };
    }
  }

  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private getUserRole(userType: number): string {
    // TODO: Confirm user role mapping with business requirements
    const roleMap: { [key: number]: string } = {
      1: 'researcher',
      2: 'research_director',
      3: 'staff_clerk',
      4: 'center_head',
      5: 'extension_coordinator',
      32: 'admin',
    };
    
    return roleMap[userType] || 'user';
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
} 