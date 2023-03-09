
/**
 * 持久化数据 序列化 错误
 */
class PersistSerializationError extends Error {
  name = 'PersistSerializationError';

  constructor (message = 'Serialization Failure or Failed to Serialize Data') {
    super(message);
  }
}

export default PersistSerializationError;
