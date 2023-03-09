import Cache from './Cache';
import IPersist from '../persist/IPersist';
import PersistManager from '../persist/PersisManager';
import { PersistMode } from '../persist/interface';
import { setCb } from './interface';

// 持久化 管理器
const persistManager = new PersistManager();

/**
 * 持久化 Cache
 */
class PersistCache<D> extends Cache<D> {
  /**
   * 缓存 key
   */
  key: string;
  /**
   * 持久化操作实例
   */
  persistInstance: IPersist<D>;

  constructor(key: string, data: D, persistMode: PersistMode) {
    super(data);

    this.key = key;
    this.persistInstance = persistManager.getInstance(persistMode);
  }

  /**
   * 初始化
   * @param key {string} - 缓存key
   */
  async init() {
    // 从 local 取值 作为 初始值
    const data = await this.persistInstance.get(this.key);

    if (data !== null) {
      this.set(data);
    }
  }

  /**
   * 存
   * @param key {string} - 缓存key
   * @param d {D} - 数据
   */
  async save(d: D): Promise<this>;
  async save(cb: setCb<D>): Promise<this>;
  async save(d: D | setCb<D>): Promise<this> {
    // @ts-ignore
    this.set(d);

    const data = this.get();
    // 存入 local
    this.persistInstance.save(this.key, data);

    return this;
  }
}

export default PersistCache;
