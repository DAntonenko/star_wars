import { FC } from 'react';
import { Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import PeopleTable from './components/PeopleTable';
import Person from './components/Person';
import 'antd/dist/reset.css';

const App: FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <Button
          type='primary'
          size='large'
          icon={<RedoOutlined />}
        >
          Reload data
        </Button>
      </header>
      <PeopleTable />
      <Person />
    </div>
  );
}

export default App;
