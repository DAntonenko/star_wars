Frontend for The Star Wars API (https://swapi.dev).

Since the amount of information on the API is small, for better user experience we load it all into local Redux store and take it from there for all further actions. Therefore, the pagination of the list is local. Fast, convenient, no need to pull the server with every user action and force the user to watch the loader.

List of characters and their home planets in the form of a table.

Ability to filter characters by home planets.

Autocomplete to search for a character by name.

Card with more detailed information about the character. Now the basic information, homeworld and species are shown. There is no problem to show information about ships and vehicles - this is a routine task that I did not do, because it is there just the same as in the made parts.

The reload button is not needed now for anything other than design ㋡ Initially, it was conceived to reload information from the server after local editing. But this routine task has not yet been given. I didn’t remove the button yet either, because I like it.

`yarn start` for local build and run

`yarn build` for build, all of a sudden