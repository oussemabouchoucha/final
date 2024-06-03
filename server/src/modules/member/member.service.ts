import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './interfaces/member.interface';

@Injectable()
export class MemberService {
  private members: Member[] = [];

  async getMemberInformation(email: string): Promise<Member> {
    const member = this.members.find(member => member.email === email);
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }

  async addMember(member: Member): Promise<Member> {
    this.members.push(member);
    return member;
  }

  async updateMember(id: string, updatedMember: Member): Promise<Member> {
    const index = this.members.findIndex(member => member.id === id);
    if (index === -1) {
      throw new NotFoundException('Member not found');
    }
    this.members[index] = { ...this.members[index], ...updatedMember };
    return this.members[index];
  }

  async deleteMember(id: string): Promise<void> {
    const index = this.members.findIndex(member => member.id === id);
    if (index === -1) {
      throw new NotFoundException('Member not found');
    }
    this.members.splice(index, 1);
  }

}
