import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../users.service';
import { UsersDetails } from '../users.interfaces';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public registerForm: FormGroup;
  public isEdited: boolean;
  private userId;

  constructor(
      private formBulider: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private usersService: UsersService
  ) { }

    ngOnInit() {
      this.userId = this.route.snapshot.params['user_id'];
        this.registerForm = this.formBulider.group({
            email: ['', [ Validators.required, Validators.email ]],
            name: ['', [ Validators.required]],
            message: ['', [ Validators.required]]
        });
      if (!!this.userId) {
        this.onEdit();
      }
    }
    onConfirm() {
      if (this.isEdited) {
        const dataToSend = { ...this.registerForm.value, id: this.userId };
        this.authService.edit(dataToSend).subscribe(() => this.showList());
      } else {
        this.authService.register(this.registerForm.value).subscribe(() => this.showList());
      }
    }

    onEdit() {
      this.usersService.editUser(this.userId).subscribe((res: UsersDetails[]) => {
        this.isEdited = true;
        const [data] = res;
        this.registerForm = this.formBulider.group({
          email: [data.email, [ Validators.required, Validators.email ]],
          name: [data.name, [ Validators.required]],
          message: ['', [ Validators.required]]
      });
      });
    }

    showList() {
      const userRole = this.registerForm.get('user_role').value;
      if (userRole !== 3) {
        this.router.navigate(['/users', userRole]);
      }
    }

}
