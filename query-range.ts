import { Stash } from "@cipherstash/stashjs"
import { movieSchema } from "./example-schema";
import { displayResults } from "./query-helper";

async function queryCollection() {
  try {
    const stash = await Stash.connect()
	const movies = await stash.loadCollection(movieSchema)

	let queryResult = await movies.query(
      movie => movie.year.lte(1920),
      { limit: 5, order: [{byIndex: "year", direction: "ASC"}] }
    )
    displayResults(queryResult, "Range: 1920 or earlier")

  } catch (err) {
    console.error(err)
    console.error(`Could not query collection! Reason: ${JSON.stringify(err)}`)
  }
}

queryCollection()