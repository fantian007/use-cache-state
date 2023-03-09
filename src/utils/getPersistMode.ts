import { isBoolean } from 'lodash-es';
import { Persist } from '../interface';
import { PersistMode } from '../persist/interface';
import { DEFAULT_PERSIST_MODE } from '../constant';

/**
 * 获取持久化模式
 * @param persistCfg {Persist} - 持久化配置项
 */
const getPersistMode = (persistCfg?: Persist): PersistMode => {
  let mode: PersistMode = DEFAULT_PERSIST_MODE;

  if (persistCfg && !isBoolean(persistCfg) && persistCfg.mode) {
    mode = persistCfg.mode;
  }

  return mode;
}

export default getPersistMode;
