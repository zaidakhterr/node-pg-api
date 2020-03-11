module.exports = app => {
  // app.use('/posts',require('./posts'))
  app.use('/users', require('./users'));
};
