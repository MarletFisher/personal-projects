import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ms-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private fb: FormBuilder) {}

  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern('^[A-z0-9]{6,14}$')]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-z0-9!@#$%^&*()]{8,16}$'
        )
      ]
    ]
  });

  onSubmit() {
    // const ctrls = this.loginForm.controls;
    console.log('Login submitted is ', this.loginForm.value);
    console.log('Is the info valid?', this.loginForm.valid);
  }
}
