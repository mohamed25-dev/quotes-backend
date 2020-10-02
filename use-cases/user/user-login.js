const makeUserLogin = function ( dataAccess, compare, generateAuthToken) {
  return async function userLogin (username, password) {
    const user = await dataAccess.findByUsername(username);
    
    if (!user) {
      throw new Error('Wrong username or password 1');
    }

    const result = await compare(password, user.password);
    if (!result) {
      throw new Error('Wrong username or password 2');
    }

    let token = await generateAuthToken(user);

    return {user, token};
  }
}

module.exports = makeUserLogin;
