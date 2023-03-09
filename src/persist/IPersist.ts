
/**
 * 持久化 接口
 */
interface IPersist<D> {
  /**
   * 存
   */
  save(key: string, data: D): Promise<void>;

  /**
   * 取
   */
  get(key: string): Promise<D | null>;

  /**
   * 清空 key 对应的缓存
   */
  clear(key: string): Promise<void>;
}

export default IPersist;
