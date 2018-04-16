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
import GroupController from './group.controller';

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
	],
	components: [
		GroupService,
	],
})
export default class GroupModule {

}
