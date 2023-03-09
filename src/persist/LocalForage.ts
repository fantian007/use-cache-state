import localforage from 'localforage';
import IPersist from './IPersist';
import PersistSerializationError from '../errors/PersistSerializationError';

/**
 * 基于 localforage 的持久化 方案
 * 
 * @see https://github.com/localForage/localForage
 */
class LocalForage<D> implements IPersist<D> {
  async save(key: string, data: D): Promise<void> {
    const str = JSON.stringify(data);

    localforage.setItem(key, str);
  }

  async get(key: string): Promise<D | null> {
    const data = await localforage.getItem<string>(key);

    if (data !== null) {
      try {
        return JSON.parse(data) as D;
        
      } catch (error) {
        throw new PersistSerializationError();
      }
    } else {
      return null;
    }
  }

  async clear(key: string) {
    localforage.removeItem(key);
  }
}

export default LocalForage;
