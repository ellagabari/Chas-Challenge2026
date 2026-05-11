// The Route file just maps the URL to the function in the controller.

import { Router } from 'express';
import { getUser } from '../controllers/userController.js';
import { getLeaderboard } from '../controllers/userController.js';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by id, userId, or email
 *     description: Returns the user without the password hash. Provide exactly one lookup — `id`, `userId`, or `email`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: User ID (same as userId)
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Alternative query name for user ID
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: User email
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPublic'
 *       400:
 *         description: Missing query — provide id, userId, or email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
router.get('/', getUser);

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
