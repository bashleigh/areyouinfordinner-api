import { IsBoolean } from 'class-validator';

export default class ResponseModel {
  @IsBoolean readonly attending;
}
