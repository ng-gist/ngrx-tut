import * as fromProfile from './profile.reducers'
import {UserProfile} from '../models/profile.model';
import {ActionReducerMap} from '@ngrx/store';

export interface ProfileState {
  profile: UserProfile;
}

export const reducers: ActionReducerMap<ProfileState> = {
  profile: fromProfile.reducer
};
