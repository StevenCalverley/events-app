import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

import { eventsConverter } from "./converters";

const firebaseConfig = {
  apiKey: "AIzaSyCrlocrMFuyyljTQHKM88ZSzcGNbiB1C_s",
  authDomain: "s7even-firestore-dev.firebaseapp.com",
  projectId: "s7even-firestore-dev",
  storageBucket: "s7even-firestore-dev.appspot.com",
  messagingSenderId: "330857016595",
  appId: "1:330857016595:web:d7ee40c70541f064b93ee6",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore();
export default app;

export const collections = {
  events: collection(firestore, "events").withConverter(eventsConverter),
};
