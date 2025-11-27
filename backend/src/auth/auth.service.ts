import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.usersService.create(registerDto);

    // Return user without password
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }

  // TODO for candidates: Implement login method
  // This method should:
  // 1. Validate user credentials (email and password)
  // 2. Generate and return a JWT token
  // 3. Handle errors appropriately (user not found, wrong password)
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.email };
    
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  // TODO for candidates: Implement token validation
  // This method should validate JWT tokens and return user information
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return null;

    const { password: _, ...rest } = user.toObject();
    return rest;
  }
}
