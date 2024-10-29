import CountdownTimer from "../components/atoms/timer/CountdownTimer";

export default function HomPage() {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div className="mt-14 w-[95%] md:w-[70%] flex flex-col items-center justify-center mx-auto">
      <CountdownTimer targetDate={dateTimeAfterThreeDays} />

      <div className="text-center mt-12 ">
        <h1>এই পেজটি শুধুমাত্র  ডেমো পরীক্ষার জন্য তৈরি। পুরো অভিজ্ঞতা পেতে একাউন্ট খুলে লগ ইন করো, আর নিজের মতো করে প্র্যাকটিস পরীক্ষা দিয়ে দেখো! যদি কিছু শেয়ার করতে চাও—কোনো মতামত, পরামর্শ বা ভুল ধরিয়ে দিতে চাও—তাহলে এখানে মেসেজ পাঠিয়ে আমাদের জানাও। তোমার মূল্যবান মতামতের ওপর ভিত্তি করেই আমরা ভবিষ্যতে আরও প্রশ্ন এবং নতুন ফিচার নিয়ে আসার পরিকল্পনা করছি।</h1>

        <p className="mt-4 font-semibold ">তোমার প্রতিটি পদক্ষেপে রইল অন্তরের গভীর শুভকামনা! তোমার যাত্রা সফল হোক। <br /> শুভ কামনা রইলো!</p>
      </div>

    </div>
  )
}
