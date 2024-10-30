import React from 'react';
import { FormSelect } from 'react-bootstrap';

const PlatformSelect = ({selectedPlatform, onSelect}) => {
    return (
        <div>
            <FormSelect value={selectedPlatform} onChange={(e) => onSelect(e.target.value)}>
                <option value='all'>All</option>
                <option value='ios'>iOS</option>
                <option value='android+huawei'>Android + Huawei</option>
                <option value='android'>Android</option>
                <option value='huawei'>Huawei</option>
            </FormSelect>
        </div>
    );
};

export default PlatformSelect;