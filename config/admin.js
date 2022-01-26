module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'cb1b40a5ba1aee27b32fe579fc2d3fb2'),
  },
});
