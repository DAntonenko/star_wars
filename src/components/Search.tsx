import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { personActions } from '../store/personSlice';
import { AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Search: FC = () => {
  interface IOption {
    value: string;
    label: string;
  }

  const dispatch = useAppDispatch();

  const people = useAppSelector(store => store.people.peopleData);
  const peopleNames = people.map(person => person.name);

  const [options, setOptions] = useState<IOption[]>([]);
  const [inputValue, setInputValue] = useState(''); // track the input field value

  const handleSearch = (value: string) => {
    const matchingNames: IOption[] = [];
    peopleNames.forEach(name => {
      if (
        value.length &&
        name.toLowerCase().slice(0, value.length) === value.toLowerCase()
      ) {
        matchingNames.push({ value: name, label: name });
      }
    });
    setOptions(matchingNames);
    setInputValue(value); // update the input field value
  };

  const handleSelect = (value: string) => dispatch(personActions.showPerson(value));

  const handleBlur = () => {
    setInputValue(''); // clear the input field value on blur
    setOptions([]); // clear dropdown options on blur
  };

  return (
    <AutoComplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      onSelect={handleSelect}
      onBlur={handleBlur}
      placeholder={<div><SearchOutlined /> Search</div>}
      options={options}
      value={inputValue}
      defaultActiveFirstOption={true}
    />
  );
};

export default Search;
