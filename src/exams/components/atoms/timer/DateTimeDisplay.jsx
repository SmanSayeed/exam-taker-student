import { Card } from "@/components/ui/card";

const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
        <Card className={`${isDanger ? 'countdown danger' : 'countdown'} flex flex-col items-center justify-center w-[6rem] h-[6rem] relative `}>
            <p className="absolute top-2 font-light  text-5xl">{value}</p>
            <span className="absolute bottom-0 py-[.15rem] font-semibold text-white dark:text-black bg-black dark:bg-gray-200 w-full rounded-b-md " >{type}</span>
        </Card>
    );
};

export default DateTimeDisplay;
