export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
  },
  rolesToPermissionLevel: {
    user: 1,
    admin: 2,
  },
};
