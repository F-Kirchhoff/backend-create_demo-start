import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  const { status } = await response.json();
  console.log(status);
}

export default function JokeForm() {
  const { trigger } = useSWRMutation("/api/jokes", sendRequest);

  function handleSubmit(event) {
    event.preventDefault();

    // const joke = event.target.joke.value;

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    trigger(jokeData);
    // 1. trigger sendRequest, pass jokeData as { arg } to it
    // 2. update all useSWR hooks that subscribed to '/api/jokes/'
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke-input">Enter a new joke</label>
      <input type="text" id="joke-input" name="joke" />
      <button type="submit">Submit</button>
    </form>
  );
}
