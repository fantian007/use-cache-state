import isNil from 'lodash-es/isNil';
import { PersistSerializationError, NotFoundPersistError } from '../errors';
import IPersist from './IPersist';

/**
 * 基于 localStorage 的持久化 方案
 */
class LocalStorage<D> implements IPersist<D> {
  async save(key: string, data: D): Promise<void> {
    const str = JSON.stringify(data);

    localStorage.setItem(key, str);
  }

  async get(key: string): Promise<D> {
    const data = localStorage.getItem(key);

    if (!isNil(data)) {
      try {
        return JSON.parse(data) as D;

      } catch (error) {
        throw new PersistSerializationError();
      }
    } else {
      throw new NotFoundPersistError();
    }
  }

  async clear(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
