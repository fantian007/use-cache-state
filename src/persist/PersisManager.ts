import LocalForage from './LocalForage';
import LocalStorage from './LocalStorage';
import { PersistMode } from "./interface";

/**
 * 持久化方案 管理器
 */
class PersisManager {
  getInstance<D>(mode: PersistMode) {
    switch (mode) {
      case 'localStorage':
        return new LocalStorage<D>();
      case 'localforage':
      default:
        return new LocalForage<D>();
    }
  }
}

export default PersisManager;
