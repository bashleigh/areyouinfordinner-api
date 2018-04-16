import {
	Module,
	RequestMethod,
} from '@nestjs/common';
import {
	GroupEntity,
	ResponseEntity,
} from './entities';
import ConfigModule from '@bashleigh/nest-config';

import {
	TypeOrmModule,
} from '@nestjs/typeorm';

import GroupService from './group.service';
import ResponseService from './response.service';

import GroupController from './group.controller';
import ResponseController from './response.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			GroupEntity,
			ResponseEntity,
		]),
		ConfigModule,
	],
	controllers: [
		GroupController,
		ResponseController,
	],
	components: [
		GroupService,
		ResponseService,
	],
})
export default class GroupModule {

}
