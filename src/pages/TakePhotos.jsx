import React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { DndContext, useDndContext, useDraggable, useDroppable, DragOverlay } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import dolpoong from '../assets/dolpoong.PNG';
import ggumi from '../assets/ggumi2.png';
import bokjang from '../assets/bokjang.png';
import ddugi from '../assets/ddugi.png';
import gerter from '../assets/gerter.png';
import ori from '../assets/ori.png';
import bajirac from '../assets/bajirac.png';
import Character from '../components/Character';

const TakePhotos = () => {
  const videoEl = useRef();
  const containerEl = useRef();
  const dndContext = useDndContext();
  // console.log('dndContext', dndContext);

  const [currentCharacterIdx, setCurrentCharacterIdx] = useState(0);
  const characters = [
    // { name: '돌풍', src: dolpoong },
    { name: '꾸미', src: ggumi },
    { name: '복쟁이', src: bokjang },
    { name: '뚜기', src: ddugi },
    { name: '게르테르', src: gerter },
    { name: '오리', src: ori },
    { name: '바지락', src: bajirac },
  ];
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [selectedDisplayedCharacterIdx, setSelectedDisplayedCharacterIdx] = useState(-1);

  // Init camera
  const camInit = stream => {
    const cameraView = document.getElementById('cameraview');
    cameraView.srcObject = stream;

    console.log('cameraView', cameraView);
    const playPromise = cameraView.play();

    if (playPromise !== undefined) {
      playPromise
        .then(_ => {
          // Automatic playback started!
          // Show playing UI.
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
    }
  };

  const mainInit = () => {
    // Check navigator media device available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // Navigator mediaDevices not supported
      alert('Media Device not supported');
      return;
    }

    // navigator.mediaDevices
    //   .getUserMedia({ video: true })
    //   .then(camInit)
    //   .catch(error => {
    //     console.log('get camera permission failed : ', error);
    //   });
  };

  useEffect(() => {
    mainInit();
  }, []);

  const [lastPressed, setLastPressed] = useState(0);
  const handlePress = useCallback(
    (event, idx) => {
      const time = new Date().getTime();
      const delta = time - lastPressed;
      setLastPressed(time);
      if (lastPressed) {
        if (delta < 200) {
          console.log('double press');
          const nextIdx = (currentCharacterIdx + 1) % characters.length;
          setDisplayedCharacters(prev => {
            prev.splice(idx, 1, { ...prev[idx], characterIdx: nextIdx });
            return prev;
          });
          setCurrentCharacterIdx(nextIdx);
        } else {
          console.log('single press');
        }
      }
    },
    [lastPressed, characters.length, currentCharacterIdx],
  );

  const { setNodeRef } = useDroppable({
    id: 'tp-character-container',
  });

  return (
    <div className={'tp-app'}>
      <div className={'tp-wrapper'}>
        <div className={'tp-video-container'}>
          <video id='cameraview' ref={videoEl}></video>
          <div
            ref={setNodeRef}
            className={'tp-character-container'}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              setDisplayedCharacters(prev => {
                return prev.concat({
                  characterIdx: currentCharacterIdx,
                  x: e.clientX,
                  y: e.clientY,
                });
              });
            }}
          >
            {/*<DndContext*/}
            {/*// onDragStart={e => {*/}
            {/*//   console.log('onDragStart', e);*/}
            {/*// }}*/}
            {/*// onDragEnd={e => {*/}
            {/*//   console.log('onDragEnd', e, e.delta.x, e.delta.y);*/}
            {/*// }}*/}
            {/*>*/}
            {displayedCharacters.map((character, idx) => {
              return (
                <Character
                  key={`character-${idx}`}
                  id={`${characters[character.characterIdx]?.name}-${idx}`}
                  alt={characters[character.characterIdx]?.name}
                  src={characters[character.characterIdx]?.src}
                  left={character.x}
                  top={character.y}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    handlePress(e, idx);
                  }}
                  onTouchStartCapture={e => {
                    setSelectedDisplayedCharacterIdx(idx);
                  }}
                  onTouchMoveCapture={e => {}}
                  onTouchEndCapture={e => {
                    setSelectedDisplayedCharacterIdx(-1);
                  }}
                />
              );
            })}
            {selectedDisplayedCharacterIdx > -1 ? (
              <div style={{ width: '10px', height: '10px', backgroundColor: 'red' }}></div>
            ) : (
              <></>
            )}
            {/*  <DragOverlay>{selectedDisplayedCharacterIdx > -1 ? <></> : null}</DragOverlay>*/}
            {/*</DndContext>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakePhotos;
