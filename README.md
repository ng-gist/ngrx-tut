# Learn how to build enterprise level applications using full suite of NgRx and Angular 6

When i started learning Angular 6 and NgRx, I realised all the available tutorials are either too complex to understand or cover too little ground. In this tutorial, my goal is to provide a simple explaination of NgRx and all its modules like actions, effects and reducers.This will allow you to build reactive applications which are fast and scalable.

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

## Concepts

Before we jump into coding, first we need to clear up few concepts.

### What is NgRx?
NgRx is the angular implementation of Redux and RxJS. Redux is state management framework. It is based on the Single source of truth concept. We write pure functions which have no side effects on the application. In traditional Angular and AngularJs application, data was shared between 2 components or controllers using services. This made tracking changes really difficult and components tighty coupled. Redux shares data by maintaining a state in the store and all the components react to changes in this state using Observable.

### What are Observers?
Observers can be thought of as event listners in javascript. Just like a click event, if the event is triggered, method attached to it will execute otherwise it will just sit there and do nothing.

### What are actions?
Actions in simpler term are just classes with a mandatory variable "type". When a new action is dispatched, effects and reducers act on it. In our application we will dispatch actions to retrieve user which in turn will call other actions for either success or failure.

### What are effects?
Effects are a way to communicate with the api's outside of application. These are to manage side effects. In our example we will use effects to make a call to github and retrieve user profile.

### What are reducers?
Reducers are dumb classes in my opinion. They take the data passed by actions and effects and modify state object. In our example, reducer will update the state object with profile data.

### What are models?
Angular 6 uses typescript. We use models in our application to implement type checking.

### What are services?
Services are the file that will contain actual logic to make call to external api's and handle error responses.

### How to build a reactive application?
This is something that I have seen no one explain in their tutorials and I learned it with experience. When you are building a reactive application, you don't need to worry about what your view would look like. In my example, view was the last thing that I built. You only need to concern yourself with the functional requirement and build actions, effects and reducers. View can come later. Infact, there can be two separate teams building functional code and other consuming them in their components. Since views use observables to consume data, they are completely decoupled with the functional code.

### Flow Diagram
![Flow Diagram](https://user-images.githubusercontent.com/13856451/42004666-b9335ff2-7a25-11e8-9fa6-17d21d3e3f2c.png)

*This flow diagram has more components then I have created in the application so far. These components will follow in future tutorials.*

## Code
