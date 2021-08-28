import Post from '../models/post.js';
import User from '../models/user.js';

export const createPost = async (req, res) => {
  try {
    const { body } = req;
    const id = req.user.id;
    const newPost = new Post(body);
    await newPost.save();
    await User.findByIdAndUpdate(id, {
      $push: {
        posts: {
          id: newPost._id,
          title: body.title,
          description: body.description,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (e) {
    res.status(500).json({ message: 'Error: ' + e })
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: 'Error: ' + e })
  }
};

export const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: 'Error: ' + e })
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.findByIdAndUpdate(id, req.body);
    if (req.body.title && req.body.description) {
      await User.findOneAndUpdate(
        {
          'posts.id': id,
        },
        {
          $set: {
            'posts.$.title': req.body.title,
            'posts.$.description': req.body.description,
          },
        }
      );
    }
    if (req.body.title && !req.body.description) {
      await User.findOneAndUpdate(
        {
          'posts.id': id,
        },
        {
          $set: {
            'posts.$.title': req.body.title,
          },
        }
      );
    }
    if (!req.body.title && req.body.description) {
      await User.findOneAndUpdate(
        {
          'posts.id': id,
        },
        {
          $set: {
            'posts.$.description': req.body.description,
          },
        }
      );
    }
    res.status(200).json({ message: 'Updated succesfuly' });
  } catch (e) {
    res.status(500).json({ message: 'Error:' + e })
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          posts: {
            id: id,
          },
        },
      }
    );
    res.status(200).json({ message: 'Deleted succesfuly' });
  } catch (e) {
    res.status(500).json({ message: 'Error:' + e })
  }
};

export const addComment = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.findByIdAndUpdate(id, {
      $push: { comments: req.body },
    });
    res.status(200).json({ message: 'Comment added' });
  } catch (e) {
    res.status(500).json({ message: 'Error:' + e })
  }
};

export const deleteComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const id = req.params.id;
    await Post.findByIdAndUpdate(postId, { $pull: { comments: { _id: id } } });
    res.status(200).json({ message: 'Deleted succesfuly' });
  } catch (e) {
    res.status(500).json({ message: 'Error:' + e });
  }
};
