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

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token")
  return {
    headers: token ? { ...headers, authorization: `Bearer ${token}` } : headers,
  }
})

const httpLink = new HttpLink({ uri: HTTP_URI })

const wsClient = createClient({
  url: "ws://localhost:4000/",
  connectionParams: () => {
    const t = localStorage.getItem("library-user-token")
    return { authorization: t ? `Bearer ${t}` : "" }
  },
  on: {
    connected: () => console.log("🔌 WS connected"),
    closed: (e) => console.log("🔌 WS closed", e),
    error: (e) => console.error("🔌 WS error", e),
  },
})

const wsLink = new GraphQLWsLink(wsClient)

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const cache = new InMemoryCache({
  typePolicies: {
    Book: { keyFields: ["id"] },
    Query: {
      fields: {
        allBooks: {
          keyArgs: ["genre"],
          merge(existing = [], incoming, { readField }) {
            const map = new Map()
            for (const b of existing) map.set(readField("id", b), b)
            for (const b of incoming) map.set(readField("id", b), b)
            return Array.from(map.values())
          },
        },
      },
    },
  },
})

const client = new ApolloClient({ link, cache })

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
