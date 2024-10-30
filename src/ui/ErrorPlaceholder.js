import React from 'react';
import { Figure } from 'react-bootstrap';
import sadCat from './images/sad_cat.webp';

const ErrorPlaceholder = () => {
  return (
    <div style={{
            width: '100vw', 
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
        <Figure style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column'
            }}>
        <Figure.Image
            width={320}
            height={320}
            src={sadCat}
        />
        <Figure.Caption>
            Произошла какая-то ошибка
        </Figure.Caption>
        </Figure>
    </div>
  );
};

export default ErrorPlaceholder;