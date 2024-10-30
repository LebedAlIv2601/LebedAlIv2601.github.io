import React from 'react';
import { Accordion } from 'react-bootstrap';
import KvsValueItem from './KvsValueItem';

const KvsValuesContent = ({values, selectedTeam}) => {
    return (
        <div>
            <Accordion defaultActiveKey={[]} alwaysOpen>
                {values.map((value, index) => (
                    <KvsValueItem value={value} itemKey={selectedTeam + value.name}/>
                ))}
            </Accordion>
        </div>
    );
};

export default KvsValuesContent;