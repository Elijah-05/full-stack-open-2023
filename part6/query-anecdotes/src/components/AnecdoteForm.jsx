import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../axios_request/request";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (res) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, res]);
    },
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
