// EXAMPLE ONLY! THIS FILE IS USUALLY NOT PART OF GIT TRACKING
// .gitignore skips this at the project level, but it is added for example here

export const firebase = {
  apiKey: 'AIzaSyAz5HkV4suTR49_1Cj40bQYd9Jgiv634qQ',
  authDomain: 'transmute-framework.firebaseapp.com',
  databaseURL: 'https://transmute-framework.firebaseio.com',
  projectId: 'transmute-framework',
  storageBucket: 'transmute-framework.appspot.com',
  messagingSenderId: '191884578641'
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export const env = 'development'

export default { firebase, reduxFirebase, env }
