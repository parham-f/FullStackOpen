import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloLink, split } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { HttpLink } from "@apollo/client/link/http"
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from "@apollo/client/utilities"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import App from "./App"

const HTTP_URI = "http://localhost:4000/"
const WS_URI = "ws://localhost:4000/"

const getToken = () => localStorage.getItem("library-user-token")

const httpLink = new HttpLink({
  uri: HTTP_URI,
  headers: {
    authorization: getToken() ? `Bearer ${getToken()}` : "",
  },
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URI,
    connectionParams: () => ({
      authorization: getToken() ? `Bearer ${getToken()}` : "",
    }),
  })
)

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
