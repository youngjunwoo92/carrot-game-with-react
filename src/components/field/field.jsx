/*eslint-disabled*/
import React, { useState, useEffect, useRef, useContext } from 'react';
import { GameContext } from '../../context/game_context';
import Item from '../item/item';
import styles from './field.module.css';

const CARROT_SIZE = 80;

const Field = ({ carrotCount, bugCount }) => {
  const { handleScore, stopGame, start, sec, score } = useContext(GameContext);
  const fieldRef = useRef();
  const [carrots, setCarrots] = useState([]);
  const [bugs, setBugs] = useState([]);
  const carrotPath = 'img/carrot.png';
  const bugPath = 'img/bug.png';

  const clearItems = () => {
    setCarrots([]);
    setBugs([]);
  };

  const handleClick = (e) => {
    if (e.target.dataset.item === 'carrot') {
      let id = e.target.id;
      let newCarrots = carrots.filter((carrot) => {
        return carrot.key !== id;
      });
      setCarrots(newCarrots);
      handleScore();
    } else if (e.target.dataset.item === 'bug') {
      stopGame('lose');
      clearItems();
    }
  };

  useEffect(() => {
    if (start) {
      const width = fieldRef.current.offsetWidth;
      const height = fieldRef.current.offsetHeight;
      setCarrots(createItems('carrot', carrotPath, carrotCount, width, height));
      setBugs(createItems('bug', bugPath, bugCount, width, height));
    } else {
      clearItems();
    }
  }, [start, carrotCount, bugCount]);

  useEffect(() => {
    if (score === carrotCount) {
      stopGame('win');
      clearItems();
    } else if (sec === 0) {
      stopGame('lose');
      clearItems();
    }
  }, [sec, score]);

  return (
    <div ref={fieldRef} className={styles.field} onClick={handleClick}>
      {carrots.map((carrot) => {
        return carrot;
      })}
      {bugs.map((bug) => {
        return bug;
      })}
    </div>
  );
};

export default Field;

function generateRandomCoordinates(min, max) {
  return Math.random() * (max - min) + min;
}

function createItems(name, imgPath, count, width, height) {
  const x1 = 0;
  const y1 = 0;
  const x2 = width - CARROT_SIZE;
  const y2 = height - CARROT_SIZE;
  let items = [];
  for (let index = 0; index < count; index++) {
    items.push(
      <Item
        key={index}
        imgPath={imgPath}
        x={generateRandomCoordinates(x2, x1)}
        y={generateRandomCoordinates(y2, y1)}
        id={index}
        name={name}
      />
    );
  }
  return items;
}
