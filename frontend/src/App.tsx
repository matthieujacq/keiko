import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Root } from "./components/Root"

import { Home } from "./pages/Home"
import { Pokemon } from "pages/Pokemon"

export const App = () => {
  return (
    <Root>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Root>
  )
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pokedex/1" />} />
      <Route path="/pokedex/:page" element={<Home />} />
      <Route path="/pokemon/:id" element={<Pokemon />} />
    </Routes>
  )
}
