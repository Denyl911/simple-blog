import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Post from '../models/post.js';

const key = process.env.SECRET;

export const createUser = async (req, res) => {
  try {
    let { body } = req;
    const hash = await bcrypt.hash(body.password, 10);
    body.password = hash;
    let newUser = new User(body);
    await newUser.save();
    newUser.token = await jwt.sign(
      {
        id: newUser._id,
      },
      key,
      {
        expiresIn: '10d',
      }
    );
    res.status(200).json(newUser)
  } catch (e) {
    res.status(500).json({ message: 'Error: ' + e })
  }
};

export const getUsers = async (req, res) => {
  try {
    const data = await User.find({}, { password: 0 });
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ message: 'Error:' + e })
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user)
  } catch (e) {
    res.status(500).json({ message: 'Error:' + e })
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.user.id;
    await User.findByIdAndUpdate(id, req.body);
    if (req.body.name) {
      await Post.updateMany(
        {
          'user.id': id,
        },
        {
          user: {
            id: id,
            name: req.body.name,
          },
        }
      );
      await Post.updateMany(
        {
          'comments.author.id': id,
        },
        {
          $set: {
            'comments.$[].author.name': req.body.name,
          },
        }
      );
    }
    res.status(200).json({ message: 'Updated succesfuly' })
  } catch (e) {
    res.json.status(500)({ message: 'Error:' + e });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.user.id;
    await User.findByIdAndDelete(id);
    await Post.deleteMany({ 'user.id': id });
    res.status(200).json({ message: 'Deleted succesfuly' })
  } catch (e) {
    res.status(500).json({ message: 'Error:' + e });
  }
};

export const me = async (req,res) => {
    const id = req.user.id
    const user = await User.findById(id)
    res.status(200).json(user)
}
