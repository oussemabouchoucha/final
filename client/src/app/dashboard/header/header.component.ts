import { Component, HostListener, Input } from '@angular/core';
import { notifications, userItems } from './header-dummy-data';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  

  @Input() collapsed = false ;
  @Input() screenwidth = 0 ;

  canShowSearchAsOverlay = false;

  notifications = notifications ;
  userItems = userItems;

  constructor( private router: Router,
    private authService: AuthService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }
  

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

getHeadClass(): string{
  let styleClass =  '';
  if (this.collapsed && this.screenwidth > 768) {
    styleClass ='head-trimmed';
  }else {
    styleClass = 'head-md-screen';

  }
  return styleClass;
}
checkCanShowSearchAsOverlay(innerWidth: number): void{
  if (innerWidth < 845) {
    this.canShowSearchAsOverlay = true;
  }else {
    this.canShowSearchAsOverlay = false;
  }
}
logout(): void {
  this.authService.logout().subscribe(
    () => {
      this.router.navigate(['/login']);
    },
    (error) => {
      console.error('Logout failed:', error);
    }
  );
}
}