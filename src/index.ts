import { ApolloServer } from 'apollo-server'
import { schema } from './schema'

const server = new ApolloServer({
	schema,
})

server.listen(3000).then(() => {
	console.log(`
		Server started on http://localhost:3000/graphql
	`)
})
