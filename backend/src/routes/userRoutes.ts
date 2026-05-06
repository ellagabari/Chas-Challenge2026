// The Route file just maps the URL to the function in the controller.

import { Router } from 'express';
import { getUser, getMe } from '../controllers/userController.js';

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
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID (temporary until JWT middleware is implemented)
 *     responses:
 *       200:
 *         description: User profile returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 points:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: No id provided
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/me', getMe);

export default router;
