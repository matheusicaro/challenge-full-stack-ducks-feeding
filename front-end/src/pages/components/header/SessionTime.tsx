import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';

type Props = {
  time: number;
  start: boolean;
  handleTimeExpired: () => void;
};

/**
 * Conometer preview component for timer as received props as timestamp
 *
 */
const SessionTime: React.FC<Props> = (props) => {
  const [time, setTime] = useState(props.time);
  const [isRunning, setIsRunning] = useState(props.time > 0);

  const startTimer = () => {
    props.start && setIsRunning(true);
  };

  const updateTimeStateWithPropsValue = () => {
    setTime(props.time);
  };

  const decreaseTheTimer = () => {
    let interval: any = null;

    isRunning ? (interval = setInterval(() => setTime((prevTime) => prevTime - 1000), 1000)) : clearInterval(interval);

    return () => clearInterval(interval);
  };

  useEffect(decreaseTheTimer, [isRunning]);

  useEffect(startTimer, [props.start]);

  useEffect(updateTimeStateWithPropsValue, [props.time]);

  if (new Date().getTime() >= time) props.handleTimeExpired();

  return (
    <Typography id="header-session-time" variant="body2" component="span">
      your session will expire on <b>{convertTimeToTimerFormat(new Date(time), time)}</b>
    </Typography>
  );
};

export default SessionTime;

/**
 * Function responsible for decimal values in standard 2-digits format with zeros
 *
 * @param  {number} number - example input [ 3, 8, -1 ]
 * @returns {string} returns [ 03, 08, 00 ]
 */
const getDecimalFormat = (number: number) => {
  const positive = Math.abs(number).toString() || '00';
  return positive.length === 2 ? positive : `0${positive}`;
};

/**
 * Function responsible for decimal values in standard 8-digit format
 *
 * @param  {number} number - example input 65343542132
 * @returns {string} returns 03:45:05
 */
const convertTimeToTimerFormat = (future: Date, time: number) => {
  const date = new Date();

  const hour = getDecimalFormat(future.getHours() - date.getHours());
  const min = getDecimalFormat(future.getMinutes() - date.getMinutes());
  const sec = getDecimalFormat(parseInt(((time % 60000) / 1000).toFixed(0)));

  return `${hour}:${min}:${sec}`;
};
