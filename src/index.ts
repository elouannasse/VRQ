import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getCachedData, invalidateCache, clearAllCache, getCacheStats } from './cache';
import { getUserById } from './data';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId) || userId < 1 || userId > 4) {
    return res.status(400).json({ error: 'Invalid user ID. Must be 1-4' });
  }

  try {
    const result = await getCachedData({
      key: `user:${userId}`,
      fetchFn: async () => {
        const user = getUserById(userId);
        if (!user) throw new Error('User not found');
        return user;
      },
      staleTime: 30000,
      cacheTime: 300000
    });

    res.setHeader('X-Cache-Status', result.status);
    if (result.cacheAge) {
      res.setHeader('X-Cache-Age', Math.round(result.cacheAge / 1000).toString());
    }

    res.json({
      ...result.data,
      source: result.source,
      cachedAt: result.cacheAge ? new Date(Date.now() - result.cacheAge) : new Date()
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/cache/stats', async (req, res) => {
  try {
    const stats = await getCacheStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cache stats' });
  }
});

app.delete('/api/cache/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  
  try {
    await invalidateCache(`user:${userId}`);
    res.json({ message: `Cache invalidated for user ${userId}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to invalidate cache' });
  }
});

app.delete('/api/cache/clear', async (req, res) => {
  try {
    await clearAllCache();
    res.json({ message: 'All cache cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cache' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`💾 Using in-memory cache (no Redis required)`);
});
