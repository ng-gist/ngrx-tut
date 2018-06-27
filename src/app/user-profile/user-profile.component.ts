import { Component, OnInit } from '@angular/core';
import {ProfileState} from '../profile/reducers';
import {Store} from '@ngrx/store';
import * as ProfileActions from '../profile/actions/profile.actions';
import {Observable} from 'rxjs';
import {UserProfile} from '../profile/models/profile.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileData$: Observable<ProfileState>;
  profileData: UserProfile;

  constructor(private store: Store<ProfileState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.store.dispatch(new ProfileActions.RetriveUserProfile(params.get('userId')));
    });
    this.profileData$ = store.select('user');
    this.profileData$.subscribe((user) => {
      this.profileData = user.profile;
    });
  }

  ngOnInit() {
  }

}
