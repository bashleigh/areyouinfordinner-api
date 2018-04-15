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
		console.log('hi');
		// TODO paginated list of user's groups
		return 'hello';
	}

	@Post('')
	async create(@Req() request, @Body(new ValidationPipe()) body: GroupModel): Promise<Group> {
		  return await this.groupService.create(body, request.user);
	}

	@Put(':id')
	async create(@Req() request, @Param id: number, @Body(new ValidationPipe()) body: GroupModel): Promise<Group> {
		return await this.groupService.update(id, body, request.user);
	}

	@Get(':id')
	async show(@Param id: number): Promise<Group> {
		return await this.groupService.findOneById(id);
	}
}