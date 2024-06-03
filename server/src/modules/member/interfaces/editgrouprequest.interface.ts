import { CreateGroupRequest } from "./creategrouprequest.interface";

export interface EditGroupRequest extends CreateGroupRequest {
	id: string
}