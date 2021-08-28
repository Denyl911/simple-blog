import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const key = process.env.SECRET;

export const login = async (req, res) => {
  try {
    const { body } = req;
    const user = await User.findOne({ email: body.email });
    if (user) {
      let valid = await bcrypt.compare(body.password, user.password);
      if (valid) {
        let data = {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avar,
          posts: user.posts,
          token: jwt.sign(
            {
              id: user._id,
            },
            key,
            {
              expiresIn: '10d',
            }
          ),
        };
        res.status(200).json(data);
      } else {
        res.status(403).json({ message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ message: 'Invalid email' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error: ' + e });
  }
};

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers['x-auth-token'];
    if (token) {
      const decoded = jwt.verify(token, key);
      req.user = decoded;
      next();
    } else {
      res.status(400).json({ message: 'Token no exist' });
    }
  } catch (e) {
    res.status(403).json({ message: 'Error: ' + e });
  }
};
