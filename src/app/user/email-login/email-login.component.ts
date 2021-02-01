import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;
  serverMessage: string = '';
  constructor(private angularFireAuth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ],
      passwordConfirm: ['', []]
    })
  }

  changeType(val: 'login' | 'signup' | 'reset' = 'signup'){
    this.type = val;
  }
  get isLogin(){
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset(){
    return this.type === 'reset';
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }
  get passwordConfirm(){
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch(){
    if(this.type !== 'signup'){
      return true;
    } else{
      return this.password?.value === this.passwordConfirm?.value
    }

  }

  async onSubmit(){
    this.loading = true;

    const email = this.email?.value
    const password = this.password?.value;

    try {
      if(this.isLogin){
        await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      }
      if(this.isSignup){
        await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
      }
      if(this.isPasswordReset){
        await this.angularFireAuth.sendPasswordResetEmail(email);
      }
    } catch (error) {
      this.serverMessage = error;
    }
    this.loading = false;
  }
}