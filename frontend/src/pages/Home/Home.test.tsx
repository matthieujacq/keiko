import { render, screen } from "@testing-library/react"
import { Home } from "./Home"

import { rest } from "msw"
import { setupServer } from "msw/node"
import { BrowserRouter, MemoryRouter } from "react-router-dom"
import { App, AppRoutes } from "App"

const server = setupServer(
  rest.get("http://localhost:8000/pokemons", (req, res, ctx) => {
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
    if (req.url.searchParams.get("page") === "0") {
      return res(
        ctx.json([
          { id: 1, name: "bulbasaur", height: 7, weight: 69 },
          { id: 2, name: "ivysaur", height: 10, weight: 130 },
        ]),
      )
    } else if (req.url.searchParams.get("page") === "1") {
      return res(
        ctx.json([
          { id: 16, name: "pidgey", height: 18, weight: 3 },
          { id: 17, name: "pidgeotto", height: 11, weight: 300 },
        ]),
      )
    }
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
    render(
      <MemoryRouter initialEntries={["/pokedex/1"]}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const bulbasaur = await screen.findByText("bulbasaur")
    expect(bulbasaur).toBeInTheDocument()
  })
  it("should not display pidgey", async () => {
    render(
      <MemoryRouter initialEntries={["/pokedex/1"]}>
        <AppRoutes />
      </MemoryRouter>,
    )
    // Hacky way to check if pidgey is not in the document
    // QUESTION: Is there a better way to do this?
    let pidgey = undefined
    try {
      pidgey = await screen.findByText("pidgey")
    } catch (_) {
    } finally {
      expect(pidgey).toBeUndefined()
    }
  })
  it("should display pidgey", async () => {
    render(
      <MemoryRouter initialEntries={["/pokedex/2"]}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const pidgey = await screen.findByText("pidgey")
    expect(pidgey).toBeInTheDocument()
  })
})
