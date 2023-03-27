import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { MailsService } from 'src/mails/mails.service';
import { FileSystem } from '../file-system/schemas/file-system.schema';
import { UpdateFileSystemDto } from 'src/file-system/dto/update-file-system.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailsService: MailsService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    fileSystem: FileSystem,
  ): Promise<UserDocument> {
    const { email, password } = createUserDto;
    const user = await this.userModel.findOne({ email: email });

    if (user) {
      throw new ConflictException('Email already exists'); // Throw an error if the user doesn't exist
    }

    const nonce = uuid();
    console.log('Create User :', fileSystem);

    const newUser = new this.userModel({
      ...createUserDto,
      password: await hash(password, 10),
      nonce: nonce,
      fileSystem: fileSystem,
    });

    await this.mailsService.sendEmailVerificationLink(email, nonce);

    return await newUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findOneByFileSystemId(fileSystemId: string) {
    return (await this.userModel.findOne({ 'fileSystem._id': fileSystemId }))
      .fileSystem;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async updateFileSystemById(
    fileSystemId: string,
    updateFileSystemDto: UpdateFileSystemDto,
  ) {
    return await this.userModel
      .findOneAndUpdate(
        { 'fileSystem._id': fileSystemId },
        { $set: { 'fileSystem.children': updateFileSystemDto.children } },
      )
      .exec();
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
