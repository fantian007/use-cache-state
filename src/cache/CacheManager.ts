import isNil from 'lodash-es/isNil';
import Cache from './Cache';
import { CacheKey, Caches } from './interface';

/**
 * 缓存管理器
 */
class CacheManager {
  private caches: Caches = new Map();

  constructor(caches?: Caches) {
    if (caches) {
      this.caches = caches;
    }
  }

  add(cacheKey: CacheKey, cache: Cache) {
    this.caches.set(cacheKey, cache);
  }

  remove(cacheKey: CacheKey) {
    this.caches.delete(cacheKey);
  }

  get(): Caches | undefined;
  get(cacheKey: CacheKey): Cache | undefined;
  get(cacheKey?: CacheKey): Caches | Cache | undefined {
    if (!isNil(cacheKey)) {
      return this.caches.get(cacheKey);
    } else {
      return this.caches;
    }
  }

  clear() {
    this.caches = new Map();
  }

  get size () {
    return this.caches.size;
  }
}

export default CacheManager;
