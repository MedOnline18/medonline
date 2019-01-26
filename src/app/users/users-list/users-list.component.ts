import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { UsersDetails } from '../users.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  public users;
  private userRole: string;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.userRole = this.route.snapshot.params['user_role'];
    this.fetchUsers();
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.userRole = params['user_role'];
        this.fetchUsers();
      }
    );
  }

  fetchUsers() {
    this.usersService.getUserDetails().subscribe(
      ((response: UsersDetails[]) => {
        this.users = response.filter((user: UsersDetails) => user.user_role === this.userRole);
      })
    );
  }

  onEditUser(user: UsersDetails) {
    this.router.navigate(['/edit', user.id]);
  }

  onDeleteUser(user: UsersDetails) {
    this.usersService.deleteUser(user.id).subscribe(() => this.fetchUsers());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
