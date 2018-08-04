import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProfileService} from '../services/profile.service';
import {
  ProfileActionTypes,
  RetrievePostDetails,
  RetrievePostDetailsSuccess,
  RetrieveUserProfileSuccess,
  RetriveUserProfile
} from '../actions/profile.actions';
import {catchError, switchMap} from 'rxjs/internal/operators';
import {Store} from '@ngrx/store';
import {ProfileState} from '../reducers';
import {PostModel} from '../models/post.model';

@Injectable()
export class ProfileEffects {
  @Effect()
  getUserProfile = this.actions.pipe(
    ofType(ProfileActionTypes.RetrieveUserProfile),
    switchMap((action: RetriveUserProfile) => this.profileService.retrieveSteemProfile(action.payload, (err, userProfile) => {
      if (err) {
        catchError(error => this.profileService.handleError(error));
      }
      this.store.dispatch(new RetrieveUserProfileSuccess(userProfile[0]));
    }))
  );
  /*
  * This effect intercepts RetrieveBotInformation action and calls the service.
   */
  @Effect()
  getPostDetails = this.actions.pipe(
    ofType(ProfileActionTypes.RetrievePostDetails),
    switchMap((action: RetrievePostDetails) => this.profileService.retrivePostsInfo(action.payload, (err, postList: PostModel[]) => {
      if (err) {
        catchError(error => this.profileService.handleError(error));
      }
      if (postList.length > 0) {
        this.store.dispatch(new RetrievePostDetailsSuccess(postList));
      }
    }))
  );

  constructor(
    private actions: Actions,
    private store: Store<ProfileState>,
    private profileService: ProfileService
  ) {}
}
