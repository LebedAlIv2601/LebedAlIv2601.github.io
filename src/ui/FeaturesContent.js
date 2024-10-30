import React from 'react';
import { Accordion } from 'react-bootstrap';
import KvsFeatureItem from './KvsFeatureItem';

const FeaturesContent = ({features, selectedTeam}) => {
    return (
        <div>
            <Accordion defaultActiveKey={[]} alwaysOpen>
                {features.map((feature, index) => (
                    <KvsFeatureItem feature={feature} itemKey={selectedTeam + feature.name}/>
                ))}
            </Accordion>
        </div>
    );
};

export default FeaturesContent;