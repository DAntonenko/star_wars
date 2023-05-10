import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { personActions } from '../store/personSlice';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface IPersonObject {
  key: number,
  name: string,
  homeworld: string | undefined
}

const PeopleTable: FC = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(store => store.people.status === 'loading' || store.people.status === null);

  const people = useAppSelector(store => store.people.peopleData);
  const planets = useAppSelector(store => store.planets.planetsData);
  const persons = people.map((person, index) => {
    const homeworld = planets.find(planet => planet.url === person.homeworld);
    const personObject = {} as IPersonObject;
    personObject.key = index;
    personObject.name = person.name;
    personObject.homeworld = homeworld?.name;
    return personObject;
  });

  const filters = planets.map(planet => {
    return {text: planet.name, value: planet.name};
  });

  const columns: ColumnsType<IPersonObject> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'homeworld',
      title: 'Homeworld',
      dataIndex: 'homeworld',
      filters: filters,
      onFilter: (value: string | number | boolean, record) => (record.homeworld ?? '').indexOf(value as string) === 0,
    },
  ];

  const onRowClick = (record: IPersonObject) => {
    return {
      onClick: () => dispatch(personActions.showPerson(record.name))
    };
  }

  return (
    <Table
      columns={columns}
      dataSource={persons}
      onRow={onRowClick}
      pagination={{position: ['bottomCenter']}}
      loading={isLoading}
    />
  )
};

export default PeopleTable;
