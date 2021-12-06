import { FirestoreDataConverter, serverTimestamp } from "firebase/firestore";
import { IEvent } from "../types/firestore/Event";

export const eventsConverter: FirestoreDataConverter<IEvent> = {
  fromFirestore(snapshot): IEvent {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      date: data.date,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString(),
    };
  },
  toFirestore(event: IEvent) {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },
};
