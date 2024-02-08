import { Route, Routes as Router } from "react-router-dom"
import { Home } from "../pages/home.tsx"
import { Notes } from "../pages/notes.tsx"

function Routes() {
  return (
    <Router>
      <Route path={"/notes"} element={<Home />} />
      <Route path={"/"} element={<Notes />} />
    </Router>
  )
}

export default Routes
