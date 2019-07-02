// resolvers file used to create importable functions. provides query.me method which will return
// the user from db

// throw err if no current user, return current user from ctx


const { AuthenticationError } = require('apollo-server');

const user = {
  _id: "1",
  name: "Brian",
  email: "email@email.com",
  picture: "https://cloudinary.com/asdf"
}

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in')
  }

  return next(root, args, ctx, info)
}

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser)
  }
}
