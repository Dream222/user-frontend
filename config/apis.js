const env = process.env.NODE_ENV || 'development';

const apis_by_environment = {
  development : {
    playven : 'http://localhost:3030/api',
    assets : 'http://localhost:3030',
    social_signin: {
      facebook: 'http://localhost:3030/auth/facebook'
    }
  },
  test : {
    playven : 'http://localhost:3030/api'
  },
  production : {
    playven : 'https://rc.playven.com/api',
    assets : 'https://rc.playven.com',
    social_signin: {
      facebook: 'https://rc.playven.com/auth/facebook'
    }
  }
}

module.exports = apis_by_environment[env];
