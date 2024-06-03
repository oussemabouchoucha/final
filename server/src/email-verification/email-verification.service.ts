import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EmailVerificationService {
//   private readonly apiUrl = 'https://api.clearout.io/v2/email/verify/free';
//   private readonly apiToken = 'c2a78187f4260cb24e332d79b5f42947:eade45edac0ebe738d864a51d05fd66124848a9e13372713d99f36bd1ba0533d'; // Replace this with your actual API token

//   constructor(private readonly httpService: HttpService) {}

//   async verifyEmail(email: string): Promise<any> {
//     const options = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': this.apiToken,
//       },
//     };

//     const body = {
//       email,
//     };

//     try {
//       const response = await firstValueFrom(this.httpService.post(this.apiUrl, body, options));
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         throw new HttpException(error.response.data, error.response.status);
//       }
//       throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
}
