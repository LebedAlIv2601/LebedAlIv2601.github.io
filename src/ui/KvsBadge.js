import React from 'react';

const KvsBadge = ({ text, color = 'blue'}) => {
    const styles = {
        display: 'inline-block',
        padding: '0.4em 0.8em',
        borderRadius: '12px',
        color: 'white',
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