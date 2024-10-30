import Accordion from 'react-bootstrap/Accordion';
import React from 'react';
import { Table } from 'react-bootstrap';
import TeamBadge from './TeamBadge';

const KvsValueItem = ({value, itemKey}) => {
    const getLocalizationSize = (localization) => {
        let span = 0;
        for (let platform of localization.platforms) {
            for (let version of platform.versions) {
                span += 1;
            }
        }
        return span
    }

    return (
        <Accordion.Item eventKey={itemKey}>
            <Accordion.Header>
                <TeamBadge text={value.team}/>
                <h5 style={{marginBlock:'0.3em', marginLeft:'0.5em', overflow:'hidden', textOverflow:'ellipsis'}}> {`${value.name}`} </h5>
            </Accordion.Header>
            <Accordion.Body>
                <div><div style={{fontWeight: 'bold'}}>Описание:</div> {`${value.description}`}</div>
                <Table striped responsive bordered size="sm" style={{marginTop: '1em'}}>
                <tbody>
                    <tr>
                        <td style={{fontWeight: 'bold'}}>Localization</td>
                        {value.localizations.map((localization, index) => (
                            <td key={index} colSpan={getLocalizationSize(localization)} style={{textAlign: 'center'}}>{localization.name}</td>
                        ))}
                    </tr>
                    <tr>
                        <td style={{fontWeight: 'bold'}}>Platform</td>
                        {value.localizations.map((localization, index) => (
                            localization.platforms.map((platform, index) => (
                                <td key={index} colSpan={platform.versions.length} style={{textAlign: 'center'}}>{platform.name}</td>
                            ))
                        ))}
                    </tr>
                    <tr>
                        <td style={{fontWeight: 'bold'}}>Version</td>
                        {value.localizations.map((localization, index) => (
                            localization.platforms.map((platform, index) => (
                                platform.versions.map((version, index) => (
                                    <td key={index} style={{textAlign: 'center'}}>{version.name}</td>
                                ))
                            ))
                        ))}
                    </tr>
                    <tr>
                        <td style={{fontWeight: 'bold'}}>Value</td>
                        {value.localizations.map((localization, index) => (
                            localization.platforms.map((platform, index) => (
                                platform.versions.map((version, index) => (
                                    <td key={index} style={{textAlign: 'center'}}>{`${version.value}`}</td>
                                ))
                            ))
                        ))}
                    </tr>
                </tbody>
                </Table>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default KvsValueItem;