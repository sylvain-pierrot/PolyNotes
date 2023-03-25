import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { email, password } = createUserDto;
    const user = await this.userModel.findOne({ email: email });

    if (user) {
      throw new ConflictException('Email already exists'); // Throw an error if the user doesn't exist
    }

    const nonce = uuid();

    const newUser = await new this.userModel({
      ...createUserDto,
      password: await hash(password, 10),
      nonce: nonce,
    });

    // await this.mailService.sendEmailVerificationLink(email, token);

    return newUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }
}
