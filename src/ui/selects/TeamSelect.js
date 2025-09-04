import React from 'react';
import { FormSelect } from 'react-bootstrap';

const TeamSelect = ({ selectedTeam, onSelect, teamsList }) => {
  return (
    <div>
      <FormSelect value={selectedTeam} onChange={(e) => onSelect(e.target.value)}>
        <option value="all">All</option>
        {teamsList.map((team) => (
          <option key={team.name} value={team.name}>
            {team.name}
          </option>
        ))}
      </FormSelect>
    </div>
  );
};

export default TeamSelect;