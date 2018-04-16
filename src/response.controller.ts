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
    async index(
      @Req() request,
      @Param('code') code: string,
    ) {
        const group = await this.groupService.find({
            where: {
                code: code,
            },
            relations: [
              'responses',
            ],
        });

        return group.responses;
    }

    @Post('')
    async create(
        @Req() request,
        @Param('code') code: string,
        @Body(new ValidationPipe()) body: ResponseModel,
    ): Promise<Response> {
        const group = await this.groupService.findOneByCode(code);

        // TODO check if this is handled above
        // if (!group) throw

        return await this.responseService.create(body, group, request.user);
    }

    @Put(':id')
    async update(
        @Req() request,
        @Param('code') code: string,
        @Param('id') id: number,
        @Body(new ValidationPipe()) body: ResponseModel
    ): Promise<Response> {
        const group = await this.groupService.findOneByCode(code);

        // TODO check if this is handled above
        // if (!group) throw

        return await this.responseService.update(id, body, group, request.user);
    }
}
