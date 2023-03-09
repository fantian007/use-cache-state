import { useState, useMemo } from 'react';
import { isFunction, isNil } from 'lodash-es';
import { PersistSerializationError } from './errors';
import useUpdate from './hooks/useUpdate';
import { Cache, PersistCache, CacheKey, CacheManager } from './cache';
import getPersistMode from './utils/getPersistMode'
import { IOptions, InitialState, SetState } from './interface';
import useAsyncIsomorphicLayoutEffect from './hooks/useAsyncIsomorphicLayoutEffect';

// 缓存管理器
const cacheManager = new CacheManager();

const useCacheState = <D>(
  cacheKey: CacheKey,
  initialState?: InitialState<D>,
  options?: IOptions
) => {
  type T = D | undefined;

  // 强制更新
  const forceUpdate = useUpdate();
  // 持久化配置项
  const persistCfg = options?.persist;
  // 是否可持久化
  const persistEnable = !isNil(persistCfg);
  // 持久化模式
  const persistMode = getPersistMode(persistCfg);
  // 是否正在恢复持久化数据
  const [isRecoveringFromPersist, setIsRecoveringFromPersist] = useState(persistEnable);
  // 是否正在保存持久化数据
  const [isSavingToPersist, setIsSavingToPersist] = useState(false);

  // 如使用持久化能力，缓存 key 不可以是 symbol
  if (persistCfg && typeof cacheKey === 'symbol') {
    throw new Error("If you are using persistence capability, cacheKey cannot be a symbol.");
  }

  // 旧缓存对象
  const _cache = useMemo(() => cacheManager.get(cacheKey), []);
  // 旧缓存对象如为空，则构建新缓存
  if (isNil(_cache)) {
    // 初始化数据
    const initData = isFunction(initialState) ? initialState() : initialState;

    const cache: Cache<T> = useMemo(() => _cache ?? new PersistCache<T>(cacheKey.toString(), initData, persistMode), []);

    cacheManager.add(cacheKey, cache);
  }
  // 新缓存对象
  const cache = cacheManager.get(cacheKey) as PersistCache<T>;

  // @ts-ignore
  const setState: SetState<T> = async (d) => {
    console.log('__setState', d);

    if (persistEnable) {
      setIsSavingToPersist(true);
      // @ts-ignore
      await cache.save(d);
      setIsSavingToPersist(false);
    } else {
      // @ts-ignore
      cache.set(d);
    }
    
    // 强制更新
    forceUpdate();
  }

  useAsyncIsomorphicLayoutEffect(async () => {
    if (persistEnable) {
      try {
        setIsRecoveringFromPersist(true);

        await cache.init();
      } catch (error) {
        if (error instanceof PersistSerializationError) {
          console.warn(error.message);
        } else if (error instanceof Error) {
          console.warn(error.message);
        } else {
          throw error;
        }
      } finally {
        setIsRecoveringFromPersist(false);
      }
    }
  }, []);

  const state = cache.get();

  return [state, setState, isRecoveringFromPersist, isSavingToPersist] as const;
};

export default useCacheState;
