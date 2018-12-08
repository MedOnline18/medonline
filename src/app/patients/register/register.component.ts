import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(
      private formBulider: FormBuilder,
      private authService: AuthService
  ) { }

    ngOnInit() {
        this.registerForm = this.formBulider.group({
            email: ['', [ Validators.required, Validators.email ]],
            password: ['', [ Validators.required, Validators.minLength(4) ]],
            c_password: ['', [ Validators.required, Validators.minLength(4) ]],
            user_role: ['', [ Validators.required]],
            telephone: ['', [ Validators.required]],
            name: ['', [ Validators.required]]
        });
    }


    onRegister() {
        this.authService.register(this.registerForm.value).subscribe(token => {
            this.router.navigate(['/']);
        });
    }

}
