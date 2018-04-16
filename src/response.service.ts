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
    Paginate,
} from './models';

import {
    ConfigService,
} from '@bashleigh/nest-config';

import {
    generate,
} from 'randomstring';

@Component()
export default class ResponseService {
    constructor(
        private readonly config: ConfigService,
        @InjectRepository(Response)
        private readonly ResponseRepository: Repository<Response>,
    ) {}

    async create(params: ResponseModel, group: GroupModel, user: UserModel): Response {
        const response = this.groupRepository.create(params);
        response.user = user;
        response.group = group;
        return await this.groupRepository.save(response);
    }
}
