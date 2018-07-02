# Learn how to build enterprise level applications using full suite of NgRx and Angular 6

When I started learning Angular 6 and NgRx, I realised all the available tutorials are either too complex to understand or cover too little. In this tutorial, my goal is to provide a simple explaination of NgRx and all its modules like actions, effects and reducers.This will allow you to build reactive applications which are fast and scalable.

## What will you learn in this tutorial

- Setting up angular 6 project.
- Setting up ngrx/store
- Executing effects when certain Actions are triggered
- State and reducers

## Requirements

- Basic understanding of Angular
- Basic understanding of rxjs
- Basic understanding of API's and access to some api account. I will be using github for our example.
- Some knowledge of typescript is nice to have.
- Install latest version of angular-cli and npm

## Concepts

Before we jump into coding, first we need to clear up few concepts.

### What is NgRx?
NgRx is the angular implementation of Redux and RxJS. Redux is state management framework. It is based on the Single source of truth concept. We write pure functions which have no side effects on the application. In traditional Angular and AngularJs application, data was shared between 2 components or controllers using services. This made tracking changes really difficult and components tighty coupled. Redux shares data by maintaining a state in the store and all the components react to changes in this state using Observable.

### What are Observers?
Observers can be thought of as event listeners in javascript. Just like a click event, if the event is triggered, method attached to it will execute otherwise it will just sit there and do nothing.

### What are actions?
Actions in simpler term are just classes with a mandatory variable "type". When a new action is dispatched, effects and reducers act on it. In our application we will dispatch actions to retrieve user which in turn will call other actions for either success or failure.

### What are effects?
Effects are a way to communicate with the api's outside of application. These are to manage side effects. In our example we will use effects to make a call to github and retrieve user profile.

### What are reducers?
Reducers are dumb classes in my opinion. They take the data passed by actions and effects and modify state object. In our example, reducer will update the state object with profile data.

### What are models?
Angular 6 uses typescript. We use models in our application to implement type checking.

### What are services?
Services are the file that will contain actual logic to make call to external api's using http and handle error responses.

### How to build a reactive application?
This is something that I have seen no one explain in their tutorials and I learned it with experience. When you are building a reactive application, you don't need to worry about what your view would look like. In my example, view was the last thing that I built. You only need to concern yourself with the functional requirement and build actions, effects and reducers. View can come later. Infact, there can be two separate teams building functional code and other consuming them in their components. Since views use observables to consume data, they are completely decoupled with the functional code.

