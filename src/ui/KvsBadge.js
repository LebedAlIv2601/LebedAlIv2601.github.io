import React from 'react';

const KvsBadge = ({ text, bgColor, textColor}) => {
    const styles = {
        display: 'inline-block',
        padding: '0.4em 0.8em',
        borderRadius: '12px',
        color: textColor,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: bgColor,
        fontSize: '0.8em',
      };
  return (
    <span style={styles}>
      {text}
    </span>
  );
};

export default KvsBadge;