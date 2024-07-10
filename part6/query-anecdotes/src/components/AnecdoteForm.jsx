import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../axios_request/request";
import { useContext } from "react";
import NotificationContext from "../context";

const AnecdoteForm = () => {
  const { createAnecdoteNotification } = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (res) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, res]);
      createAnecdoteNotification(`New Anecdote note is created`);
    },
    onError: (error) => createAnecdoteNotification(error.response.data.error),
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
