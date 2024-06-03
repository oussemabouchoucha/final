import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseInterceptors, UploadedFile } from '@nestjs/common';
import { LeadService } from './lead.service';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { log } from 'console';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post('create')
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.number(),
        status: Joi.string(),
        sex: Joi.string(),
        age: Joi.number(),
        localisation: Joi.string(),
        ville: Joi.string(),
        situation: Joi.string(),
      }),
    ),
  )
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get('leads')
  findAll() {
    return this.leadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(id);
  }

  @Patch('leads/:id')
  async edit(@Param('id') id: string, @Body() updateLeadDto: CreateLeadDto) {
    return this.leadService.edit(id, updateLeadDto);
  }

  @Delete('leads/:id')
  async remove(@Param('id') id: string) {
    await this.leadService.remove(id);
    return { message: 'Lead deleted successfully' };
  }

  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async importLeads(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    if (!file) {
      throw new Error('File is required');
    }
    return this.leadService.importLeads(file.path);
    
  }
}
