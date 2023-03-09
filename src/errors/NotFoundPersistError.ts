
/**
 * 未找到持久化数据
 */
class NotFoundPersistError extends Error {
  name = 'NotFoundPersistError';

  constructor (message = 'Persistence Data Not Found') {
    super(message);
  }
}

export default NotFoundPersistError;
