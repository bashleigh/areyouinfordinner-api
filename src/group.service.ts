import {
	Component,
	NotFoundException,
} from '@nestjs/common';

import {
	InjectRepository,
} from '@nestjs/typeorm';

import {
	Repository,
	FindManyOptions,
} from 'typeorm';

import {
	GroupEntity as Group,
} from './entities';

import {
	GroupModel,
	Paginate,
	UserModel,
} from './models';

import {
	ConfigService,
} from '@bashleigh/nest-config';

import {
	generate,
} from 'randomstring';

@Component()
export default class GroupService {
	constructor(
		private readonly config: ConfigService,
		@InjectRepository(Group)
		private readonly groupRepository: Repository<Group>) {}

	async paginate(params: FindManyOptions<Group> = {take: 10, skip: 0}): Paginate {

		if (!params.hasOwnProperty('take')) params.take = parseInt(this.config.get('PAGINATE_DEFAULT', 10));
		if (!params.hasOwnProperty('skip')) params.skip = 0;
		if (typeof(params.take) !== 'number') params.take = parseInt(params.take);

		if (params.take > parseInt(this.config.get('PAGINATE_MAX', 100)))
			params.take = parseInt(this.config.get('PAGINATE_MAX', 100));

		params.skip = params.skip * params.take;

		const groups = await this.groupRepository.find(params);

		const total = await this.groupRepository.count();

		return new Paginate({
			items: groups,
			count: groups.length,
			total: total,
			pages: Math.round(total / params.take),
		});
	}

	async create(params: GroupModel, user: UserModel): Promise<Group> {
		const group = this.groupRepository.create(params);
		group.code = generate();
		group.users = [user];
		return await this.groupRepository.save(group);
	}

	async update(code: string, params: GroupModel, user: UserModel): Promise<Group> {
		let group = await this.groupRepository.findOne({
			where: {
				code: code,
			},
			relations: [
				'users',
			],
		});

		if (!group) throw new NotFoundException('entity not found');

		group.users.push(user);

		group = {
			...group,
			...params,
		};

		await this.groupRepository.save(group);
		return group;
	}

	async destroy(id: number): Promise<void> {
		return await this.groupRepository.deleteById(id);
	}

	async findOneById(id: number): Promise<Group> {
		return await this.groupRepository.findOneById(id);
	}

	async findOneByCode(code: string): Promise<Group> {
		return await this.groupRepository.findOne({
			where: {
				code: code,
			},
		});
	}

	async find(params: object): Promise<Group> {
		return await this.groupRepository.findOne(params);
	}
}