### Flow Diagram
![Flow Diagram](https://user-images.githubusercontent.com/13856451/42004666-b9335ff2-7a25-11e8-9fa6-17d21d3e3f2c.png)

*This flow diagram has more components then I have created in the application so far. These components will follow in future tutorials.*

## Setup

**Lets start by creating a new Angular 6 project:**

```text
ng new ngrx-tut --routing
```

Here I have create a new project with routing enabled. Every enterprise level application requires routing. We will make use of routes in future tutorials to load user repositories and issues entered by user.
 
**Next install NgRx store and save it to your package.json file.**
 
```text
npm install @ngrx/router-store --save
```

**Now we will create the package structure**

We will create a folder for actions, effects, models, reducers and services. I include the type of file in the file name.

![Package Structure](https://user-images.githubusercontent.com/13856451/42005499-acc38806-7a29-11e8-8154-adb916ccbb42.png)

**ProfileActions**

_profile.actions.ts_
```js
export class RetriveUserProfile implements Action {
  readonly type = ProfileActionTypes.RetrieveUserProfile;

  constructor(public payload: string) {}
}
export class RetrieveUserProfileSuccess implements Action {
  readonly type = ProfileActionTypes.RetrieveUserProfileSuccess;

  constructor(public payload: UserProfile) {}
}
```

- An action class implements Action interface which requires a property named type. 
- constructor is optional and it is defined when some payload is passed to the Action.
- In our case, we will pass username as payload to RetriveUserProfile action and UserProfile object to RetrieveUserProfileSuccess Action.
 
 **ProfileEffects**
 
 _profile.effects.ts_
 ```js
@Effect()
getUserProfile = this.actions.pipe(
  ofType(ProfileActionTypes.RetrieveUserProfile),
  exhaustMap((action: RetriveUserProfile) => this.profileService.retrieveProfile(action.payload)
    .pipe(
      catchError(error => this.profileService.handleAuthError(error)),
      map((userProfile: UserProfile) => new RetrieveUserProfileSuccess(userProfile))
    ))
);
```

- You can mark a method as effect by added "@Effect()" annotation to the method.
- "ofType" does a comparison on Observables. Here it will check if Action is of type=RetrieveUserProfile. If so, it will call exhaustMap.
- exhaustMap will cancel all subsequent calls until first call is complete.
- Within exhaustMap, we are calling service which either returns an error or userProfile
- If an error is returned, it will be caught by catchError and will be passed on to service to be handled.
- If the service returns success, another action is called with userProfile as its payload.

**ProfileService**

_profile.service.ts_
```js
public retrieveProfile(username: string): Observable<UserProfile> {
  return this.http
    .get<UserProfile>(`${this.hostName}/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`,
      {responseType: 'json'});
}
```
- retrieveProfile method makes a http call to Git api to get profile information and returns the response in json format.
- response is then processed by effect as described above.

**ProfileReducers**

_profile.reducers.ts_
```js
switch (action.type) {
  case ProfileActionTypes.RetrieveUserProfile: {
    return  state;
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
```

- Switch generates a state object based on whichever action is called.
- When RetriveUserProfile action is dispatched, Reducer returns the state as is. In future we will set loading property on this state to show a progress bar.
- When RetrieveUserProfileSuccess is dispatched from the Effect, we create a new state with profile data and return that state.

_index.ts_
```js
import * as fromProfile from './profile.reducers';
...
export interface ProfileState {
  profile: UserProfile;
}

export const reducers: ActionReducerMap<ProfileState> = {
  profile: fromProfile.reducer
};
```
Then we add this reducer to the ActionReducerMap with a key (profile in our case)

#### Now to the component

**User-Profile component**

```js
this.route.paramMap.subscribe(params => {
  this.store.dispatch(new ProfileActions.RetriveUserProfile(params.get('userId')));
});
```

This code in constructor is subscribing to router parameter changes. When we redirect to this state with a username, the store will
dispatch an action to retrieve user profile by passing username as payload to the constructor.

```js
this.profileData$ = store.select('user');
this.profileData$.subscribe((user) => {
  this.profileData = user.profile;
});
``` 
- In our example, this code resides in the same component from where action was dispatched. In reality, it can exist anywhere in the application.
- profileData$ is an observable that we get from user store.
- Whenever there is a change to this store, subscribe will trigger the method to update profileData.
- Profile Data will be used in html of the component to display profile information.

#### Wiring ngrx specific classes and methods

At this point we have written all the important pieces of code that need to work together to get profile information from github and display on a html but all these
components are not aware of each other and Angular. For that we need to wire the application. Though you can wire the application in one file, I like to keep
everything segregated in their own component areas so its readable and loosely coupled.

**Wiring Effect and Reducers**

profile.module.ts
```js
import {reducers} from './reducers';
...
@NgModule({
  imports: [
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([ProfileEffects])
  ],
  declarations: [UserProfileComponent]
})
export class RootProfileModule {}
``` 

- Since Actions are plain classes, we don't need to wire those.
- Here we are importing reducers and Effects using NgModule annotation and tying them to RootProfileModule class.

**Wiring Service**

```js
@NgModule()
export class ProfileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootProfileModule,
      providers: [ProfileService]
    };
  }
}
```

- This will induce service so its available to this module.

```js
@NgModule({
  ...
  imports: [
    ...
    ProfileModule.forRoot()
  ],
  ...
})
export class AppModule { }
```

- Lastly we add ProfileModule.forRoot() into the imports of AppModule.
- AppModule is bootstraped in main.ts

```js
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
```

And that's it, Your NgRx specific classes and methods are wired to your application.

#### Running the application

Go the terminal and type 

```text
ng serve
```

This will compile and run the application on http://localhost:4200. Type in any github username and it will show the profile.

### Summary

So far we have learned how to define action, effects and reducers and wire them all together. We hit github api using a service and update the store based on the results.
This will help you build clean, scalable applications which are loosely coupled. Best part of this is, as you build some muscle memory, this becomes way more easier than
writing traditional applications and lot of the code is one time setup.

