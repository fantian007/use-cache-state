import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Page1 from './src/components/Page1';
import Page2 from './src/components/Page2';

const App = () => {
  const [page, setPage] = React.useState(1);

  const switchPage = () => {
    if (page === 1) {
      setPage(2);
    } else {
      setPage(1);
    }
  }

  const ui = React.useMemo(() => {
    switch(page) {
      case 1:
        return (
          <>
          <Page1 />
          <Page1 />
          </>
        );
      case 2:
        return <Page2 />;
      default:
        throw new Error('请选择正确视图');
    }
  }, [page]);

  return (
    <div>
      视图-{page}，数据：{ui}
      <div>
        <button onClick={switchPage}>切换视图</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
