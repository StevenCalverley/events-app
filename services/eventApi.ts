import {
  collection,
  query,
  where,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  QueryDocumentSnapshot,
  Unsubscribe,
  DocumentData,
  DocumentChange,
  WithFieldValue,
} from "firebase/firestore";

import { firestore as db } from "../lib/firebase";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

const converter = {
  toFirestore: (data: WithFieldValue<Event>): DocumentData => {
    return {
      ...data,
      isDeleted: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const event = snap.data();
    const formattedEvent = {
      id: snap.id,
      ...event,
      createdAt: event.createdAt?.toDate().toISOString(),
      updatedAt: event.updatedAt?.toDate().toISOString(),
    };

    return formattedEvent as Event;
  },
};

// Firestore Refs
const eventsRef = collection(db, "events").withConverter(converter);

export const addEvent = async (event: Partial<Event>) => {
  try {
    const docRef = await addDoc(eventsRef, event);

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getEvents = async () => {
  try {
    let events: Event[] = [];

    const getEventsQuery = query(eventsRef, where("isDeleted", "==", false));
    const querySnapshot = await getDocs(getEventsQuery);
    querySnapshot.forEach((doc) => {
      const event = doc.data();

      events.push(event);
    });

    return events;
  } catch (e) {
    console.error("Error fetching events ", e);
  }
};

export const getEventById = async (id: string) => {
  try {
    const docRef = doc(db, "events", id).withConverter(converter);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("No Doc");

    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  } catch (e) {
    console.error("Error fetching events ", e);
  }
};

export const updateEventById = async (
  event: Partial<Event> & { id: string }
) => {
  try {
    const docRef = doc(db, "events", event.id).withConverter(converter);
    const docSnap = await updateDoc(docRef, {
      title: event.title,
      description: event.description,
      date: event.date,
      updatedAt: serverTimestamp(),
    });
    return;
  } catch (e) {
    console.error("Error updating events ", e);
  }
};

export const deleteEventById = async (eventId: string) => {
  try {
    const docRef = doc(db, "events", eventId);
    const docSnap = await updateDoc(docRef, {
      isDeleted: true,
      updatedAt: serverTimestamp(),
    });
    return;
  } catch (e) {
    console.error("Error updating events ", e);
  }
};

let unsubscribe: Unsubscribe | undefined;

export const subscribeToEvents = (
  callBackFn: (
    change: DocumentChange<Event>,
    index: number,
    array: DocumentChange<Event>[]
  ) => void
): void => {
  try {
    const getEventsQuery = query(eventsRef, where("isDeleted", "==", false));

    unsubscribe = onSnapshot(getEventsQuery, (querySnapshot) => {
      querySnapshot.docChanges().forEach(callBackFn);
    });
  } catch (e) {
    console.error("Error fetching events ", e);
  }
};

export const unsubscribeToEvents = () => {
  if (unsubscribe) {
    unsubscribe();
  }
};
