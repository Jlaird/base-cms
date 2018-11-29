const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  user(input: UserQueryInput!): User @findOne(model: "platform.User", using: { id: "_id" })
}

type User {
  id: ObjectID! @value(localField: "_id")
  email: String
  firstName: String
  lastName: String
  username: String
}

input UserQueryInput {
  id: ObjectID!
}

`;