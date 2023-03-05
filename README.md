# use-cache-state
This is a React hook that can cache state values.

# About
Keep Api consistent with useState. When the component is destroyed and created again, the data after the last operation will be used as the initial value of the state, providing global caching capability. This is commonly used to maintain the previous state when switching pages/routes and returning to them again.

Api 和 useState 保持一致。可以在组件销毁，下次创建时，会将上次操作后的数据作为 state 初始化值，提供了全局缓存能力。常用于切换页面/路由并再次回退时，保持上次的状态

# Install
```bash
yarn install @sprit/use-cache-state
```

# Usage
```typescript
import { useCacheState } from '@sprit/use-cache-state';

const cacheKey = Symbol();

const Table = () => {
  const [pagination, setPagination] = useCacheState<Pagination>(cacheKey, { pageNo: 1 });

  return (
    <Table pagination={pagination} />
  )
};
```

# License
MIT © <1562743134@qq.com>
