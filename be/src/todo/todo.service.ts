import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepo: Repository<Todo>,
    ) { }

    findAll() {
        return this.todoRepo.find();
    }

    create(title: string) {
        const todo = this.todoRepo.create({ title });
        return this.todoRepo.save(todo);
    }
}
