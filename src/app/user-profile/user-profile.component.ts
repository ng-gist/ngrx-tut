import { Component, OnInit } from '@angular/core';
import {ProfileState} from '../profile/reducers';
import {Store} from '@ngrx/store';
import * as ProfileActions from '../profile/actions/profile.actions';
import {Observable} from 'rxjs';
import {UserProfile} from '../profile/models/profile.model';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {PostMetaModel} from '../profile/models/postMeta.model';
import {PostModel} from '../profile/models/post.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileData$: Observable<ProfileState>;
  profileData: UserProfile;
  userPosts: PostModel[];

  constructor(private store: Store<ProfileState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.store.dispatch(new ProfileActions.RetriveUserProfile(params.get('username')));
    });
    this.profileData$ = store.select('user');
    this.profileData$.subscribe((user) => {
      const profileMetadata = _.get(user, 'profile.json_metadata');
      if (profileMetadata) {
        const jsonMetadata = JSON.parse(profileMetadata);
        this.profileData = jsonMetadata.profile;
      }
      this.userPosts = _.get(user, 'posts');
      console.log(this.userPosts);
    });
  }

  getPosts() {
    const inputData = [];
    inputData.push({
      author: 'mightypanda',
      permlink: 'esteem-1-6-0-cannot-exit-set-pin-screen-without-setting-any-pin'
    }, {
      author: 'mightypanda',
      permlink: 'steem-curator-sorting-feature-and-utopian-posts'
    }, {
      author: 'mightypanda',
      permlink: 'steemcurator-com-update-sorting-and-special-posts-overview'
    });
    this.store.dispatch(new ProfileActions.RetrievePostDetails(inputData));
  }

  ngOnInit() {
    this.store.select('user').subscribe((postsDetails) => {
      console.log('*******');
    });
  }

}
