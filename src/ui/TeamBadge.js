import React from 'react';
import KvsBadge from './KvsBadge';

const TeamBadge = ({ text, bgColor, textColor }) => {
    return (
        <div>
            <KvsBadge text = {`${text}`} bgColor={bgColor} textColor={textColor}/>
        </div>
    );
};

export default TeamBadge;