import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { showPerson } from '../store/personSlice';
import { Modal } from 'antd';
import { List } from 'antd';

const Person: FC = () => {

  const dispatch = useAppDispatch();

  const handlePersonClose = () => dispatch(showPerson(null))

  const name = useAppSelector(store => store.person.personShown);
  const personInfo = useAppSelector(store => store.people.peopleData.find(person => person.name === name));
  console.log(personInfo);

  const personListData = [];
  if (personInfo) {
    personListData.push(`height: ${personInfo.height}`);
    personListData.push(`mass: ${personInfo.mass}`);
    personListData.push(`hair color: ${personInfo.hair_color}`);
    personListData.push(`skin color: ${personInfo.skin_color}`);
    personListData.push(`eye color: ${personInfo.eye_color}`);
    personListData.push(`birth year: ${personInfo.birth_year}`);
    personListData.push(`gender: ${personInfo.gender}`);
  };
  
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
