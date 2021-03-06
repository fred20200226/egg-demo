'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.index.home.index);
  router.resources('note', '/note', controller.note.note);
};
