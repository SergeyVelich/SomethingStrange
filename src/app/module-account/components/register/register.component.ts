import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators'
import { AuthService } from '../../services/auth/auth.service';
import { UserRegistration } from '../../models/user.registration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  success: boolean;
  error: string;
  userRegistration: UserRegistration = new UserRegistration('', '', '');
  submitted: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }

  onSubmit() {

    // this.spinner.show();

    this.authService.register(this.userRegistration)
      .pipe(finalize(() => {
        // this.spinner.hide();
      }))
      .subscribe(
        result => {
          if (result) {
            this.success = true;
          }
        },
        error => {
          this.error = error;
        });
  }
}
