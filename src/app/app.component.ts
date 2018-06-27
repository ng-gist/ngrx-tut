import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {ProfileState} from './profile/reducers';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profileData$: Observable<ProfileState>;
  username = '';
  constructor (private store: Store<ProfileState>) {
    this.profileData$ = store.select('user');
    this.profileData$.subscribe((user) => {
      this.username = user.profile.login;
    });
  }
}
