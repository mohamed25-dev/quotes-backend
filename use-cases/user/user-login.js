const makeUserLogin = function ( dataAccess, compare, generateAuthToken, AppExceptions) {
  return async function userLogin (username, password) {
    const user = await dataAccess.findByUsername(username);
    
    if (!user) {
      throw new Error('Wrong username or password');
    }

    const result = await compare(password, user.password);
    if (!result) {
      throw new AppExceptions.UnauthorizedException('Wrong username or password');
    }

    let token = await generateAuthToken(user);

    return {user, token};
  }
}

module.exports = makeUserLogin;
