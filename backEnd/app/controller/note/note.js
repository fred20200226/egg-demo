'use strict';
const Controller = require('egg').Controller;
class NoteController extends Controller {

  //拉取数据列表
  async index() {
    const { ctx } = this;
    const noteId = ctx.session.userInfo;
    let result = await ctx.model.Note.Note.find({noteId: noteId._id});
    if (result && result.length) {
      ctx.body = {
        code: 0,
        msg: 'success',
        data: result
      }
    } else {
      ctx.body = {
        code: 0,
        msg: 'success',
        data: []
      }
    }
  }

  //创建数据
  async create() {
    const { ctx } = this;
    const {_id, author} = this.ctx.session.userInfo
    let note = new ctx.model.Note.Note({
      noteId: _id,
      content: ctx.request.body.content || "",
      author: author
    });
    await note.save();
    ctx.body = {
      code: 0,
      msg: 'success',
      data: null
    }
  }

  //拉取某条具体的数据内容
  async show() {
    const { ctx } = this;
    let _id = ctx.params.id;
    if (_id) {
      let result = await ctx.model.Note.Note.findOne({_id: _id});
      if (result && result.length) {
        ctx.body = {
          code: 0,
          msg: 'success',
          data: result[0]
        }
      }
    } else {
      ctx.body = {
        data: "show"
      }
    }
  }

  //更新某条数据内容
  async update() {
    const { ctx } = this;
    let _id = ctx.params.id;
    let content = ctx.request.body.content || "";
    if (_id && content) {
      await ctx.model.Note.Note.updateOne({_id}, {content});
      ctx.body = {
        code: 0,
        msg: '操作成功',
        data: null
      }
    }  
  }

  //删除某条数据
  async destroy() {
    const { ctx } = this;
    let _id = ctx.params.id;
    let delRes = await ctx.model.Note.Note.remove({_id});
    if (delRes && delRes.ok) {
      ctx.body = {
        code:0,
        msg: "删除成功",
        data: null
      }
    }  
  }
}
module.exports = NoteController;
