import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersDetails } from 'src/app/users/users.interfaces';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: UsersDetails;
  sub: Subscription;
  @Output() sidenavToggle = new EventEmitter();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.sub = this.authService.getUserUpdateListener()
      .subscribe(res => this.user = res);
  }

  onSidenavToggle() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
