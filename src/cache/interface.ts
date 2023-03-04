import { Draft } from 'immer';
import type Cache from './Cache';

export type CacheKey = keyof any;
export type Caches = Map<CacheKey, Cache<any>>;
export type setCb<T> = (draft: Draft<T>) => void;
