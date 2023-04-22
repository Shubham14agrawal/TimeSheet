import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

/**
 * Compares the password and the confirmPassword fields and returns null or "passwordsDontMatch" depending on whether the value of the 
 * two fields match or not.
 * @returns - null or "passwordsDontMatch".
 */
export function passwordsMatchValidators(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {

      return {

        passwordsDontMatch: true

      }

    }

    return null;

  };

}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordsMatchValidators() });


  constructor(private authService: AuthenticationService, private router: Router, private toast: HotToastService) { }

  ngOnInit(): void { 
    
   
  }

  /**
   * Gets the name form control.
   */
  get name() {

    return this.signUpForm.get('name');

  }

  /**
   * Gets the email form control.
   */
  get email() {

    return this.signUpForm.get('email');

  }

  /**
   * Gets the password form control.
   */
  get password() {

    return this.signUpForm.get('password');

  }

  /**
   * Gets the confirmPassword form control.
   */
  get confirmPassword() {

    return this.signUpForm.get('confirmPassword');

  }

  /**
   * Calls the signUp function from the authService and passes as parameter the value of the form (which is three values). If the signup is 
   * successful (i.e. if all the signUpForm fields are properly filled in and the user doesn't yet exist in Firebase) the function creates 
   * a new user and navigates him/her to the home page.
   * @returns - nothing. The function simply stops running if the form is invalid.
   */
  submit() {

    if (!this.signUpForm.valid) {

      return;
      
    }

    let { name, email, password } = this.signUpForm.value;

    this.authService.signUp(name, email, password).pipe(

      this.toast.observe({

        success: 'Congrats! You are all signed up.',
        loading: 'Signing up...',
        error: ({ message }) => `${message}`

      })

    ).subscribe((data) => {
      
      var Uid=this.authService.auth?this.authService.auth.currentUser?.uid?this.authService.auth.currentUser.uid:'':'';

      this.authService.isManager().subscribe(d => {
        if(d && d.find((x: { UserId: any; })=>x.UserId == Uid)){
          this.router.navigate(['/timeSheetList']);
      }
      else this.router.navigate(['/home']);
     });
      
    });

  }

}
