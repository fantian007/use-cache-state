import isNil from 'lodash-es/isNil';
import Cache from './Cache';
import { logCachesSize } from './utils';
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
    // 日志-打印缓存数量
    logCachesSize(this);

    if (!isNil(cacheKey)) {
      return this.caches.get(cacheKey);
    } else {
      return this.caches;
    }
  }

  clear() {
    this.caches = new Map();
  }
}

export default CacheManager;
