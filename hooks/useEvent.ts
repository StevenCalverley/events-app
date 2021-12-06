import {
  namedQuery,
  useFirestoreQueryData,
  NamedQuery,
} from "@react-query-firebase/firestore";
import { query, QueryConstraint, Query } from "firebase/firestore";
import { QueryKey, UseQueryResult } from "react-query";
import { collections, firestore } from "../lib/firebase";
import { IEvent } from "../types/firestore/Event";

function isQueryConstraints(value: unknown): value is QueryConstraint[] {
  return Array.isArray(value);
}

export function useEvents(
  key: QueryKey,
  constraintsOrNamedQuery?: QueryConstraint[] | string
): UseQueryResult<IEvent[]> {
  const collection = collections.events;
  let ref: Query<IEvent> | NamedQuery<IEvent>;

  if (constraintsOrNamedQuery) {
    if (isQueryConstraints(constraintsOrNamedQuery)) {
      ref = query(collection, ...constraintsOrNamedQuery);
    } else {
      ref = namedQuery(firestore, constraintsOrNamedQuery);
    }
  } else {
    ref = query(collection);
  }

  return useFirestoreQueryData<IEvent>(key, ref, {
    subscribe: true,
  });
}
