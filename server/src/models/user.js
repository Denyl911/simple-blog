import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'defaultImage',
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      id: {
        type: ObjectId,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

export default User;
