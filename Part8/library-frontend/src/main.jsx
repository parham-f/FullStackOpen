import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { HttpLink } from "@apollo/client/link/http"
import App from "./App"

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
