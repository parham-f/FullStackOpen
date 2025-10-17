import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { HttpLink } from "@apollo/client/link/http"
import { setContext } from "@apollo/client/link/context"
import App from "./App"

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("library-user-token")

  operation.setContext({
    headers: {
      ...operation.getContext().headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
