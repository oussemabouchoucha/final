// excel.service.ts
import { Injectable } from '@angular/core';
import * as xls from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  readExcelFile(file: File): Promise<any[]> {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    return new Promise<any[]>((resolve, reject) => {
      fr.onload = () => {
        const data = fr.result;
        const workbook = xls.read(data, { type: 'array' });
        const sheetname = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetname];
        const users = xls.utils.sheet_to_json(sheet, { raw: true });
        resolve(users);
      };
      fr.onerror = (error) => {
        reject(error);
      };
    });
  }
}
  