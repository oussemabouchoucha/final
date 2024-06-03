import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamoConfigService } from './db/config/dynamo.config';
import mysqlConfig from './db/config/mysql.config';
import { UserModule } from './modules/user/user.module';
import { LeadModule } from './modules/lead/lead.module';
import { TeamMemberModule } from './modules/team-member/team-member.module';
import { LeadCampaignModule } from './modules/lead-campaign/lead-campaign.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { BuyerModule } from './modules/buyer/buyer.module';
import { EnrichmentApiModule } from './modules/enrichment-api/enrichment-api.module';
import { AuthModule } from './modules/auth/auth.module';
import { MemberModule } from './modules/member/member.module';
import { EmailVerificationService } from './email-verification/email-verification.service';
import { EmailVerificationController } from './email-verification/email-verification.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TeamMemberModule,
    LeadModule,
    LeadCampaignModule,
    CampaignModule,
    BuyerModule,
    EnrichmentApiModule,
    AuthModule,
    MemberModule,
  ],
  controllers: [AppController, EmailVerificationController],
  providers: [AppService, DynamoConfigService, EmailVerificationService,],
})
export class AppModule {}
