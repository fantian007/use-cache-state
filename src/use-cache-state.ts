import { isFunction, isNil } from 'lodash';
import useUpdate from './hooks/useUpdate';
import { Cache, CacheKey, CacheManager, setCb } from './cache';
import { InitialState } from './interface';

// cache manager
const cacheManager = new CacheManager();

const useCacheState = <D>(
  cacheKey: CacheKey,
  initialState?: InitialState<D>,
) => {
  const _cache = cacheManager.get(cacheKey);

  if (isNil(_cache)) {
    const initData = isFunction(initialState) ? initialState() : initialState;

    cacheManager.add(cacheKey, new Cache(initData));
  }

  const cache = cacheManager.get(cacheKey)! as Cache<D>;

  const forceUpdate = useUpdate();

  const setState = new Proxy(cache.set, {
    // @ts-ignore
    apply(target, thisArg, args) {
      target.apply(cache, args as [setCb<D>]);

      // force update
      forceUpdate();
    },
  });

  const state = cache.get();

  return [state, setState] as const;
};

export default useCacheState;
