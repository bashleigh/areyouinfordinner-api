import {
    Controller,
    Post,
    Body,
    Get,
    Req,
    Put,
    Param,
} from '@nestjs/common';

import {
    ValidationPipe,
} from './pipes';

import GroupService from './group.service';
import ResponseService from './response.service';

import {
    ResponseEntity as Response,
} from './entities';

import {
    ResponseModel,
} from 'models';

@Controller('group/:code/response')
export default class ResponseController {
    constructor(
        private readonly groupService: GroupService,
        private readonly responseService: ResponseService,
    ) {}

    @Get('')
    async create(
        @Req() request,
        @Param('code') code: string,
        @Body(new ValidationPipe()) body: ResponseModel
    ): Promise<Response> {
        const group = this.groupService.findOneByCode(code);

        // TODO check if this is handled above
        // if (!group) throw

        return await this.responseService.create(body, group, user);
    }

    @Put(':id')
    async create(
        @Req() request,
        @Param('code') code: string,
        @Param('id') id: number,
        @Body(new ValidationPipe()) body: ResponseModel
    ): Promise<Response> {
        const group = this.groupService.findOneByCode(code);

        // TODO check if this is handled above
        // if (!group) throw

        return await this.responseService.create(body, group, user);
    }
}
