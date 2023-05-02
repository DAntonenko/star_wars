import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPeopleData } from '../store/peopleSlice';
import { showPerson } from '../store/personSlice';
import { Table } from 'antd';


const PeopleTable: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPeopleData());
  }, [dispatch]);
  
  const people = useSelector(store => store.people.peopleData);
  const peopleNames = people.map((person, index) => {
    const personObject = {};
    personObject.key = index;
    personObject.name = person.name;
    return personObject;
  });

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
  ];

  const onRowClick = (record) => {
    return {
      onClick: () => dispatch(showPerson(record.name))
    };
  }

  return (
    <Table
      columns={columns}
      dataSource={peopleNames}
      onRow={onRowClick}
      pagination={{position: ['bottomCenter']}}
    />
  )
};

export default PeopleTable;
