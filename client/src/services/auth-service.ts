import sc2 from 'steemconnect';

import environment from 'environment';

export class AuthService {
  public api = new sc2.Initialize({
    app: environment.steemconnect.app,
    callbackURL: environment.steemconnect.callbackURL,
    accessToken: environment.steemconnect.accessToken,
    scope: environment.steemconnect.scope
  });

  public loginURL = this.api.getLoginURL();

  public get token(): string {
    return localStorage.getItem('access_token');
  }

  public init(queryParams) {
    this.api.setAccessToken(queryParams.access_token);
    localStorage.setItem('access_token', queryParams.access_token);
    localStorage.setItem('expires', String(new Date().getTime() + Number(queryParams.expires_in)));
    localStorage.setItem('username', queryParams.username);
  }
  
  public async logout() {
    this.api.revokeToken(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires');
        localStorage.removeItem('username');
        
        return true;
    });
  }
}
