import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import {
  addEvent as apiAddEvent,
  updateEventById as apiUpdateEventById,
  deleteEventById as apiDeleteEventById,
  getEvents,
  subscribeToEvents,
  unsubscribeToEvents,
} from "../../services/eventApi";

import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

// Types
import { IEvent } from "../../types/firestore/Event";
import { RootState } from "../../store/index";

type EventState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const eventsAdapter = createEntityAdapter<IEvent>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = eventsAdapter.getInitialState<EventState>({
  status: "idle",
  error: null,
});

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const events = await getEvents();
  return events || [];
});

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (data: Partial<IEvent>) => {
    const event = await apiAddEvent(data);
    return event;
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (data: Partial<Event> & { id: string }) => {
    const event = await apiUpdateEventById(data);
    return event;
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id: string) => {
    await apiDeleteEventById(id);
  }
);

export const subscribe = createAsyncThunk("events/subscribe", (_, thunkAPI) => {
  console.log("Subscribing to Events...");
  const { dispatch } = thunkAPI;

  subscribeToEvents((change) => {
    const event = change.doc.data();
    dispatch(
      syncEvent({
        type: change.type,
        event: event,
      })
    );
  });
});

export const unsubscribe = createAsyncThunk("events/unsubscribe", () => {
  console.log("Unsubscribing to Events...");
  unsubscribeToEvents();
});

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    syncEvent(state, action) {
      if (action.payload.type === "added") {
        eventsAdapter.upsertOne(state, action.payload.event);
      }

      if (action.payload.type === "modified") {
        eventsAdapter.upsertOne(state, action.payload.event);
      }

      if (action.payload.type === "removed") {
        eventsAdapter.removeOne(state, action.payload.event.id);
        toast({
          title: "Event Deleted",
          description: `Event Delete: ${action.payload.event.title}`,
          position: "top-right",
          status: "error",
        });
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        eventsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const { syncEvent } = eventSlice.actions;
export default eventSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllEvents,
  selectById: selectEventById,
  selectIds: selectEventIds,
  selectTotal: selectEventTotals,
  // Pass in a selector that returns the posts slice of state
} = eventsAdapter.getSelectors<RootState>((state) => state.events);
