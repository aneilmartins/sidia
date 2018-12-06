import User from '../../models/User';
import FavoriteTweet from '../../models/FavoriteTweet';
import FollowingUser from '../../models/FollowingUser';
import { requireAuth } from '../../services/auth';

export default {
  signup: async (_, { fullName, username, email, ...rest }) => {
    try {

      const userEmailCheck = await User.findOne({ email });
      if (userEmailCheck) {
        throw new Error('Email already exist!');
      }
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck) {
        throw new Error('Username already exist!');
      }

      const [firstName, ...lastName] = fullName.split(' ');
      const user = await User.create({ firstName, lastName, username, email, ...rest });
      await FavoriteTweet.create({ userId: user._id });
      await FollowingUser.create({ userId: user._id });

      return {
        token: user.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },

  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not exist!');
      }

      if (!user.authenticateUser(password)) {
        throw new Error('Password not match!');
      }

      return {
        token: user.createToken()
      };
    } catch (error) {
      throw error;
    }
  },

  me: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);

      return me;
    } catch (error) {
      throw error;
    }
  },

  getUser: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      console .log('get user ' + _id);
      return User.findById(_id);
    } catch (error) {
      throw error;
    }
  },
};
