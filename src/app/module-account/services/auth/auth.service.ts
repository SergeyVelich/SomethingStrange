import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';

import { BaseService } from "../../../module-shared/services/base.service";
import { ConfigService } from '../../../module-shared/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager = new UserManager(this.getClientSettings());
  private user: User | null;

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();

    this.manager.getUser().then(user => {
      this.user = user;
      this._authNavStatusSource.next(this.isAuthenticated());
    });
  }

  login(returnUrl: string) {
    localStorage.setItem('returnUrl', returnUrl);
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
    this.user = await this.manager.signinRedirectCallback();
    this._authNavStatusSource.next(this.isAuthenticated());
  }

  register(userRegistration: any) {
    return this.http.post(this.configService.authApiURI + '/account/register', userRegistration).pipe(catchError(this.handleError));
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  setAuthorizationHeaderValue() {//??
    if (this.user != null && !this.user.expired) {
      this.configService.authorizationHeaderValue = `${this.user.token_type} ${this.user.access_token}`;
    }
    else {
      this.configService.authorizationHeaderValue = null;
    }
  }

  signout() {
    this.manager.signoutRedirect();
    this.manager.removeUser();
    this.manager.clearStaleState();
  }

  getClientSettings(): UserManagerSettings {
    let originUri = this.configService.originURI;
    let authApiURI = this.configService.authApiURI;
    return {
      client_id: 'angular_client',
      authority: authApiURI,
      redirect_uri: originUri + '/auth-callback',
      post_logout_redirect_uri: originUri,
      response_type: "code",
      scope: "openid profile email resourceapi",
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true,
      silent_redirect_uri: originUri + '/silent-refresh.html',
    };
  }
}
