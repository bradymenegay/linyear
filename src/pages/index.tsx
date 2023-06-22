import { setConfig } from "next/config";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const InputField = ({ config }) => {
  let slug = config.label.toString().toLowerCase().replace(" ", "-");

  let wrapperStyle = "grid grid-cols-2 text-right items-center";
  let inputStyle = "m-2 p-1 text-sm bg-white border border-black rounded-sm";

  useEffect(() => {
    config.options ? config.setStyle(config.options[0].value) : null;
  }, []);

  return (
    <label htmlFor={slug} className={wrapperStyle}>
      <span>{config.label + ": "}</span>

      {config.type === "select" && (
        <select
          name={slug}
          className={inputStyle}
          onChange={(e) => config.setStyle(e.target.value)}
        >
          {config.options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.name}
            </option>
          ))}
        </select>
      )}

      {config.type === "date" && (
        <input
          name={slug}
          type={config.type}
          className={inputStyle}
          value={config.getState.toISOString().split("T")[0]}
          min={new Date().getFullYear() + "-01-01"}
          onChange={(e) => config.setState(new Date(e.target.value))}
        />
      )}
    </label>
  );
};

const DayCell = ({ children, config }) => {
  let styles = "aspect-[0.63] p-1 flex m-[1px]";

  if (config && config.getStyle) {
    styles += " " + config.getStyle;
  } else {
    styles += " " + "border border-black";
  }

  return <div className={styles}>{children}</div>;
};

const Home = () => {
  const [dayStyle, setDayStyle] = useState("");
  const [monthStyle, setMonthStyle] = useState("");
  const [satStyle, setSatStyle] = useState("");
  const [sunStyle, setSunStyle] = useState("");

  const [orientation, setOrientation] = useState("");
  const [alignment, setAlignment] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), 0)
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear() + 1, -1)
  );

  const config = {
    month: {
      getStyle: monthStyle,
      setStyle: setMonthStyle,
      label: "Month",
      type: "select",
      options: [
        {
          name: "Gray",
          value: "bg-gray-100 font-bold",
        },
        {
          name: "Light Gray",
          value: "bg-gray-50 font-bold",
        },
        {
          name: "Light Red",
          value: "bg-red-50 font-bold",
        },
      ],
    },
    day: {
      getStyle: dayStyle,
      setStyle: setDayStyle,
      label: "Day",
      type: "select",
      options: [
        {
          name: "White",
          value: "bg-white",
        },
        {
          name: "Light Gray",
          value: "bg-gray-50",
        },
      ],
    },
    saturday: {
      getStyle: satStyle,
      setStyle: setSatStyle,
      label: "Saturday",
      type: "select",
      options: [
        {
          name: "Yellow",
          value: "bg-amber-50",
        },
        {
          name: "Green",
          value: "bg-green-50",
        },
        {
          name: "Blue",
          value: "bg-blue-50",
        },
        {
          name: "Gray",
          value: "bg-gray-100",
        },
      ],
    },
    sunday: {
      getStyle: sunStyle,
      setStyle: setSunStyle,
      label: "Sunday",
      type: "select",
      options: [
        {
          name: "Yellow",
          value: "bg-orange-100",
        },
        {
          name: "Green",
          value: "bg-green-100",
        },
        {
          name: "Blue",
          value: "bg-blue-100",
        },
        {
          name: "Gray",
          value: "bg-gray-200",
        },
      ],
    },
    startDate: {
      getState: startDate,
      setState: setStartDate,
      label: "Start Date",
      type: "date",
    },
    endDate: {
      getState: endDate,
      setState: setEndDate,
      label: "End Date",
      type: "date",
    },
    orientation: {
      getStyle: orientation,
      setStyle: setOrientation,
      label: "Orientation",
      type: "select",
      options: [
        {
          name: "Portrait",
          value: "",
        },
        {
          name: "Landscape",
          value: "",
        },
      ],
    },
    alignment: {
      getStyle: alignment,
      setStyle: setAlignment,
      label: "Alignment",
      type: "select",
      options: [
        {
          name: "Day of Month",
          value: "",
        },
        {
          name: "Week of Month",
          value: "",
        },
      ],
    },
  };

  const calendar = [];
  for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
    let daysInMonth = new Date(2022, monthIdx + 1, 0).getDate();
    let monthName = new Date(2022, monthIdx).toLocaleString("default", {
      month: "short",
    });

    let dayArray = [];
    for (let dayIdx = 1; dayIdx <= daysInMonth; dayIdx++) {
      let day = new Date(2022, monthIdx, dayIdx);
      let dayName = day.toLocaleString("default", { weekday: "short" });
      let style =
        day.getDay() === 5
          ? config.saturday
          : day.getDay() === 6
          ? config.sunday
          : config.day;

      dayArray.push(
        <DayCell config={style} key={monthIdx + "-" + dayIdx}>
          {dayName}
        </DayCell>
      );
    }

    calendar.push(
      <div key={monthIdx} className="grid grid-cols-landscapeCal text-[.55rem]">
        <DayCell config={config.month} key={monthIdx}>
          {monthName}
        </DayCell>
        {dayArray}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Linyear</title>
        <meta name="description" content="Linear Calendar Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-4 lg:p-10 mx-auto grid gap-y-12 grid-cols-4 lg:grid-cols-8 max-w-screen-2xl print:max-w-auto print:p-0">
        <div className="col-span-2 print:hidden">
          <h1 className="text-2xl underline text-center">Layout</h1>
          <InputField config={config.startDate} />
          <InputField config={config.endDate} />
          <InputField config={config.orientation} />
          <InputField config={config.alignment} />
        </div>

        <div className="col-span-2 print:hidden">
          <h1 className="text-2xl underline text-center">Styles</h1>
          <InputField config={config.month} />
          <InputField config={config.day} />
          <InputField config={config.saturday} />
          <InputField config={config.sunday} />
        </div>

        <div className="col-span-4 grid grid-cols-4 print:hidden">
          <DayCell config={config.month}>Month Style</DayCell>
          <DayCell config={config.day}>Day Style</DayCell>
          <DayCell config={config.saturday}>Saturday Style</DayCell>
          <DayCell config={config.sunday}>Sunday Style</DayCell>
        </div>

        <div className="col-span-full p-[1px] min-w-[1000px] overflow-x-auto bg-gray-200">
          <h1>
            {(startDate.getMonth() + 1).toLocaleString("default", {month: "long"}) +
              "/" +
              startDate.getFullYear() +
              " - " +
              (endDate.getMonth() + 1).toLocaleString("default", {
                month: "long",
              }) +
              "/" +
              endDate.getFullYear()}
          </h1>
          {calendar}
        </div>
      </div>
    </>
  );
};

export default Home;
