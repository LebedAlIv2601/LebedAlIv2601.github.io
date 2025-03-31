import React from 'react';
import KvsBadge from './KvsBadge';

const TeamBadge = ({ text }) => {
    const getColor = (team) => {
        switch (team) {
            case 'green':
                return '#198754';
            case 'orange':
                return '#fd7e14';
            case 'blue':
                return '#0d6efd';
            case 'yellow':
                return '#FDE910';
            case 'supplies':
                return '#cc338b';
            case 'ads':
                return '#d10404';
            default:
                return '#6c757d';
        }
    };
    return (
        <div>
            <KvsBadge text = {`${text}`} color = {getColor(text)}/>
        </div>
    );
};

export default TeamBadge;