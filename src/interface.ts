import { setCb } from "./cache";
import type { PersistMode } from "./persist/interface";

export type InitialState<S> = S | (() => S);

/**
 * 持久化配置项
 */
export type Persist =
  | true
  | {
    /**
     * 模式
     * 
     * @default localforage
     */
    mode?: PersistMode;
  }


/**
 * 配置
 */
export interface IOptions {
  /**
   * 持久化
   * 
   * @default true
   */
  persist?: Persist;
}

export interface SetState<D> {
  (d: D): Promise<void>;
  (cb: setCb<D>): Promise<void>;
  (d: D | setCb<D>): Promise<void>;
}
