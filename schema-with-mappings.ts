import {
  CollectionSchema,
  downcase,
  ngram,
  standard,
  Stash,
  StashRecord,
} from "@cipherstash/stashjs"

interface Player extends StashRecord {
  name: string
  team: string
}

async function useSchemaWithMappings() {
  try {
    const stash = await Stash.connect()

    const playerSchema = CollectionSchema.define<Player>("players").indexedWith(
      mapping => ({
        name: mapping.Match(["name"], {
          tokenFilters: [downcase, ngram({ tokenLength: 3 })],
          tokenizer: standard,
        }),
        team: mapping.Exact("team"),
      })
    )

    const players = await stash.createCollection(playerSchema)

    await players.put({
      name: "Wally Lewis",
      team: "Broncos",
    })

    await players.put({
      name: "Darren Lockyer",
      team: "Broncos",
    })

    await players.put({
      name: "Johnathan Thurston",
      team: "Cowboys",
    })

    const { documents } = await players.query(players =>
      players.team.eq("Broncos")
    )

    console.log(`Found ${documents.length} players.`)

    await stash.deleteCollection("players")
  } catch (error) {
    console.error(error)
  }
}

useSchemaWithMappings()
