import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './interfaces/member.interface';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get(':email')
  async getMemberInformation(@Param('email') email: string): Promise<Member> {
    return this.memberService.getMemberInformation(email);
  }

  @Post()
  async addMember(@Body() member: Member): Promise<Member> {
    return this.memberService.addMember(member);
  }

  @Put(':id')
  async updateMember(@Param('id') id: string, @Body() member: Member): Promise<Member> {
    return this.memberService.updateMember(id, member);
  }

  @Delete(':id')
  async deleteMember(@Param('id') id: string): Promise<void> {
    return this.memberService.deleteMember(id);
  }

  // Add other endpoints for member management as needed...
}
