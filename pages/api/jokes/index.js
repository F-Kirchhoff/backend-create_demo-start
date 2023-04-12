import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const jokes = await Joke.find();
    return response.status(200).json(jokes);
  }

  if (request.method === "POST") {
    const jokeData = request.body; // expects to be { joke: "asdlfjsadf" }
    await Joke.create(jokeData);
    response.status(200).json({ status: "Joke created!" });
  }
}

// Joke.create();
// Joke.find();
// Joke.findByIdAndUpdate();
// Joke.findByIdAndDelete();
