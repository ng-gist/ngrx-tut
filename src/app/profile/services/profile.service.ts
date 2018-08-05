import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {UserProfile} from '../models/profile.model';
import {RetrievePostDetailsFailure, RetrieveUserProfileFailure} from '../actions/profile.actions';
import {Store} from '@ngrx/store';
import * as steem from 'steem';
import {PostMetaModel} from '../models/postMeta.model';
import * as _ from 'lodash';

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
  public retrieveSteemProfile(username: string, cb): Array<any> {
    Promise.all([this.getAccountWithPromise('mightypanda'), this.getAccountWithPromise('ned')]).then((res)  => {
      if (res != null) {
        cb(null, res[0]);
      }
    });
    return [];
    // return steem.api.getAccountsAsync([username], cb);
  }
  private getAccountWithPromise(username): Promise<any> {
    return new Promise((resolve, reject) => {
      steem.api.getAccounts([username], (err, userProfiles) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(userProfiles);
        }
      });
    });
  }
  public retrivePostsInfo(bids: PostMetaModel[], cb): Array<any> {
    const methodCalls = [];
    _.map(bids, (bid) => {
      methodCalls.push(this.getPostInformation(bid.author, bid.permlink));
    });
    Promise.all(
      methodCalls
    ).then((results) => {
      cb(null, results);
    });
    return [];
  }
  /*
  * This method gets post information using steem api and then promisefies the response.
  * This is essential so we can make all the calls and then bundle that response using Promise.all
  */
  private getPostInformation(author, permlink): Promise<any> {
    return new Promise((resolve, reject) => {
      steem.api.getContent(author, permlink, (err, postInformation) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(postInformation);
        }
      });
    });
  }
  public handleError(error: HttpErrorResponse): Observable<UserProfile> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status !== 200) {
      this.store.dispatch(new RetrieveUserProfileFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Error: ${JSON.stringify(error, null, 2)}`);
  }

  public handlePostRetrieveError(error: HttpErrorResponse): Observable<UserProfile> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status !== 200) {
      this.store.dispatch(new RetrievePostDetailsFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Error: ${JSON.stringify(error, null, 2)}`);
  }
}
