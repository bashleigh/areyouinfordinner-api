import { Controller, Post, Body, Get, Req, Put, Param } from '@nestjs/common';

import { ValidationPipe } from './pipes';

import GroupService from './group.service';

import { GroupEntity as Group } from './entities';

import { GroupModel, Paginate } from 'models';

@Controller('group')
export default class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('')
  async index(@Req() request): Promise<Paginate> {
    return await this.groupService.paginate({
      relations: ['users'],
      where: qb => {
        // TODO figure out how to do this a LOT nicer
        return '`Group_Group_users`.`userId` = ' + request.user.id;
      },
      skip: request.query.hasOwnProperty('page') ? request.query.page : 0,
    });
  }

  @Post('')
  async create(
    @Req() request,
    @Body(new ValidationPipe())
    body: GroupModel,
  ): Promise<Group> {
    return await this.groupService.create(body, request.user);
  }

  @Put(':code')
  async update(
    @Req() request,
    @Param('code') code: number,
    @Body(new ValidationPipe())
    body: GroupModel,
  ): Promise<Group> {
    return await this.groupService.update(code, body, request.user);
  }

  @Get(':code')
  async show(@Param('code') code: string): Promise<Group> {
    return await this.groupService.findOneByCode(code);
  }
}
