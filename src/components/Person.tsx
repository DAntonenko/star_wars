import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { personActions } from '../store/personSlice';
import { Modal } from 'antd';
import { List } from 'antd';

const Person: FC = () => {

  const dispatch = useAppDispatch();

  const handlePersonClose = () => dispatch(personActions.showPerson(null))

  const name = useAppSelector(store => store.person.personShown);
  const personInfo = useAppSelector(store => store.people.peopleData.find(person => person.name === name));
  const homeworldInfo = useAppSelector(store => store.planets.planetsData.find(planet => planet.url === personInfo?.homeworld));
  const specieInfo = useAppSelector(store => store.species.speciesData.find(specie => specie.url === personInfo?.species[0]));


  const personListData = [];

  if (personInfo) {
    personListData.push(`height: ${personInfo.height}`);
    personListData.push(`mass: ${personInfo.mass}`);
    personListData.push(`hair color: ${personInfo.hair_color}`);
    personListData.push(`skin color: ${personInfo.skin_color}`);
    personListData.push(`eye color: ${personInfo.eye_color}`);
    personListData.push(`birth year: ${personInfo.birth_year}`);
    personListData.push(`gender: ${personInfo.gender}`);
  }

  if (homeworldInfo) {
    personListData.push(`homeworld: ${homeworldInfo.name}`);
  }

  if (specieInfo) {
    personListData.push(`specie: ${specieInfo.name}`);
  }
  
  return (
    <Modal
      open={name !== null}
      onCancel={handlePersonClose}
      footer={null}
    >
      <List
        header=<h2>{name}</h2>
        dataSource={personListData}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </Modal>
  )
}

export default Person;
