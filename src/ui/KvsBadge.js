import React from 'react';

const KvsBadge = ({ text, color = 'blue'}) => {
    let textColor
    if (color == '#FDE910') {
      textColor = 'black'
    } else {
      textColor = 'white'
    }
    const styles = {
        display: 'inline-block',
        padding: '0.4em 0.8em',
        borderRadius: '12px',
        color: textColor,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: color,
        fontSize: '0.8em',
      };
  return (
    <span style={styles}>
      {text}
    </span>
  );
};

export default KvsBadge;