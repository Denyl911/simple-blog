import { Router } from 'express';
import { authMiddleware, login } from '../controllers/auth.js';
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from '../controllers/posts.controllers.js';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  me,
  updateUser,
} from '../controllers/users.controllers.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ msg: 'hola' }).status(200);
});

//Login
router.post('/login', login);

// Users
router.get('/users/me', authMiddleware, me);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/', authMiddleware, updateUser);
router.delete('/users/', authMiddleware, deleteUser);

// Posts
router.get('/posts', getPosts);
router.get('/posts:id', getPostById);
router.post('/posts/', authMiddleware, createPost);
router.put('/posts/:id', authMiddleware, updatePost);
router.delete('/posts/:id/', authMiddleware, deletePost);

// Comments
router.post('/comments/:id', authMiddleware, addComment);
router.delete('/comments/:postId/:id', authMiddleware, deleteComment);

export default router;
