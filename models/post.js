const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  subject: String,
  // body: String,
  body: { type: Schema.Types.Object},
  star: { type: Schema.Types.ObjectId, ref: 'Star' },
  loginname: { type :Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Post', PostSchema);