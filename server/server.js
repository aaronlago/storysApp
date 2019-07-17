// add modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// add graphql modules
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-server-express')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

// config environment
dotenv.config()

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))
 

const schema =  makeExecutableSchema({typeDefs, resolvers})

const app = express()

const PORT = process.env.PORT || 500
// allow cliente connect to server
app.use(cors())

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
}))

app.use('/graphql', graphiqlExpress({
    endpointURL:'/graphql'
}))
// run server
app.listen(PORT,
    () => console.log(`Server is running on port ${PORT}`))
