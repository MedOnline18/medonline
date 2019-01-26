import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../users.service';
import { UsersDetails } from '../users.interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
            password: ['', [ Validators.required, Validators.minLength(4) ]],
            c_password: ['', [ Validators.required, Validators.minLength(4) ]],
            user_role: ['', [ Validators.required]],
            telephone: ['', [ Validators.required]],
            name: ['', [ Validators.required]]
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
          user_role: [data.user_role, [ Validators.required]],
          telephone: [data.telephone, [ Validators.required]],
          name: [data.name, [ Validators.required]]
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
