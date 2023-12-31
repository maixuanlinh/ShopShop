import React, { useEffect, useState } from "react";

const Countdown = () => {
  const [timeLeft, setTimeleft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeleft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date("2023-08-15") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span className="text-[25px] text-[#0420BF]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );

  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className='"text-[red] text-[25px]'>Time's up!</span>
      )}
    </div>
  );
};

export default Countdown;
