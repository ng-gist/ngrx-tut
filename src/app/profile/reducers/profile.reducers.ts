import {UserProfile} from '../models/profile.model';
import {ProfileActions, ProfileActionTypes} from '../actions/profile.actions';
import {PostModel} from '../models/post.model';

export const initialState: UserProfile = {
  name: null,
  profile_image: null,
  about: null,
  location: null
};

export function reducer(state = initialState, action: ProfileActions): UserProfile {
  switch (action.type) {
    case ProfileActionTypes.RetrieveUserProfile: {
      return  state;
    }
    case ProfileActionTypes.RetrieveUserProfileSuccess: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export function postsReducer(state, action: ProfileActions): PostModel[] {
  switch (action.type) {
    case ProfileActionTypes.RetrievePostDetailsSuccess: {
      return action.payload;
    }
    default: {
      return [];
    }
  }
}
