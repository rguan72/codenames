import * as firebase from "firebase/app";
import "firebase/firestore";
import * as firebaseConfig from "./firebase-config-2.json";

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig.default)
  : firebase.app();
