import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorCodesService {

  constructor() { }

  // FIREBASE ERRORS - REGISTER-
  registerErrors(code: string) {

    switch (code) {
      case 'auth/email-already-in-use':
        return 'User already exist';
      case 'auth/weak-password':
        return 'Password too short, minimum 6 characters';
      case 'auth/invalid-email':
        return 'Email format is wrong';
      default:
        return 'All fields are required';
    }

  }

  // FIREBASE ERRORS - LOGIN-
  loginErrors(code: string) {

    switch (code) {
      case 'auth/wrong-password':
        return 'Password is wrong';
      case 'auth/invalid-password':
        return ' Password must be a string with at least six characters. ';
      case 'auth/user-not-found':
        return 'User not found';
      default:
        return 'All fields are required';
    }

  }
}
