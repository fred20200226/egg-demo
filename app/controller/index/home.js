'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let {userName, password} = ctx.request.body;
    //账号密码验证加密那些这里先不处理，直接保存
    if (userName && password) {

      let saveRes = null;
      const res = await ctx.model.User.User.find({userName, password});
      if (res && res.length) {
        ctx.session.userInfo = res[0];
      } else {
        let userTmep = new ctx.model.User.User({
            userName,
            password
        });
        ctx.session.userInfo = saveRes = await userTmep.save();
      }


      // let note = new ctx.model.Note.Note({
      //   noteId: ctx.session.userInfo._id,
      //   content: "note content1",
      //   author: "zhang1"
      // });
      // note.save();
      // const _id = ctx.session.userInfo._id || 0;
      // let result = await ctx.model.Note.note.find({_id});
      // if (result && result.length) {

      // }


      ctx.body = {
        code: 0,
        msg: '登录成功',
        data: {
          // queryData: ctx.query || {},
          userInfo: ctx.session.userInfo,
          saveRes: saveRes || {}
          // noteLists: result || []
        }
      }
      ctx.status = 200;
      return;
    } 
    ctx.body = {
      code: 1,
      msg: 'fail',
      data: null
    }
    ctx.status = 201;
  }
}
module.exports = HomeController;
