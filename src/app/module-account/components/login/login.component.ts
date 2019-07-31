import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  title = "Login";

  login() {
    // this.spinner.show();
    this.authService.login(this.returnUrl);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['redirect'];

    // this.spinner.show();
    this.authService.login(this.returnUrl);
  }
}


