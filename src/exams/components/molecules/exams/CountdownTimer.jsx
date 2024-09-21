import { useEffect, useState } from "react";

function CountdownTimer({ minutes }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <h1 className="font-semibold">Time Left:  {formatTime()}</h1>
    </div>
  );
}
export default CountdownTimer;