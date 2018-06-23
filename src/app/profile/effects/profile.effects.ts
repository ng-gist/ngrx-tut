import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProfileService} from '../services/profile.service';
import {ProfileActionTypes, RetrieveUserProfileSuccess, RetriveUserProfile} from '../actions/profile.actions';
import {map, catchError, exhaustMap} from 'rxjs/internal/operators';
import {UserProfile} from '../models/profile.model';

@Injectable()
export class ProfileEffects {
  @Effect()
  getUserProfile = this.actions.pipe(
    ofType(ProfileActionTypes.RetrieveUserProfile),
    exhaustMap((action: RetriveUserProfile) => this.profileService.retrieveProfile(action.payload)
      .pipe(
        catchError(error => this.profileService.handleAuthError(error)),
        map((userProfile: UserProfile) => new RetrieveUserProfileSuccess(userProfile))
      ))
  );

  constructor(
    private actions: Actions,
    private profileService: ProfileService
  ) {}
}
