// import { Injectable } from "@nestjs/common";
// import { HttpService } from '@nestjs/axios';


// //   @Injectable()
// //   export class ClearoutService {
// //     constructor(
// //         private readonly http: HttpService
// //     ) {}
  
// //     async verifyEmail(email: string): Promise<boolean> {
// //         const apiKey = 'c2a78187f4260cb24e332d79b5f42947:eade45edac0ebe738d864a51d05fd66124848a9e13372713d99f36bd1ba0533d'; // Replace with your actual API key

// //         const url = `https://api.clearout.io/v2/email/verify/free/${email}`;
// //         const headers = { Authorization: `Bearer ${apiKey}` };

// //         try {
// //             const response = await this.http.get(url, { headers }).toPromise(); // Add .toPromise() to convert the Observable to a Promise
// //             return response.data.valid; // Assuming the response structure has a 'valid' property
// //         } catch (error) {
// //             console.error('Error verifying email:', error);
// //             return false; // Or throw an appropriate error
// //         }
// //     }
// //   }
// // // <script>
// // //   var clearout = window.clearout = window.clearout || [],
// // //   opts = {
// // //     "app_token":"be62b58dac024ae0e0467f30fb71d4a6:42c2a1b162690266874a1753c0d90028a2340c1b559504a0145d28ec51a77404",
// // //     "api_url":"https://api.clearout.io",
// // //     "mode":"ajax","timeout":10
// // //   };
// // //   clearout.push([
// // //     "initialize", opts
// // //   ]),
// // //   function () {
// // //     var t = document, e = t.createElement("script"), 
// // //     a = t.getElementsByTagName("script")[0];e.type = "text/javascript", 
// // //     e.async = !0, e.src = "https://clearout.io/wp-content/co-js-widget/clearout_js_widget.js",
// // //     a.parentNode.insertBefore(e, a)
// // //   }();
// // // </script>