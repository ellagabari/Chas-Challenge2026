// The Route file just maps the URL to the function in the controller.

import { Router } from 'express';
import { getUser, getMe, getLeaderboard } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a user by id or email
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: User email
 *     responses:
 *       200:
 *         description: User found
 *       400:
 *         description: Provide id or email
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/', getUser);


/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get the currently authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 points:
 *                   type: integer
 *                 badges:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized - no or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/me', authMiddleware, getMe);

/**
 * @swagger
 * /api/users/leaderboard:
 *   get:
 *     summary: Get the leaderboard
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           enum: [10, 20]
 *         required: false
 *         description: Number of users to return (defaults to 10)
 *     responses:
 *       200:
 *         description: Leaderboard found
 *       500:
 *         description: Internal server error
 */
router.get('/leaderboard', getLeaderboard);


export default router;
