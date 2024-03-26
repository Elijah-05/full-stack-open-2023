import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdote, voteAnecdote } from "./axios_request/request";

const App = () => {
  const queryClient = useQueryClient();
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (res) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const updatedData = anecdotes.map((anecdote) =>
        anecdote.id === res.id ? res : anecdote
      );
      queryClient.setQueryData(["anecdotes"], updatedData);
    },
  });

  const { isLoading, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdote,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>anecdote service is unavailable due to problems in server</div>;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
