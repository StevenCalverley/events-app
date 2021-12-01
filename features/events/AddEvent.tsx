import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addEvent, updateEvent, selectEventById } from "./eventsSlice";
import { Event } from "../../services/eventApi";

interface IFormInputs {
  title: string;
  description: string;
  date: string;
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().required(),
    date: yup.string().required(),
  })
  .required();

const AddEvent = ({ eventId }: { eventId?: string }) => {
  const dispatch = useAppDispatch();

  const event = useAppSelector((state) =>
    selectEventById(state, eventId as string)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {
    if (event) {
      const payload: Partial<Event> & { id: string } = {
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        id: event.id,
      };
      dispatch(updateEvent(payload));
    } else {
      dispatch(addEvent(data));
      reset();
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="title">
        <FormLabel>Title</FormLabel>
        <Input {...register("title", { value: event?.title })} />
      </FormControl>

      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Input {...register("description", { value: event?.description })} />
      </FormControl>

      <FormControl id="date">
        <FormLabel>Date</FormLabel>
        <Input {...register("date", { value: event?.date })} />
      </FormControl>

      <Button type="submit" mt={8}>
        {event ? "Update Event" : "Add Events"}
      </Button>
    </Box>
  );
};

export default AddEvent;
