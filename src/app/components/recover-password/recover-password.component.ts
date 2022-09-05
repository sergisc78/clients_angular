import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorCodesService } from 'src/app/services/firebase-error-codes.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverPass: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseErrors: FirebaseErrorCodesService) {


    this.recoverPass = this.fb.group({
      email: [null, [Validators.required,Validators.email]]
    })

  }

  ngOnInit(): void {
  }

  // RECOVER PASSWORD WITH EMAIL
  recover() {

    const email = this.recoverPass.value.email
    
    this.afAuth.sendPasswordResetEmail(email).then(()=>{
      this.toastr.info('We send you an email to reset your password', 'Reset password', {
        timeOut: 5000,
      });
      // TO SHOW TOASTR MESSAGE CORRECTLY
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000
      );

    }).catch((error)=>{
      this.toastr.error(this.firebaseErrors.loginErrors(error.code),'Error')
    })



  }

}
