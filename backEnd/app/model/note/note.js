const d = new Date();
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const Note = new Schema({
    noteId: { type: mongoose.Schema.Types.ObjectId},
    content: {type:String},
    author: {type:String},
    addTime: {type: Number,default: d.getTime()},
    updateTime: {type: Number,default: d.getTime()}
  });
  return mongoose.model('Note', Note, 'note');
};

