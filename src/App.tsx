import { FC, useEffect } from 'react';
import { useAppDispatch } from './hook';
import { getPeopleData } from './store/peopleSlice';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import Search from './components/Search';
import PeopleTable from './components/PeopleTable';
import Person from './components/Person';
import 'antd/dist/reset.css';

const App: FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPeopleData());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <Button
          type='primary'
          size='middle'
          icon={<ReloadOutlined />}
        >
          Reload
        </Button>
        <Search />
      </header>
      <PeopleTable />
      <Person />
    </div>
  );
}

export default App;
