//handling auth verification - id valid?
// check email against database 

const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');


const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
  //verify auth token
  const googleUser = await verifyAuthToken(token);

  //check if user exists
  const user = await checkIfUserExists(googleUser.email);

  // if user exists return them; otherwise create new user in db
  return user ? user : createNewUser(googleUser)

}

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    })
    return ticket.getPayload();
  } catch (e) {
    console.error("Error verifying Auth Token", e);
  }
}

const checkIfUserExists = async email => await User.findOne({ email }).exec()

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };
  return new User(user).save()
}
