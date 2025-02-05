// external library
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


// types
import { LeaveDate } from "@/types/srList";

// services
import { getSRSchedule } from "@/services/dashboard";
import { getSRData } from "@/services/srList";
import { getSeniorDoctorData } from "@/services/seniorDoctorList";

// component
import Calendar from "./component/calendar";

const Dashboard = () => {

  const [scheduleData, setScheduleData] = useState([]);
  const [_SRData, setSRData] = useState([]);

  const [callDates, setCallDates] = useState<string[]>([]);
  const [leaveDates, setLeaveDates] = useState<LeaveDate[]>([]);

  const [_latestPostingPeriod, setLatestPostingPeriod] = useState<any>(null);
  const [showStats, setShowStats] = useState(false);


  const calendarRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!calendarRef.current) return;

    const canvas = await html2canvas(calendarRef.current, { scale: 4 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Calendar-Schedule.pdf");
  };


  // statistics: session counts for each supervising doctor
  const doctorSessionStats = scheduleData.reduce(
    (total: Record<string, number>, entry: any) => {
      const doctor = entry.dcdScreener;
      total[doctor] = (total[doctor] || 0) + 1;
      return total;
    },
    {}
  );

  // statistics: activity
  const activitySessionStats = scheduleData.reduce(
    (total: Record<string, number>, entry: any) => {
      const activity = entry.activity;
      total[activity] = (total[activity] || 0) + 1;
      return total;
    },
    {}
  );

  // fetch srSchedule
  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await getSRSchedule();
      setScheduleData(data);
    };

    fetchSchedule();
  }, []);

  // fetch sr data information
  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSRData();

      // find the entry with the latest `endDate`
      const latestSR = data.reduce((latest: any, current: any) => {
        const latestEndDate = new Date(latest.postingPeriod.endDate);
        const currentEndDate = new Date(current.postingPeriod.endDate);
        return currentEndDate > latestEndDate ? current : latest;
      });

      setSRData(latestSR);
      setCallDates(latestSR.callDates);
      setLeaveDates(latestSR.leaveDates);
      setLatestPostingPeriod(latestSR.postingPeriod);
    };
    fetchSRData();
  }, []);

  // fetch all overseeing doctors
  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSeniorDoctorData();
      console.log(data);
    };

    fetchSRData();
  }, []);

  return (
    <div className="m-3 mt-0">
      <div className="flex justify-between">
        <div className=" mb-3 space-y-1">
          <h1 className="font-bold text-xl">
            Senior Resident's Calendar Schedule
          </h1>
          <h6 className="text-xs text-dashboard-text">
            A Calendar Overview for Senior Resident Commitments
          </h6>
        </div>

        <div className="flex space-x-4">
          <div>
            <button 
            onClick={handleExportPDF}
            className="text-xs text-black rounded p-1.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center">
              <img
                src="/assets/images/export.svg"
                alt="Export Logo"
                className="rounded-md cursor-pointer w-5"
              />
              <div>
                <p>Export</p>
              </div>
            </button>
          </div>

          <div>
            <button
              onClick={() => setShowStats((prev) => !prev)}
              className="text-xs text-black rounded p-2 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center"
            >
              <img
                src="/assets/images/button/statistics.png"
                alt="Statistics Logo"
                className=" cursor-pointer w-4"
              />
              <div>
                <p>Statistics</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      {showStats && (
        <div
          className={`transition-all duration-500 ease-in-out absolute w-52 left-0 top-20  ${
            showStats ? "opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gray-100 p-4 rounded shadow max-h-[700px] overflow-y-auto">
            <div className="flex items-center space-x-2 ">
              <img
                src="/assets/images/button/statistics.png"
                alt="Statistics Logo"
                className="rounded-md cursor-pointer w-5"
              />
              <h2 className="font-semibold text-xs tracking-wide">
                Statistics
              </h2>
            </div>

            <hr className="border-b-1 border-black my-1" />

            <div className="mt-4">
              <div className="mt-2 space-y-2">
                <h2 className="font-semibold text-2xs">Observation Session</h2>
                {Object.entries(activitySessionStats).map(
                  ([activity, count]) => (
                    <div
                      key={activity}
                      className="flex justify-between bg-white p-2 rounded shadow-sm"
                    >
                      <span className="font-medium text-2xs text-gray-700">
                        {activity}
                      </span>
                      <span className="font-bold text-2xs text-indigo-600">
                        {count} session
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="mt-2 space-y-2">
                <h2 className="font-semibold text-2xs">
                  Doctor Session Breakdown
                </h2>
                {Object.entries(doctorSessionStats).map(([doctor, count]) => (
                  <div
                    key={doctor}
                    className="flex justify-between bg-white p-2 rounded shadow-sm"
                  >
                    <span className="font-medium text-2xs text-gray-700">
                      {doctor}
                    </span>
                    <span className="font-bold text-2xs text-indigo-600">
                      {count} session
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end items-end">
              <button
                onClick={() => setShowStats((prev) => !prev)}
                className="text-xs text-black rounded px-1.5 py-0.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center"
              >
                <div>
                  <p className="text-2xs">Close</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div ref={calendarRef}>
        <Calendar
          scheduleData={scheduleData}
          callDates={callDates}
          leaveDates={leaveDates}
          // latestPostingPeriod={latestPostingPeriod}
        />
      </div>

      
    </div>
  );
};

export default Dashboard;
