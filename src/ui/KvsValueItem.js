import Accordion from 'react-bootstrap/Accordion';
import React, { useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import TeamBadge from './TeamBadge';
import KvsBadge from './KvsBadge';
import { FaRegCopy } from 'react-icons/fa';

const KvsValueItem = ({value, itemKey, teamsList}) => {
    const getLocalizationSize = (localization) => {
        let span = 0;
        for (let platform of localization.platforms) {
            for (let version of platform.versions) {
                span += 1;
            }
        }
        return span
    }
    console.log(teamsList)

    const [copied, setCopied] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const buttonRef = useRef(null);
    const team = teamsList.find((t) => t.name === value.team);

    const handleCopy = () => {
        navigator.clipboard.writeText(value.name).then(() => {
        setCopied(true);
        setShowSnackbar(true);
        setTimeout(() => {
            setCopied(false);
            setShowSnackbar(false);
        }, 1000);
        });
    };

    return (
        <Accordion.Item eventKey={itemKey}>
            <Accordion.Header>
                <TeamBadge style={{flexShrink:'0' }} text={value.team} bgColor={team.bg} textColor={team.text}/>

                <h5 style={{
                    marginBlock: '0.3em',
                    marginLeft: '0.5em',
                    marginRight: '0.5em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flexGrow: '1',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4em',
                }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{value.name}</span>

                    {/* Кнопка с вложенным снеком */}
                    <div style={{ position: 'relative' }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCopy();
                          }}
                        title="Скопировать имя"
                        style={{
                        minWidth: '1.8em',
                        height: '1.8em',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: copied ? '#a0e3a0' : '#e0e0e0',
                        transition: 'background-color 0.3s ease',
                        flexShrink: 0,
                        position: 'relative',
                        zIndex: 1,
                        }}
                    >
                        <FaRegCopy size={14} color={copied ? '#2e7d32' : '#555'} />
                    </button>

                    {/* Снек выезжает вбок */}
                    {showSnackbar && (
                        <div style={{
                        position: 'absolute',
                        left: '120%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '0.4em 0.8em',
                        borderRadius: '0.4em',
                        fontSize: '0.75em',
                        whiteSpace: 'nowrap',
                        boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
                        animation: 'slideInOutSide 1s ease-in-out',
                        zIndex: 2,
                        }}>
                        Имя тоггла скопировано
                        </div>
                    )}
                    </div>
                </h5>

                {value.hasBeta ? <KvsBadge style={{flexShrink:'0'}} text = {`${'BETA'}`} color = {"#BC7EFF"}/> : <div/>}
                
                <div style={{width:'1em'}}/>
            </Accordion.Header>
            <Accordion.Body>
                <div><div style={{fontWeight: 'bold'}}>Описание:</div> {`${value.description}`}</div>
                <div><div style={{fontWeight: 'bold'}}>Версия релиза:</div> {`${value.releaseVersion}`}</div>
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