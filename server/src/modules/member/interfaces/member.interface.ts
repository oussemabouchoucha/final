import { Attachment } from "./attachment.interface";
import { CurrentStatus } from "./currentstatus.enum";
import { Position } from "./position.interface";
import { SocialMedia } from "./socialmedia.interface";

export interface Member {
	id: string,
	name: string,
	email: string,
	expa_id: number,
	entity: string,
	phone: string,
	phone2: string,
	address: string,
	dob: string,
	joined_date: string,
	gender: string,
	positions: Position[],
	unofficial_positions: Position[],
	photo: string,
	cv: string,
	social_media: SocialMedia,
	current_status: CurrentStatus,
	tags: string[],
	faculty: string,
	field_of_study: string
	attachments: Attachment[],
}