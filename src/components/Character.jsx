import React from 'react';

const Character = ({ src, alt, left, top, onClick: _onClick }) => {
  return (
    <img
      className={'tp-character'}
      src={src}
      alt={alt}
      style={{ left, top }}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        _onClick?.(e);
      }}
    />
  );
};

export default Character;
