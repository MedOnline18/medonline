import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBulider: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBulider.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(4) ]]
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.value)
      .subscribe((response: any) => {
        localStorage.setItem('token', response.success.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        this.router.navigate(['/']);
      });
  }

}
