import { render, screen } from "@testing-library/react"
import { Home } from "./Home"

import { rest } from "msw"
import { setupServer } from "msw/node"

const server = setupServer(
  rest.get("http://localhost:8000/pokemons", (req, res, ctx) => {
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
    return res(
      ctx.json([
        { id: 1, name: "bulbasaur", height: 7, weight: 69 },
        { id: 2, name: "ivysaur", height: 10, weight: 130 },
      ]),
    )
  }),
)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("<Home />", () => {
  it("should display bulbasaur", async () => {
    render(<Home />)
    // NOTE: screen.getByText would not wait for the API call to be resolved
    // hence the element would not be found in the DOM
    // we use screen.findByText instead
    const bulbasaur = await screen.findByText("Name: bulbasaur")
    expect(bulbasaur).toBeInTheDocument()
  })
})
