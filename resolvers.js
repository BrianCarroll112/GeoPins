// resolvers file used to create importable functions. provides query.me method which will return
// the user from db - function to be implemented

const user = {
  _id: "1",
  name: "Brian",
  email: "email@email.com",
  picture: "https://cloudinary.com/asdf"
}

module.exports = {
  Query: {
    me: () => user
  }
}
