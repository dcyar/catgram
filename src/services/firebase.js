import firebase from 'firebase';

const config = {
  projectId: 'effchat-5dae8',
  apiKey: 'AIzaSyABaYI60fvB8Be-0SRmmokTg4l7uqcBks8',
  authDomain: 'effchat-5dae8.firebaseapp.com',
  databaseURL: 'https://effchat-5dae8.firebaseio.com',
  storageBucket: 'effchat-5dae8.appspot.com',
  messagingSenderId: '371733157725',
};

firebase.initializeApp(config);

export default {
  database: firebase.database(),
};
