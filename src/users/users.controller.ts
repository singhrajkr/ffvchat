import { Controller, Get, Param, Post, Body, Put, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';


@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @ApiResponse({ type: [CreateUserDto]})
    @Get()
    findAll() {
        return 'GetAll is working Fine!'
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // const user = this.userService.findOne(id);
        return id;
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log('Create request payload: ', createUserDto)
        return createUserDto;
    }

    @ApiBody({ type: [CreateUserDto] })
    @Post('create')
    async createMultipleUser(@Body() createUserDto: CreateUserDto[]) {
        console.log('Create request payload: ', createUserDto)
        return createUserDto;
    }


    // @ApiProperty({ type: [String] })
    // id: string[];
    @Post('delete')
    async deleteMultipleUser(@Body() deleteUsers: [string]) {
        console.log('delete request payload: ', deleteUsers)
        return deleteUsers;
    }

    @Put('id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return updateUserDto;
    }

    @Patch()
    async updatePartialUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        console.log('Create request payload: ', updateUserDto)
        return updateUserDto;
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string) {
        return id;
    }
}
