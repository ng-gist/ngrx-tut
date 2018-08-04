import { Action } from '@ngrx/store';
import {UserProfile} from '../models/profile.model';
import {PostMetaModel} from '../models/postMeta.model';
import {PostModel} from '../models/post.model';

export enum ProfileActionTypes {
  RetrieveUserProfile = '[Profile] Retrieve Profile',
  RetrieveUserProfileSuccess = '[Profile] Retrieve Profile Successful',
  RetrieveUserProfileFailure = '[Profile] Retrieve Profile Failed',
  RetrievePostDetails = '[Post] Retrieve Details',
  RetrievePostDetailsSuccess = '[Post] Retrieve Details Success',
  RetrievePostDetailsFailure = '[Post] Retrieve Details Failure',
}
export class RetriveUserProfile implements Action {
  readonly type = ProfileActionTypes.RetrieveUserProfile;

  constructor(public payload: string) {}
}

export class RetrieveUserProfileSuccess implements Action {
  readonly type = ProfileActionTypes.RetrieveUserProfileSuccess;

  constructor(public payload: UserProfile) {}
}

export class RetrieveUserProfileFailure implements Action {
  readonly type = ProfileActionTypes.RetrieveUserProfileFailure;

  constructor(public error: any) {}
}

/*
* This action triggers the call to get post details.
*/
export class RetrievePostDetails implements Action {
  readonly type = ProfileActionTypes.RetrievePostDetails;

  constructor(public payload: PostMetaModel[]) {}
}
/*
* This action gets called when the retrieve of post data is successful.
*/
export class RetrievePostDetailsSuccess implements Action {
  readonly type = ProfileActionTypes.RetrievePostDetailsSuccess;

  constructor(public payload: PostModel[]) {}
}

export class RetrievePostDetailsFailure implements Action {
  readonly type = ProfileActionTypes.RetrievePostDetailsFailure;

  constructor(public payload: string) {}
}

export type ProfileActions = RetriveUserProfile
  | RetrieveUserProfileSuccess
  | RetrieveUserProfileFailure
  | RetrievePostDetails
  | RetrievePostDetailsSuccess
  | RetrievePostDetailsFailure;
