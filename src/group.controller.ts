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

import {
	GroupEntity as Group,
} from './entities';

import {
	GroupModel,
} from 'models';

@Controller('group')
export default class GroupController {
	constructor(
		private readonly groupService: GroupService,
	) {}

	@Get('')
	async index(@Req() request) {
		return request.user.groups;
	}

	@Post('')
	async create(@Req() request, @Body(new ValidationPipe()) body: GroupModel): Promise<Group> {
		return await this.groupService.create(body, request.user);
	}

	@Put(':code')
	async update(@Req() request, @Param('code') code: number, @Body(new ValidationPipe()) body: GroupModel): Promise<Group> {
		return await this.groupService.update(code, body, request.user);
	}

	@Get(':code')
	async show(@Param('code') code: string): Promise<Group> {
		return await this.groupService.findOneByCode(code);
	}
}
