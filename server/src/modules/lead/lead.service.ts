import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeadDto } from './dto/create-lead.dto';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto) {
    const lead = this.leadRepository.create(createLeadDto);
    return await this.leadRepository.save(lead);
  }

  findAll() {
    return this.leadRepository.find({
      select: ['id', 'email', 'name', 'phone', 'status', 'created_at'],
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} lead`;
  }

  async edit(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.leadRepository.findOne({
      where: { id },
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    // Update the lead's properties with values from updateLeadDto
    Object.assign(lead, updateLeadDto);
    return this.leadRepository.save(lead);
  }

  async remove(id: string): Promise<void> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    await this.leadRepository.delete(lead.id);
  }

  async importLeads(filePath: string): Promise<any> {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          // Process CSV data and save leads
          for (const leadData of results) {
            const createLeadDto = new CreateLeadDto();
            createLeadDto.name = leadData.name;
            createLeadDto.email = leadData.email;
            createLeadDto.phone = leadData.phone;
            createLeadDto.status = leadData.status;
            await this.create(createLeadDto);
          }
          resolve({ message: 'Leads imported successfully' });
        })
        .on('error', (error) => reject(error));
    });
  }
}
