import { Position } from "./position.interface";

export interface MemberManage {
	name: string,
	email: string,
	expa_id: number,
	entity: string,
	positions: Position[],
	unofficial_positions: Position[],
	isAdmin: boolean
}