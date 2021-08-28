import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      author: {
        id: {
          type: ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      msg: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    id: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  image: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model('Posts', postSchema);

export default Post;
