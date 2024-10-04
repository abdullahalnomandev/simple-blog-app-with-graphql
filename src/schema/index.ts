export const typeDefs = `#graphql

type Query {
  posts: [Post]
  me: User
  users: [User]
}

type Mutation {
 signup( name: String!, email: String!, password: String!, bio:String) : AuthPayload,
 signIn(email: String!, password:String!):AuthPayload,
 addPost (title: String!, content: String!) : PostPayload
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User
  published: Boolean
  createdAt: String!
}

type User {
  id: ID!
  name: String!
  email: String!
  createdAt: String!
  posts: [Post]
}

type Profile {
 id: ID!
 user: User!
 bio: String
}

type AuthPayload {
  userError: String
  token: String
}
 
type PostPayload {
  post: Post
  usererror: String
}
`;