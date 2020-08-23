import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async findOne(id: string) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with #${id} not found`);
        }
        return user;
    }
}
