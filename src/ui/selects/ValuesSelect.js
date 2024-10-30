import React from 'react';
import { FormSelect } from 'react-bootstrap';

const ValueTypeSelect = ({selectedValueType, onSelect}) => {
    return (
        <div>
            <FormSelect value={selectedValueType} onChange={(e) => onSelect(e.target.value)}>
                <option value='features'>Feature Toggles</option>
                <option value='values'>Remote Values</option>
            </FormSelect>
        </div>
    );
};

export default ValueTypeSelect;