import React from 'react';
import { Accordion } from 'react-bootstrap';
import KvsValueItem from './KvsValueItem';

const KvsValuesContent = ({values, selectedTeam, teamsList}) => {
    return (
        <div>
            <Accordion defaultActiveKey={[]} alwaysOpen>
                {values.map((value, index) => (
                    <KvsValueItem value={value} itemKey={selectedTeam + value.name} teamsList={teamsList}/>
                ))}
            </Accordion>
        </div>
    );
};

export default KvsValuesContent;