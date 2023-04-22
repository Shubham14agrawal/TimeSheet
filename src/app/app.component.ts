import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'SignUp-LogIn';

  constructor(public authService: AuthenticationService, private router: Router) { }

  /**
   * Logs out the user by calling the logout function from the authService. It then navigates him/her to the landing page.
   */
  logOut() {

    this.authService.logOut().subscribe(() => {

      this.router.navigate(['']);

    });

  }

}
