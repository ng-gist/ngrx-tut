import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {UserProfile} from '../models/profile.model';
import {RetrieveUserProfileFailure} from '../actions/profile.actions';
import {Store} from '@ngrx/store';

@Injectable()
export class ProfileService {
  private hostName = 'https://api.github.com';
  private clientId = 'Iv1.89baa66c3cd4276e';
  private clientSecret = '1a000d8ec39731486bab78dcd1e03feeb648173c';
  constructor(private http: HttpClient, private store: Store<UserProfile>) {}
  public retrieveProfile(username: string): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(`${this.hostName}/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`,
        {responseType: 'json'});
  }
  public handleAuthError(error: HttpErrorResponse): Observable<UserProfile> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status === 401) {
      this.store.dispatch(new RetrieveUserProfileFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Auth Error: ${JSON.stringify(error, null, 2)}`);
  }
}
