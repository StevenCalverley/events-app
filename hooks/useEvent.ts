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
  constraints?: QueryConstraint[]
): UseQueryResult<IEvent[]> {
  const collection = collections.events;
  let ref: Query<IEvent> | NamedQuery<IEvent>;

  if (constraints) {
    ref = query(collection, ...constraints);
  } else {
    ref = query(collection);
  }

  return useFirestoreQueryData<IEvent>(
    key,
    ref,
    {
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );
}
