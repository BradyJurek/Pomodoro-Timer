import React from 'react'
import { minutesToDuration } from '../utils/duration'

function Controls({ focusTime, setFocusTime, breakTime, setBreakTime, setRemainingTime, controlsDisabled }) {
    //Multiple different functions to increase or decrease times
    const increaseFocusTime = () => {
        setFocusTime((time) => Math.min(60, time + 5))
        setRemainingTime((time) => Math.min(3600, time + 5 * 60))
    }

    const decreaseFocusTime = () => {
        setFocusTime((time) => Math.max(5, time - 5))
        setRemainingTime((time) => Math.max(300, time - 5 * 60))
    }

    const increaseBreakTime = () => {
        setBreakTime((time) => Math.min(15, time + 1))
    }

    const decreaseBreakTime = () => {
        setBreakTime((time) => Math.max(1, time - 1))
    }

    return (
        <div className="row">
            <div className="col">
                <div className="input-group input-group-lg">
                    <span className="input-group-text" data-testid="duration-focus">
                        Focus Duration: {minutesToDuration(focusTime)}
                    </span>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" data-testid="decrease-focus" onClick={decreaseFocusTime} disabled={controlsDisabled}>
                            <span className="oi oi-minus" />
                        </button>
                        <button type="button" className="btn btn-secondary" data-testid="increase-focus" onClick={increaseFocusTime} disabled={controlsDisabled}>
                            <span className="oi oi-plus" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="float-right">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text" data-testid="duration-break">
                            Break Duration: {minutesToDuration(breakTime)}
                        </span>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" data-testid="decrease-break" onClick={decreaseBreakTime} disabled={controlsDisabled}>
                                <span className="oi oi-minus" />
                            </button>
                            <button type="button" className="btn btn-secondary" data-testid="increase-break" onClick={increaseBreakTime} disabled={controlsDisabled}>
                                <span className="oi oi-plus" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Controls