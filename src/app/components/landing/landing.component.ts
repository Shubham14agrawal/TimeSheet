import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router, private toast: HotToastService) { }

  ngOnInit(): void {
    var Uid=this.authService.auth?this.authService.auth.currentUser?.uid?this.authService.auth.currentUser.uid:'':'';

      this.authService.isManager().subscribe(d => {
        if(d && d.find((x: { UserId: any; })=>x.UserId == Uid)){
          this.router.navigate(['/timeSheetList']);
      }
      else this.router.navigate(['/home']);
     });
  }

}
