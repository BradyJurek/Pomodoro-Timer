import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Timer from "./Timer"
import Controls from "./Controls"
import Play from "./Play"

function Pomodoro() {
  //Sets all of the usestates for the timer
  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [currentMode, setCurrentMode] = useState('Focusing')
  const [remainingTime, setRemainingTime] = useState(1500)
  const [controlsDisabled, setControlsDisabled] = useState(false)
  const [stopDisabled, setStopDisabled] = useState(true)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isStopped, setIsStopped] = useState(true)
  
  const alarmSound = new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`)
//Executes every second counting down one at a time. If remainingTime is under 0 a alarm will play and it will reset to the next state
  useInterval(() => {
     setRemainingTime(remainingTime - 1)
     if (remainingTime <= 0) {
      alarmSound.play()
      if (currentMode === "Focusing") {
        setCurrentMode("On Break") 
        setRemainingTime(breakTime * 60)
      } else if (currentMode === "On Break") {
        setCurrentMode("Focusing")
        setRemainingTime(focusTime * 60)
      }
     }
   },
   isTimerRunning ? 1000 : null
   )

   const handleReset = () => {
    setCurrentMode("Focusing")
    setFocusTime(25)
    setBreakTime(5)
    setRemainingTime(1500)
    setStopDisabled(true)
    setIsTimerRunning(false)
    setIsStopped(true)
    setControlsDisabled(false)
  }

  const playPause = () => {
    setStopDisabled(false)
    setIsStopped(false)
    setIsTimerRunning((current) => !current)
    setControlsDisabled(true)
  }

  
  //Returns the 3 components and the alarm audio
  return (
    <>
      <Controls focusTime={focusTime} setFocusTime={setFocusTime} setRemainingTime={setRemainingTime} breakTime={breakTime} setBreakTime={setBreakTime} controlsDisabled={controlsDisabled} />
      <Play playPause={playPause} classNames={classNames} isTimerRunning={isTimerRunning} handleReset={handleReset} stopDisabled={stopDisabled} />
      <Timer focusTime={focusTime} breakTime={breakTime} remainingTime={remainingTime} isTimerRunning={isTimerRunning} isStopped={isStopped} currentMode={currentMode} />
      <audio src={alarmSound} type="audio/mp3"></audio>
    </>
  )

}

export default Pomodoro;
