import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  onlogout() {
    this.onCloseSidenav();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
