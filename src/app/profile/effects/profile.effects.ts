import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProfileService} from '../services/profile.service';
import {ProfileActionTypes, RetrieveUserProfileSuccess, RetriveUserProfile} from '../actions/profile.actions';
import {catchError, switchMap} from 'rxjs/internal/operators';
import {Store} from '@ngrx/store';
import {ProfileState} from '../reducers';

@Injectable()
export class ProfileEffects {
  @Effect()
  getUserProfile = this.actions.pipe(
    ofType(ProfileActionTypes.RetrieveUserProfile),
    switchMap((action: RetriveUserProfile) => this.profileService.retrieveSteemProfile(action.payload, (err, userProfile) => {
      if (err) {
        catchError(error => this.profileService.handleAuthError(error));
      }
      this.store.dispatch(new RetrieveUserProfileSuccess(userProfile[0]));
    }))
  );

  constructor(
    private actions: Actions,
    private store: Store<ProfileState>,
    private profileService: ProfileService
  ) {}
}
