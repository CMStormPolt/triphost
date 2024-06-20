import { Component, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import {ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { UserServiceService } from '../../services/userService/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserServiceService) {}

  validatePasswordMatch = (control: AbstractControl): {[key: string]: any} | null => {
    const password = this.profileForm?.get('password')?.value as string;
    const passwordConfirm = control.value as string;
  
    if (password !== passwordConfirm) {
      return {passwordMatch: true};
    }
  
    return null;
  };

  profileForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    repeatPassword: new FormControl('', []),
    name: new FormControl('', []),
  });


  hide = signal(true);

  clickEvent(event: MouseEvent) {
    event.stopPropagation();
    this.hide.set(!this.hide());
  }

  isSignUp = signal(false)

  signUpClick(event: MouseEvent) {
    event.stopPropagation();
    this.isSignUp.set(!this.isSignUp());
    if(this.isSignUp()){
      this.profileForm.controls.repeatPassword.addValidators(
         [Validators.required,
        Validators.minLength(4),
        this.validatePasswordMatch
      ]);
      this.profileForm.controls.name.addValidators(
         [Validators.required,
        Validators.minLength(4),
      ]);
      this.profileForm.controls.repeatPassword.updateValueAndValidity();
      this.profileForm.controls.name.updateValueAndValidity();
    } else {
      this.profileForm.controls.repeatPassword.setValidators([]);
      this.profileForm.controls.name.setValidators([]);
      this.profileForm.controls.repeatPassword.updateValueAndValidity();
      this.profileForm.controls.name.updateValueAndValidity();
    }
  }

  async onSubmit() {
    const { email, password, name } = this.profileForm.value
    if(!this.isSignUp()) {
      const result = await this.userService.loggIn(email!, password!)
      //TODO: handle failed login
    } else {
      const result = await this.userService.signUp({
        email: email!,
        password: password!,
        name: name!,
        id: Math.floor(Math.random() * 100)
      })
      if(result){
        this.userService.loggIn(email!, password!);
      } else {
        //TODO: handle existing user with that email
      }

    }
  }
}
