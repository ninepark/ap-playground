import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const Character = ({ id, src, alt, left, top, onClick: _onClick, ...props }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <img
      className={'tp-character'}
      src={src}
      alt={alt}
      style={{ ...style, left, top }}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        _onClick?.(e);
      }}
      onTouchStartCapture={e => {
        console.log('onTouchStartCapture', e);
        props.onTouchStartCapture(e);
      }}
      onTouchEndCapture={e => {
        console.log('onTouchEndCapture', e);
        props.onTouchEndCapture(e);
      }}
      onTouchMoveCapture={e => {
        console.log('onTouchMoveCapture', e);
        props.onTouchMoveCapture(e);
      }}
      {...props}
    />
  );
};

export default Character;
