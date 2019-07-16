// add modules
const express = require('express')
const bodyParser = require('body-parser')
// add graphql modules
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-server-express')


const typeDefs = `
    type Query {
        Hello: Sting
    }
`

const resolvers = {
    Query: {
        hello: () => 'Hello World'
    }
}

const schema =  makeExecutableSchema({typeDefs, resolvers})

const app = express()

const PORT = process.env.PORT || 500
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
}))

app.use('/graphql', graphiqlExpress({
    endpointURL:'/graphql'
}))
// run server
app.listen(PORT,
    () => console.log(`Server is running on port ${PORT}`))
