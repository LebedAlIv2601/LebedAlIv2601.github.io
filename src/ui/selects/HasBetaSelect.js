import React from 'react';
import { FormSelect } from 'react-bootstrap';

const HasBetaSelect = ({selectedHasBetaMode, onSelect}) => {
    return (
        <div>
            <FormSelect value={selectedHasBetaMode} onChange={(e) => onSelect(e.target.value)}>
                <option value='all'>Не выбрано</option>
                <option value='with_beta'>Только с beta</option>
            </FormSelect>
        </div>
    );
};

export default HasBetaSelect;