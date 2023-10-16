import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import AccountService from 'src/app/service/account.service';
import { RegistrationResponse } from 'src/app/types/RegistrationResponse';

@Component({
  selector: 'ms-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @ViewChild('usernameError') usernameErrorDiv: ElementRef;
  @ViewChild('passwordError') passwordErrorDiv: ElementRef;
  @ViewChild('emailError') emailErrorDiv: ElementRef;
  @ViewChild('fnameError') fnameErrorDiv: ElementRef;
  @ViewChild('lnameError') lnameErrorDiv: ElementRef;
  @ViewChild('phoneError') phoneErrorDiv: ElementRef;
  @ViewChild('streetError') streetErrorDiv: ElementRef;
  @ViewChild('cityError') cityErrorDiv: ElementRef;
  @ViewChild('stateError') stateErrorDiv: ElementRef;
  @ViewChild('countryError') countryErrorDiv: ElementRef;
  @ViewChild('zipError') zipErrorDiv: ElementRef;

  @ViewChild('errorMessage') errorMessageDiv: ElementRef;
  @ViewChild('messageBox') messageBoxDiv: ElementRef;

  signupForm = this.fb.group({
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
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      ]
    ],
    personalInfo: this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=[A-z]*)[A-z]*[.]*\\s*[A-z]*\\s*[A-z]*$')
        ]
      ],
      lastName: [
        '',
        [Validators.pattern('^(?=[A-z]*)[A-z]*[-]*\\s*[A-z]*\\s*[A-z]*$')]
      ],
      phoneNumber: ['', [Validators.pattern('^[0-9-\\s]{10,16}$')]]
    }),
    address: this.fb.group({
      street: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+[\\sA-z]+$')]
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-z]+\\s*[A-z]*\\s*[A-z]*$')
        ]
      ],
      state: [
        '',
        [Validators.required, Validators.pattern('^[A-z]+\\s*[A-z]*$')]
      ],
      country: [
        '',
        [Validators.required, Validators.pattern('^[A-z]+\\s*[A-z]*$')]
      ],
      zip: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([0-9]{5}$|^[A-z][0-9][A-z]\\s*[0-9][A-z][0-9]$)'
          )
        ]
      ]
    }),
    notes: [''],
    status: ['']
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    this.initObservable();
  }

  initObservable() {
    this.signupForm.valueChanges.subscribe(value => {
      console.log('In form subscribe, form.value: ', value);
      this.checkForm();
    });
  }

  onSubmit() {
    // const ctrls = this.signupForm.controls;
    console.log('The sign up info is ', this.signupForm.value);
    console.log(this.signupForm.controls);
    console.log('The validity is ', this.signupForm.valid);

    if (this.signupForm.valid) {
      const account = this.signupForm.value;
      this.accountService
        .getAccount(account)
        .subscribe((account: RegistrationResponse) => {
          if (account.status === 'success') {
            console.log('Your account has successfully been registered.');
            this.registerSuccessMessage();
          } else {
            console.log(
              'Your account was unable to be registered because ',
              account.errors[0].msg
            );
            if (account.errors[0].msg === 'username used') {
              this.usernameErrorDiv.nativeElement.style.opacity = 1;
              this.errorMessageDiv.nativeElement.innerHTML =
                'Registration failed because ' + account.errors[0].msg;
              this.messageBoxDiv.nativeElement.style.opacity = 1;
            } else if (account.errors[0].msg === 'email used') {
              this.emailErrorDiv.nativeElement.style.opacity = 1;
              this.errorMessageDiv.nativeElement.innerHTML =
                'Registration failed because ' + account.errors[0].msg;
              this.messageBoxDiv.nativeElement.style.opacity = 1;
            }
          }
        });
    } else {
      console.log(this.signupForm.status);
      this.checkForm();
      this.errorMessageDiv.nativeElement.innerHTML =
        'Please correct ' + this.checkFlag();
      this.messageBoxDiv.nativeElement.style.opacity = 1;
    }

    console.log('Submit function finished.');
  }

  onReset() {
    const ctrls = this.signupForm.controls;
    const personalInfoCtrls = ctrls.personalInfo.controls;
    const addressCtrls = ctrls.address.controls;
    console.log('Resetting...');
    ctrls.username.reset('');
    ctrls.password.reset('');
    ctrls.email.reset('');
    personalInfoCtrls.firstName.reset('');
    personalInfoCtrls.lastName.reset('');
    personalInfoCtrls.phoneNumber.reset('');
    addressCtrls.street.reset('');
    addressCtrls.city.reset('');
    addressCtrls.state.reset('');
    addressCtrls.country.reset('');
    addressCtrls.zip.reset('');
    ctrls.notes.reset('');
  }

  autofillInfo() {
    const ctrls = this.signupForm.controls;
    const personalInfoCtrls = ctrls.personalInfo.controls;
    const addressCtrls = ctrls.address.controls;
    ctrls.username.setValue('StarPlatinum1');
    ctrls.password.setValue('Koichi123@@');
    ctrls.email.setValue('kujojo@marinebio.jp');
    personalInfoCtrls.firstName.setValue('Jotaro');
    personalInfoCtrls.lastName.setValue('Kujo');
    personalInfoCtrls.phoneNumber.setValue('123 456 7890');
    addressCtrls.street.setValue('12 Grand Hotel street');
    addressCtrls.city.setValue('Morioh');
    addressCtrls.state.setValue('M Prefecture');
    addressCtrls.country.setValue('Japan');
    addressCtrls.zip.setValue('M2M 2M2');
    ctrls.notes.setValue('Please give package to the concierge.');
  }

  formValidity = {
    username: true,
    password: true,
    email: true,
    fname: true,
    lname: true,
    phone: true,
    street: true,
    city: true,
    state: true,
    country: true,
    zip: true
  };

  checkForm() {
    const ctrls = this.signupForm.controls;
    const personalInfoCtrls = ctrls.personalInfo.controls;
    const addressCtrls = ctrls.address.controls;
    console.log('Checking input.');

    // checks

    if (
      this.checkTouched(ctrls.username.dirty) &&
      this.checkInvalid(ctrls.username.valid)
    ) {
      this.usernameErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.usernameErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(ctrls.password.dirty) &&
      this.checkInvalid(ctrls.password.valid)
    ) {
      this.passwordErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.passwordErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(ctrls.email.dirty) &&
      this.checkInvalid(ctrls.email.valid)
    ) {
      this.emailErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.emailErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(personalInfoCtrls.firstName.dirty) &&
      this.checkInvalid(personalInfoCtrls.firstName.valid)
    ) {
      this.fnameErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.fnameErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(personalInfoCtrls.lastName.dirty) &&
      this.checkInvalid(personalInfoCtrls.lastName.valid)
    ) {
      this.lnameErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.lnameErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(personalInfoCtrls.phoneNumber.dirty) &&
      this.checkInvalid(personalInfoCtrls.phoneNumber.valid)
    ) {
      this.phoneErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.phoneErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(addressCtrls.street.dirty) &&
      this.checkInvalid(addressCtrls.street.valid)
    ) {
      this.streetErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.streetErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(addressCtrls.city.dirty) &&
      this.checkInvalid(addressCtrls.city.valid)
    ) {
      this.cityErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.cityErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(addressCtrls.state.dirty) &&
      this.checkInvalid(addressCtrls.state.valid)
    ) {
      this.stateErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.stateErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(addressCtrls.country.dirty) &&
      this.checkInvalid(addressCtrls.country.valid)
    ) {
      this.countryErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.countryErrorDiv.nativeElement.style.opacity = 0;
    }

    if (
      this.checkTouched(addressCtrls.zip.dirty) &&
      this.checkInvalid(addressCtrls.zip.valid)
    ) {
      this.zipErrorDiv.nativeElement.style.opacity = 1;
    } else {
      this.zipErrorDiv.nativeElement.style.opacity = 0;
    }
  }

  checkInvalid(input: boolean) {
    if (input) {
      console.log('The input is valid.');
      return false;
    } else {
      console.log('The input is invalid.');
      return true;
    }
  }

  checkTouched(input: boolean) {
    if (input) {
      console.log('The input was touched.');
      return true;
    } else {
      return false;
    }
  }

  checkFlag() {
    const ctrls = this.signupForm.controls;
    const personalInfoCtrls = ctrls.personalInfo.controls;
    const addressCtrls = ctrls.address.controls;

    if (!ctrls.username.valid) {
      return 'Username ';
    }
    if (!ctrls.password.valid) {
      return 'Password ';
    }
    if (!ctrls.email.valid) {
      return 'Email ';
    }
    if (!personalInfoCtrls.firstName.valid) {
      return 'First Name ';
    }
    if (!personalInfoCtrls.lastName.valid) {
      return 'Last Name ';
    }
    if (!personalInfoCtrls.phoneNumber.valid) {
      return 'Phone Number ';
    }
    if (!addressCtrls.street.valid) {
      return 'Street Address ';
    }
    if (!addressCtrls.city.valid) {
      return 'City ';
    }
    if (!addressCtrls.state.valid) {
      return 'State ';
    }
    if (!addressCtrls.country.valid) {
      return 'Country ';
    }
    if (!addressCtrls.zip.valid) {
      return 'ZIP Code ';
    } else {
      return '';
    }
  }

  registerSuccessMessage() {
    this.messageBoxDiv.nativeElement.style.opacity = 1;
    this.messageBoxDiv.nativeElement.style.background = '#baff75';
    this.errorMessageDiv.nativeElement.style.color = '#82b352';
    this.errorMessageDiv.nativeElement.innerHTML =
      'Your account has successfully been registered';
    setTimeout(() => {
      this.messageBoxDiv.nativeElement.style.opacity = 0;
      this.errorMessageDiv.nativeElement.style.color = 'white';
      this.messageBoxDiv.nativeElement.style.background = '#ff7575';
    }, 3000);
  }
}
