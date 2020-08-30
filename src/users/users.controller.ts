import { Controller, Get, Param, Post, Body, Put, Patch, Delete, ParseIntPipe, Query, CacheKey, CacheTTL, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    // @ApiResponse({ type: [CreateUserDto]})
    @CacheKey('getAllUsers')
    @UseInterceptors(CacheInterceptor)
    @Get()
    async findAll(@Query() paginationQuery: PaginationDto) {
        return this.userService.find(paginationQuery);
    }

    // @CacheKey(`getUserById${}`)
    @UseInterceptors(CacheInterceptor)
    @Get(':userId')
    findOne(@Param('userId') userId: string) {
        console.log('ID ', userId);
        const user = this.userService.findOne(userId);
        return user;
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log('Create request payload: ', createUserDto)
        return this.userService.saveUser(createUserDto);
    }

    @ApiBody({ type: [CreateUserDto] })
    @Post('create')
    async createMultipleUser(@Body() createUserDto: CreateUserDto[]) {
        console.log('Create request payload: ', createUserDto)
        return this.userService.saveMultipleUser(createUserDto);
    }


    // @ApiProperty({ type: [String] })
    // id: string[];
    @Post('delete')
    async deleteMultipleUser(@Body() deleteUsers: [string]) {
        console.log('delete request payload: ', deleteUsers)
        return deleteUsers;
    }

    @Put('userId')
    async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
        console.log(updateUserDto);
        return this.userService.updateUser(userId, updateUserDto);
    }

    @Patch()
    async updatePartialUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
        console.log('Create request payload: ', updateUserDto)
        return updateUserDto;
    }

    @Delete(':userId')
    async deleteOne(@Param('userId') userId: string) {
        return this.userService.removeUser(userId);
    }
}
