import { LRUCache }   from 'lru-cache';

// Configure cache options
const cacheOptions = {
    max: 100, // Maximum number of items in the cache
    maxAge: 1000 * 60 * 15, // Cache items for 15 minutes (in milliseconds)
  };
  
  // Create an LRU cache instance
  const cache = new LRUCache(cacheOptions);
  
  // Function to get data from the cache
  function getFromCache(key) {
    return cache.get(key);
  }
  
  // Function to set data in the cache
  function setInCache(key, value) {
    cache.set(key, value);
  }

  
export {getFromCache, setInCache};

