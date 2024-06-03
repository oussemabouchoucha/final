import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadImgComponent } from '../upload-img/upload-img.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-genaral-setting',
  templateUrl: './genaral-setting.component.html',
  styleUrl: './genaral-setting.component.css'
})
export class GenaralSettingComponent {

  user: any = {};
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  openDialog(): void {
    this.dialog.open(UploadImgComponent, {
    });
  }

  ngOnInit() {
    this.userService.getUser().subscribe((data) => {
      console.log("userData", data);
      this.user = data;
    });
  }

  onSubmit() {
    this.toastr.error('something went wrong', 'Oops!',{
      positionClass: 'toast-bottom-left',
    });
  }
}
