import React,{ FC, useEffect } from 'react';
import { useAppDispatch } from './hook';
import { getPeopleData } from './store/peopleSlice';
import { getPlanetsData } from './store/planetsSlice';
import { getSpeciesData } from './store/speciesSlice';
import { Layout, Space, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import Search from './components/Search';
import PeopleTable from './components/PeopleTable';
import Person from './components/Person';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

const App: FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPeopleData());
    dispatch(getPlanetsData());
    dispatch(getSpeciesData());
  }, [dispatch]);

  return (
    <Space direction="vertical" style={{ alignItems: 'center', width: '100%', backgroundColor: '#f5f5f5' }}>
      <Layout>
        <Header style={{ display: 'flex', gap: 10, alignItems: 'center', paddingInline: 16, backgroundColor: '#f5f5f5' }}>
          <Button
            type='primary'
            size='middle'
            icon={<ReloadOutlined />}
          >
            Reload
          </Button>
          <Search />
        </Header>
        <Content>
          <PeopleTable />
          <Person />
        </Content>
      </Layout>
    </Space>
  );
}

export default App;
