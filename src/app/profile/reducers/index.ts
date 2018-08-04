import * as fromProfile from './profile.reducers';
import {UserProfile} from '../models/profile.model';
import {ActionReducerMap} from '@ngrx/store';
import {PostModel} from '../models/post.model';

export interface ProfileState {
  profile: UserProfile;
  posts: PostModel[];
}

export const reducers: ActionReducerMap<ProfileState> = {
  profile: fromProfile.reducer,
  posts: fromProfile.postsReducer
};
