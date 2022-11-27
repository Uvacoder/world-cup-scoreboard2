# World Cup Score Board

## Project Description

This project is about demonstrating a live scoreboard solution.  
After you start the server and navigate to http://127.0.0.1:3000, you will see two main columns. On the left column is the scoreboard and on the right is the operations form. On the bottom of each column there is some debug information, bellow scoreboard the current state of the scoreboard object, and below operations form is the current fixture you are creating through the operations form.

## Usage

-   Create fixture.  
    Fill all the form fields and press **Create** to add a fixture to the scoreboard. If you add a fixture with an existing Fixture ID, the fixture will be replaced.

*   Update fixture.  
    Fill the Fixture ID you want to edit, and the rest of the fields and press **Update** to update the existing object (i could skip updating fields with empty values but i think it would be out of scope for purpose of this demonstration)

*   Delete fixture.  
    Just fill the Fixture ID and press **Delete**, all the other fields are irrelevant

## Requirements

-   Display a scoreboard.
-   Add a new fixture to the scoreboard.
-   Remove a fixture from the scoreboard.
-   Edit fixture score.
-   Sort fixtures by total score.
-   Fixtures with the same total score, sorted by recently started.

## Technology Stack Used

-   nuxt (project framework)
-   vue (frontend framework)
-   tailwindcss (frontend UI framework)
-   pinia (state management)
-   vitest (unit testing)

## Technical Description

The project consists of a root vue component `index.vue` and two child components `Scoreboard.vue` and `Operations.vue`. The data are stored in a state management store `scoreboard.js`.  
When `Scoreboard.vue` is loaded it makes a call to `initData` method on store, where it is supposed to make an API call or request initial data from a socket connection, to populate its state.  
On the `Operations.vue` component there is code that creates json-patch object (https://www.rfc-editor.org/rfc/rfc6902, https://jsonpatch.com/) and calls method `patchFixtures` on the store.  
The idea behind this solution is that there would be a publisher that has a cached snapshot of the required data to be sent initially to clients, and whenever instructed to make changes to the data, it will compare and send the patch to the client application.  
The required fixture sorting is done with a state getter that sorts the fixtures with a lodash (https://lodash.com/) method.  
The start_datetime of a fixture is in ISO 8601 format (https://en.wikipedia.org/wiki/ISO_8601).

## Implementation Mistakes

-   Some commits have bug fixes & syntax fixes to other files irrelevant with the commit task.
-   State tests are written at the end, while I believe they should be written as soon as the state was constructed.
-   Missing unit tests for the frontend integrity. I would use pupetter or playright.

## Side Notes

-   It was my first time using nuxt and vue3, i have previous experience with vue2 and vue-cli projects
-   It was my first time using pinia, i have previous experience in vuex which is almost the same.
-   It was my first time using tailwindcss i was previous using various versions of bootstrap.
-   I have zero (0) experience on TDD :-(

## Project Initialization

```bash
npx nuxi init world-cup-scoreboard
```

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Testing

Run all unit tests with code coverage report:

```bash
npm run test
```
