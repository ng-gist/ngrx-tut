import { Action } from '@ngrx/store';
import {UserProfile} from '../models/profile.model';

export enum ProfileActionTypes {
  RetrieveUserProfile = '[Profile] Retrieve Profile',
  RetrieveUserProfileSuccess = '[Profile] Retrieve Profile Successful',
  RetrieveUserProfileFailure = '[Profile] Retrieve Profile Failed'
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

export type ProfileActions = RetriveUserProfile
  | RetrieveUserProfileSuccess
  | RetrieveUserProfileFailure;
