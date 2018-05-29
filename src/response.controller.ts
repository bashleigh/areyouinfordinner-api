import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { ValidationPipe } from './pipes';

import GroupService from './group.service';
import ResponseService from './response.service';

import { ResponseEntity as Response } from './entities';

import { ResponseModel } from 'models';

@Controller('group/:code/response')
export default class ResponseController {
  constructor(
    private readonly groupService: GroupService,
    private readonly responseService: ResponseService,
  ) {}

  @Get('')
  async index(@Req() request, @Param('code') code: string) {
    // TODO limit to today's responses
    const group = await this.groupService.find({
      where: {
        code: code,
      },
      relations: ['responses', 'responses.user'],
    });

    if (!group) throw new NotFoundException();

    return group.responses;
  }

  @Post('')
  async create(
    @Req() request,
    @Param('code') code: string,
    @Body(new ValidationPipe())
    body: ResponseModel,
  ): Promise<Response> {
    const group = await this.groupService.findOneByCode(code);

    if (!group) throw new NotFoundException();

    // TODO validation rule for checking if response exists for this day for that user

    return await this.responseService.create(body, group, request.user);
  }

  @Put(':id')
  async update(
    @Req() request,
    @Param('code') code: string,
    @Param('id') id: number,
    @Body(new ValidationPipe())
    body: ResponseModel,
  ): Promise<Response> {
    const group = await this.groupService.findOneByCode(code);

    if (!group) throw new NotFoundException();

    return await this.responseService.update(id, body, group, request.user);
  }
}
