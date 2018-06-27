import {ModuleWithProviders, NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {ProfileEffects} from './effects/profile.effects';
import {ProfileService} from './services/profile.service';
import {UserProfileComponent} from '../user-profile/user-profile.component';

@NgModule()
export class ProfileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootProfileModule,
      providers: [ProfileService]
    };
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([ProfileEffects])
  ],
  declarations: [UserProfileComponent]
})
export class RootProfileModule {}
