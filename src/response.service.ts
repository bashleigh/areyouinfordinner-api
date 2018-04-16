import {
    Component,
    NotFoundException,
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

    async update(id: number, params: ResponseModel, user: UserModel): Promise<Response> {
        const response = await this.responseRepository.findOne({
            where: {
                id: id,
                userId: user.id,
            },
        });

        if (!response) throw NotFoundException;

        response.attending = params.attending;

        await this.responseRepository.save(response);

        return response;
    }
}
