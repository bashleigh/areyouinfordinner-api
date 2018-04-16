import {
    Component,
} from '@nestjs/common';

import {
    InjectRepository,
} from '@nestjs/typeorm';

import {
    Repository,
} from 'typeorm';

import {
    ResponseEntity as Response,
} from './entities';

import {
    GroupModel,
    ResponseModel,
    UserModel,
} from './models';

@Component()
export default class ResponseService {
    constructor(
        @InjectRepository(Response)
        private readonly responseRepository: Repository<Response>,
    ) {}

    async create(params: ResponseModel, group: GroupModel, user: UserModel): Promise<Response> {
        const response = this.responseRepository.create(params);
        response.user = user;
        response.group = group;
        return await this.responseRepository.save(response);
    }
}
