import { produce } from 'immer';
import isFunction from 'lodash-es/isFunction';
import { setCb } from './interface';

/**
 * 缓存类
 */
class Cache<D = any> {
  /**
   * 缓存数据
   */
  private data: D;

  constructor(data: D) {
    this.data = data;
  }

  /**
   * 存
   */
  set(d: D): this;
  set(cb: setCb<D>): this;
  set(d: D | setCb<D>): this {
    if (isFunction(d)) {
      const nextData = produce(this.data, d);

      this.data = nextData;
    } else {
      this.data = d;
    }

    return this;
  }

  /**
   * 取
   */
  get(): D;
  get<K extends keyof D>(key: K): D[K];
  get<K extends keyof D>(key?: K): D | D[K] {
    if (key) {
      return this.data[key];
    } else {
      return this.data;
    }
  }
}

export default Cache;
