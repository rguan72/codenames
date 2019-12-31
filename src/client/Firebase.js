import * as firebase from 'firebase';
import * as firebaseConfig from './firebase-config.json';

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig.default)
  : firebase.app();
