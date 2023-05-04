import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { showPerson } from '../store/personSlice';
import { Table } from 'antd';

interface IPersonObject {
  key: number,
  name: string
}

const PeopleTable: FC = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(store => store.people.status === 'loading' || store.people.status === null);
  const people = useAppSelector(store => store.people.peopleData);
  const peopleNames = people.map((person, index) => {
    const personObject = {} as IPersonObject;
    personObject.key = index;
    personObject.name = person.name;
    return personObject;
  });

  console.log(peopleNames);
  console.log(isLoading);

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
  ];

  const onRowClick = (record: IPersonObject) => {
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
      loading={isLoading}
    />
  )
};

export default PeopleTable;
