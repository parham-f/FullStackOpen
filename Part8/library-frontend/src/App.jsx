import { Routes, Route } from "react-router-dom"
import Menu from "./components/Menu"
import AuthorsView from "./components/AuthorsView"
import BooksView from "./components/BooksView"

const App = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<AuthorsView />} />
        <Route path="/books" element={<BooksView />} />
      </Routes>
    </div>
  )
}

export default App
