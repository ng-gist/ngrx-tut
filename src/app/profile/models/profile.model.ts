export interface Profile {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface UserProfile {
  profile: Profile;
}
