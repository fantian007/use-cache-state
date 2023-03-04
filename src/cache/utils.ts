import { debounce } from 'lodash';
import CacheManager from './CacheManager';

// 是否开发环境
export const isDev = process.env.NODE_ENV === 'development';

/**
 * 打印日志-缓存数量
 */
export const logCachesSize = debounce((cacheManager: CacheManager) => {
  const size = cacheManager.get()?.size ?? 0;

  console.log(`caches count：%c ${size}`, 'color: red');
}, 1e3);
