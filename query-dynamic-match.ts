import { Stash } from "@cipherstash/stashjs"
import { movieSchema } from "./example-schema";
import { displayResults } from "./query-helper";

async function queryCollection() {
  try {
    const stash = await Stash.connect()
    const movies = await stash.loadCollection(movieSchema)

    let queryResult = await movies.query(
      movie => movie.allTextDynamicMatch.match("life"),
      { limit: 10 }
    )
    displayResults(queryResult, "Match: 'life'")

  } catch (err) {
    console.error(err)
    console.error(`Could not query collection! Reason: ${JSON.stringify(err)}`)
  }
}

queryCollection()
