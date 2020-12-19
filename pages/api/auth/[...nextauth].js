import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Twitch({
      clientId: process.env.TWITCH_ID,
      clientSecret: process.env.TWITCH_SECRET
    })
  ],
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_SECRET
  },
  callbacks: {
    session: async (session, token) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.id = token.id;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      console.log(account);
      if (account) {
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
        token.id = account.id;
      }
      return Promise.resolve(token);
    }
  }
}

export default (req, res) => NextAuth(req, res, options);