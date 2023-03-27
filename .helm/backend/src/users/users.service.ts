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
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailsService: MailsService,
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

    await this.mailsService.sendEmailVerificationLink(email, nonce);

    return newUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
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

  async valide(email: string, nonce: string) {
    const user = await this.userModel.findOne({ email });

    // Check if user exists
    if (user && user.nonce === nonce) {
      await this.userModel.updateOne({ email: user.email }, { nonce: null });
    } else {
      throw new NotFoundException('Email could not be verified');
    }
  }
}
