import CountdownTimer from "../components/atoms/timer/CountdownTimer";

export default function HomPage() {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div className="mt-14">
      <CountdownTimer targetDate={dateTimeAfterThreeDays} />
    </div>
  )
}
