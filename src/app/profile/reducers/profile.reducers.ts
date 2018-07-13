import {UserProfile} from '../models/profile.model';
import {ProfileActions, ProfileActionTypes} from '../actions/profile.actions';

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
