import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorCodesService } from 'src/app/services/firebase-error-codes.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // FORM

  registerForm: FormGroup;

  // CONSTRUCTOR

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseErrors: FirebaseErrorCodesService) {

    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  ngOnInit(): void { }

  registerUser() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    // IF PASSWORD AND CONFIRM PASSWORD DO NOT MATCH

    if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error', {
        timeOut: 5000,
      });
      return;
    }


    // CREATE USER WITH EMAIL AND PASSWORD

    this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {

      this.resetPassword();
    }).catch((error) => {
      this.toastr.error(this.firebaseErrors.registerErrors(error.code), 'Error', {
        timeOut: 5000
      });

    });
  }

  resetPassword() {
    this.afAuth.currentUser.then((user) => user?.sendEmailVerification()).then(() => {
      this.toastr.info('We send you an email to verify your email address', 'Verify email', {
        timeOut: 5000,
      });
      // TO SHOW TOASTR MESSAGE CORRECTLY
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000
      );

    })





  }


}
