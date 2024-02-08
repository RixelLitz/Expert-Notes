import { Route, Routes as Router } from "react-router-dom"
import { Home } from "../pages/home.tsx"
import { Notes } from "../pages/notes.tsx"

function Routes() {
  return (
    <Router>
      <Route path={"/"} element={<Home />} />
      <Route path={"/notes"} element={<Notes />} />
    </Router>
  )
}

export default Routes
