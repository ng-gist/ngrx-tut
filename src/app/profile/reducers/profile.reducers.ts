import {UserProfile} from '../models/profile.model';
import {ProfileActions, ProfileActionTypes} from '../actions/profile.actions';

export const initialState: UserProfile = {
  profile: {
    login: null,
    avatar_url: null,
    html_url: null
  }
};

export function reducer(state = initialState, action: ProfileActions): UserProfile {
  switch (action.type) {
    case ProfileActionTypes.RetrieveUserProfile: {
      return {
        ...state
      };
    }
    case ProfileActionTypes.RetrieveUserProfileSuccess: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
}
