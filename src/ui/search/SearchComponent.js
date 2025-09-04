import React from 'react';
import { InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchComponent = ({ query, onChangeQuery }) => {
  return (
      <InputGroup>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Enter toggle / value name"
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
        />
      </InputGroup>
  );
};

export default SearchComponent;