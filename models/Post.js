const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
    },
  ],
  dislikes: [
    {
      user: {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
