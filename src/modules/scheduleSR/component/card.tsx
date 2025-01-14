// types
import { srSchedule } from "@/types/dashboard";

// utils
import { formatDate } from "@/utils/formatter";

interface CardProps {
  allSRscheduleData: srSchedule[];
}

const Card: React.FC<CardProps> = ({ allSRscheduleData }) => {

  const groupedSchedules = allSRscheduleData.reduce(
    (group, schedule) => {
      const date = formatDate(new Date(schedule.date));

      if (!group[date]) {
        group[date] = [];
      }
      group[date].push(schedule);
      return group;
    },
    {} as { [key: string]: srSchedule[] }
  );

  const sortedDates = Object.keys(groupedSchedules).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="bg-background rounded-lg mt-10 p-3 border border-sidebar-border ml-4 w-96">
      <div className="">
        <img
          src="/assets/images/KKHLogo_transparent.svg"
          alt="KKH logo"
          className="w-32"
        />
      </div>

      <hr className="border-2 border-dashboard-active" />

      <div className="mt-3 max-h-96 overflow-y-auto h-96">
        {sortedDates.map((date, index) => (
          <div key={index} className="p-3  flex flex-col space-y-3">
            <div className="flex  items-center space-x-3  mt-2">
              <div>
                <img
                  src="/assets/images/calenderIcon.svg"
                  alt="calenderIcon"
                  className="w-6"
                />
              </div>
              <div className="font-bold text-2xs">{date}</div>
            </div>

            {groupedSchedules[date].map((schedule, index) => (
              <div key={index} className="flex flex-col space-y-7  ">
                <div className="flex justify-between space-x-4">
                  <div
                    className={`rounded-2xl text-badge-sessionText flex items-center px-2 p-2  ${
                      schedule.session === "AM"
                        ? "bg-dashboard-AM"
                        : "bg-dashboard-PM"
                    }`}
                  >
                    <p className="font-semibold text-3xs">
                      {schedule.session} Session
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-2xs">
                      {schedule.dcdScreener}
                    </p>
                    <p className="font-medium text-card-text text-3xs">
                      {schedule.activity}
                    </p>
                  </div>

                  <div className="flex-col space-y-1">
                    <div className=" bg-dashboard-room text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-3xs">
                      <p>{schedule.room}</p>
                    </div>

                    {schedule.srRoom && (
                      <div className=" bg-dashboard-active text-white font-semibold flex justify-center items-center rounded-md p-1 px-2 text-3xs">
                        <p>{schedule.srRoom}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;