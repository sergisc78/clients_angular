import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorCodesService } from 'src/app/services/firebase-error-codes.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseErrors: FirebaseErrorCodesService) {

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  // LOGIN WITH EMAIL AND PASSWORD

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {

      // VERIFY USER
      if (user.user?.emailVerified) {
        this.toastr.success('Logged in sucessfully', 'Login', {
          timeOut: 5000,
        });
        // TO SHOW TOASTR MESSAGE CORRECTLY
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 5000
        );
      } else {
        this.router.navigate(['/verify-account']);
      }
    }).catch((error) => {
      this.toastr.error(this.firebaseErrors.loginErrors(error.code), 'Error', {
        timeOut: 5000
      })

    });


  }

}


