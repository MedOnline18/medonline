import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersDetails } from 'src/app/users/users.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  user: UsersDetails = null;
  sub: Subscription;
  @Output() closeSidenav = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.sub = this.authService.getUserUpdateListener()
      .subscribe(res => this.user = res);
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  onlogout() {
    this.onCloseSidenav();
    this.authService.resetUser();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
