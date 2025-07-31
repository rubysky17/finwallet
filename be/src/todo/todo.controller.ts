import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    getAll() {
        return this.todoService.findAll();
    }

    @Post()
    create(@Body('title') title: string) {
        return this.todoService.create(title);
    }
}
