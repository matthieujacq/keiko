import { render, screen } from "@testing-library/react"
import { Home } from "./Home"

describe("<Home />", () => {
  it("should display Carapuce", () => {
    render(<Home />)
    const carapuce = screen.getByText("Name: Carapuce")
    expect(carapuce).toBeInTheDocument()
  })
})
