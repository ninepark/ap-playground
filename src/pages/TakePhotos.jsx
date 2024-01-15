import React from 'react';
import { useEffect, useRef, useState } from 'react';

import dolpoong from '../assets/dolpoong.PNG';
import ggumi from '../assets/ggumi2.png';
import bokjang from '../assets/bokjang.png';
import ddugi from '../assets/ddugi.png';
import gerter from '../assets/gerter.png';
import ori from '../assets/ori.png';
import bajirac from '../assets/bajirac.png';
import Character from '../components/Character';

const TakePhotos = () => {
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
  const [currentCharacterIdx, setCurrentCharacterIdx] = useState(0);
  const videoEl = useRef();
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

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(camInit)
      .catch(error => {
        console.log('get camera permission failed : ', error);
      });
  };

  useEffect(() => {
    mainInit();
  }, []);

  return (
    <div className={'tp-app'}>
      <div className={'tp-wrapper'}>
        <div className={'tp-video-container'}>
          <video id='cameraview' ref={videoEl}></video>
          <div
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
            {displayedCharacters.map((character, idx) => {
              return (
                <Character
                  key={`character-${idx}`}
                  alt={characters[character.characterIdx]?.name}
                  src={characters[character.characterIdx]?.src}
                  left={character.x}
                  top={character.y}
                  onClick={e => {
                    const nextIdx = (currentCharacterIdx + 1) % characters.length;
                    setDisplayedCharacters(prev => {
                      prev.splice(idx, 1, { ...prev[idx], characterIdx: nextIdx });
                      return prev;
                    });
                    setCurrentCharacterIdx(nextIdx);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakePhotos;
