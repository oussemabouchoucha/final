import { Component } from '@angular/core';
import * as xls from 'xlsx'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  title = 'angular-classes';

  users:any


  readExcelFile(e:any){

    const file =e.target.files[0];
    let fr =new FileReader();

    fr.readAsArrayBuffer(file);

    fr.onload =()=>{

     let data=  fr.result;
      let workbook= xls.read(data,{type:'array'});

            const sheetname= workbook.SheetNames[0];

            const sheet1 = workbook.Sheets[sheetname]

            this.users=xls.utils.sheet_to_json(sheet1,{raw:true});
            console.log(this.users)
        

    }


  }
}
