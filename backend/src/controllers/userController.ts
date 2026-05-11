import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { desc } from 'drizzle-orm'; 

export const getUser = async (req: Request, res: Response) => {
  try {
    const idValue = req.query.id ?? req.query.userId;
    const emailValue = req.query.email;

    const id = typeof idValue === 'string' ? Number(idValue) : undefined;
    const email = typeof emailValue === 'string' ? emailValue : undefined;

    if (!id && !email) {
      return res.status(400).json({ error: 'Provide id, userId, or email' });
    }

    const [user] = id
      ? await db.select().from(users).where(eq(users.id, id)).limit(1)
      : await db.select().from(users).where(eq(users.email, email!)).limit(1);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const rawLimit = typeof req.query.limit === 'string' ? Number(req.query.limit) : 10;
    const limit = rawLimit === 20 ? 20 : 10;

    const leaderboard = await db.select().from(users).orderBy(desc(users.points)).limit(limit);
    const leaderboardwithoutPassword = leaderboard.map(user => {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
   });
    res.json(leaderboardwithoutPassword);
  }
  catch (error){
     console.error('Error fetching leaderboard')
     res.status(500).json({ error: 'Internal server error '})
  }

  
    
}
