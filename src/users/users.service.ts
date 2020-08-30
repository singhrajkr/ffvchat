import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


    find(paginationQuery: PaginationDto) {
        const { limit, offset } = paginationQuery;
         // http://localhost:3000/users?offset=10&limit=100
        // await new Promise(resolve => setTimeout(resolve, 4000));
        return this.userRepository.find({
            skip: offset,
            take: limit, 
            // cache: true
        });
    }

    async findOne(id: string) {
        return await this.findUserById(id);
    }

    async saveUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async saveMultipleUser(createUserDto: CreateUserDto[]) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
        // return this.userRepository.createQueryBuilder()
        //     .insert()
        //     .into(User)
        //     .values(createUserDto)
        //     .execute();
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findUserById(id);
        return this.userRepository.save({ ...user, updateUserDto });
    }


    async removeUser(id: string) {
        const user = await this.findUserById(id);
        return this.userRepository.remove(user);
    }

    async findUserById(id: string) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with #${id} not found`);
        }
        return user;
    }
}
