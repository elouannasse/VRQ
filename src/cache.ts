interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

interface CacheOptions<T> {
  key: string;
  fetchFn: () => Promise<T>;
  staleTime: number;
  cacheTime: number;
}

interface CacheResult<T> {
  data: T;
  source: 'cache' | 'database';
  cacheAge?: number;
  status: 'HIT' | 'MISS' | 'STALE' | 'EXPIRED';
}

export async function getCachedData<T>(options: CacheOptions<T>): Promise<CacheResult<T>> {
  const { key, fetchFn, staleTime, cacheTime } = options;

  console.log(`🔍 Cache CHECK for ${key}`);

  const cached = cache.get(key);
  
  if (cached) {
    const age = Date.now() - cached.timestamp;

    if (age < staleTime) {
      console.log(`✅ Cache HIT - returning fresh cached data (age: ${Math.round(age/1000)}s)`);
      return { data: cached.data, source: 'cache', cacheAge: age, status: 'HIT' };
    }

    if (age < cacheTime) {
      console.log(`🔄 Cache STALE - returning cached + refreshing in background (age: ${Math.round(age/1000)}s)`);
      
      fetchFn().then(freshData => {
        cache.set(key, { data: freshData, timestamp: Date.now() });
        console.log(`🔄 Background refresh completed for ${key}`);
      });

      return { data: cached.data, source: 'cache', cacheAge: age, status: 'STALE' };
    }

    console.log(`⏰ Cache EXPIRED - fetching fresh data (age: ${Math.round(age/1000)}s)`);
  } else {
    console.log(`❌ Cache MISS - fetching from database`);
  }

  await new Promise(resolve => setTimeout(resolve, 500));
  
  const freshData = await fetchFn();
  cache.set(key, { data: freshData, timestamp: Date.now() });

  setTimeout(() => {
    if (cache.has(key)) {
      const entry = cache.get(key);
      if (entry && Date.now() - entry.timestamp >= cacheTime) {
        cache.delete(key);
        console.log(`🗑️ Auto-expired cache for ${key}`);
      }
    }
  }, cacheTime);

  return { data: freshData, source: 'database', status: cached ? 'EXPIRED' : 'MISS' };
}

export async function invalidateCache(key: string) {
  cache.delete(key);
  console.log(`🗑️ Cache invalidated for ${key}`);
}

export async function clearAllCache() {
  cache.clear();
  console.log(`🗑️ All cache cleared`);
}

export async function getCacheStats() {
  const stats = Array.from(cache.entries()).map(([key, entry]) => ({
    key,
    age: Date.now() - entry.timestamp
  }));

  return { totalKeys: cache.size, keys: stats };
}
