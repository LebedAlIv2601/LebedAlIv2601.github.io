import React from 'react';
import { FormSelect } from 'react-bootstrap';

const TeamSelect = ({selectedTeam, onSelect}) => {
    return (
        <div>
            <FormSelect value={selectedTeam} onChange={(e) => onSelect(e.target.value)}>
                <option value='all'>All</option>
                <option value='blue'>Blue</option>
                <option value='green'>Green</option>
                <option value='orange'>Orange</option>
                <option value='common'>Common</option>
            </FormSelect>
        </div>
    );
};

export default TeamSelect;