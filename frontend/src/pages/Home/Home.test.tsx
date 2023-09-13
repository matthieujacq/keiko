import { render, screen } from "@testing-library/react"
import { Home } from "./Home"

describe("<Home />", () => {
  it("should display Carapuce", () => {
    render(<Home />)
    // QUESTION: screen.getByText("Carapuce") as asked in the keiko is not found.
    // Is the error in the keiko or in my code?
    const carapuce = screen.getByText("Name: Carapuce")
    expect(carapuce).toBeInTheDocument()
  })
})
