import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, ConflictException } from '@nestjs/common';
import { UserService, CreateUserDto } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      return {
        status: 'success',
        message: 'User registered successfully',
        data: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        return {
          status: 'error',
          message: error.message,
          error: 'EMAIL_EXISTS',
        };
      }
      
      return {
        status: 'error',
        message: 'Registration failed',
        error: error.message,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.userService.updateUser(+id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(+id);
  }
}
