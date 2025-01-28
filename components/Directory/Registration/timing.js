import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./timing.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddBusinessUserTimingsMutation,
  useGetBusinessUserTimingsQuery,
} from "@/store/apiServices/apiServices";
import {
  setTimingsData,
  saveTimingsStart,
  saveTimingsSuccess,
  saveTimingsFailed,
} from "@/store/timings";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Timings = ({ onNextClick, onBackClick }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const timingsData = useSelector((state) => state.timings.data);

  // State for managing the open/closed state of each day
  const [isOpen, setIsOpen] = useState(Array(7).fill(false));
  // State for storing the opening and closing times for each day
  const [times, setTimes] = useState({});

  // State for tracking the selected day for "Set same time for all" button
  const [selectedDay, setSelectedDay] = useState(null);

  // State for controlling the visibility of "Set same time for all" button
  const [showSetSameTimeForAll, setShowSetSameTimeForAll] = useState(false);

  const authenticatedUserId = useSelector(
    (state) => state.authentication.userId
  );
  const isNoonTime = (time) => time === "12:00 Noon";
  const [addBusinessUserTimingsMutation] = useAddBusinessUserTimingsMutation();

  const { data, isLoading, isError } =
    useGetBusinessUserTimingsQuery(authenticatedUserId);

  useEffect(() => {
    if (!isLoading && !isError && data && data.length > 0) {
      const fetchedTimingsData = data[0];

      const timingId = fetchedTimingsData.timingID;

      if (timingId) {
        dispatch(setTimingsData(fetchedTimingsData));
      } else {
        dispatch(setTimingsData(data));
      }
    } else if (isError) {
    }
  }, [data, isLoading, isError, dispatch]);

  useEffect(() => {
    if (timingsData) {
      const timingsState = {};
      for (const day of daysOfWeek) {
        const timingData = timingsData[day.toLowerCase()];
        if (timingData && timingData !== "Closed") {
          const [startTime, endTime] = timingData.split(" - ");
          timingsState[day] = { openingTime: startTime, closingTime: endTime };
        } else {
          timingsState[day] = null;
        }
      }
      setTimes(timingsState);
      setIsOpen(daysOfWeek.map((day) => !!timingsState[day]));
      setSelectedDay(null);
      setShowSetSameTimeForAll(false);
    }
  }, [timingsData]);

  // Function to handle the toggle of opening/closing times for a day
  const handleToggle = (index) => {
    const updatedOpenState = [...isOpen];
    updatedOpenState[index] = !isOpen[index];
    setIsOpen(updatedOpenState);

    if (!isOpen[index]) {
      setSelectedDay(index);
    } else {
      setSelectedDay(null);
    }
  };

  const previousTimingsData = useSelector((state) => state.timings.data);

  const isTimeInvalid = useCallback((openingTime, closingTime) => {
    // Check if closing time is less than or equal to the opening time
    const format = "hh:mm A";
    if (
      closingTime &&
      openingTime &&
      new Date(`2000-01-01 ${closingTime}`).getTime() <=
        new Date(`2000-01-01 ${openingTime}`).getTime()
    ) {
      return true;
    }

    // Check if opening time and closing time are the same
    if (closingTime === openingTime) {
      return true;
    }

    return false;
  }, []);

  // Function to handle the "Next" button click
  const onFrameContainer18Click = useCallback(async () => {
    let hasError = false;
    const errors = {};

    daysOfWeek.forEach((day) => {
      if (isOpen[daysOfWeek.indexOf(day)]) {
        const { openingTime, closingTime } = times[day];

        if (isTimeInvalid(openingTime, closingTime)) {
          hasError = true;
          errors[day] = true;
        }

        if (isNoonTime(openingTime) && closingTime && isAMTime(closingTime)) {
          hasError = true;
          errors[day] = true;
        }
      }
    });

    if (hasError) {
      const errorDays = Object.keys(errors).join(", ");
      swal.fire(
        "Error!",
        `Invalid timings for ${errorDays}. Please check the opening and closing times.`,
        "error"
      );
      return;
    }

    dispatch(saveTimingsStart());

    const _timingsData = daysOfWeek.reduce((data, day, index) => {
      if (isOpen[index]) {
        const startTime = times[day]?.openingTime || "";
        const endTime = times[day]?.closingTime || "";
        data[day.toLowerCase()] = `${startTime} - ${endTime}`;
      } else {
        data[day.toLowerCase()] = "Closed";
      }
      return data;
    }, {});

    const userId = authenticatedUserId;
    const timeId = timingsData.timingID;

    try {
      const requestBody = {
        ..._timingsData,
        userid: userId,
        timingID: timeId,
      };

      const response = await addBusinessUserTimingsMutation(requestBody);
      if (response.data) {
        dispatch(saveTimingsSuccess());
        dispatch(setTimingsData(response.data));
        onNextClick();
        window.scrollTo(0, 0);

        swal.fire("Success!", "Timings saved successfully!", "success");
      }
      dispatch(setTimingsData(requestBody));
    } catch (error) {
      dispatch(saveTimingsFailed(error));
    }

    if (JSON.stringify(_timingsData) === JSON.stringify(previousTimingsData)) {
      swal.fire("No Changes", "Timings data remains the same", "warning");
    }
  }, [
    addBusinessUserTimingsMutation,
    dispatch,
    isOpen,
    times,
    onNextClick,
    authenticatedUserId,
    isTimeInvalid,
  ]);

  const handleBackClick = useCallback(() => {
    onBackClick();
    window.scrollTo(0, 0);
  }, [onBackClick]);

  // Function to handle the change of opening/closing time for a specific day
  const handleTimeChange = (day, timeType, event) => {
    const updatedTimes = { ...times };
    updatedTimes[day] = {
      ...updatedTimes[day],
      [timeType]: event.target.value,
    };

    // Validate if opening time is 12:00 Noon (PM)
    if (timeType === "openingTime" && isNoonTime(event.target.value)) {
      // Set the closing time to null to avoid selecting AM times for closing
      updatedTimes[day].closingTime = null;
    }

    // Validate if closing time is 12:00 PM
    if (timeType === "closingTime" && isNoonTime(event.target.value)) {
      // Set the opening time to null to avoid selecting 12:00 Noon for opening
      updatedTimes[day].openingTime = null;
    }

    // Prevent selecting AM times for closing when opening is 12:00 Noon
    if (
      timeType === "closingTime" &&
      isNoonTime(updatedTimes[day].openingTime) &&
      event.target.value &&
      new Date(`2000-01-01 ${event.target.value}`).getTime() <=
        new Date(`2000-01-01 12:00 PM`).getTime()
    ) {
      // Set the closing time to null to avoid selecting AM times for closing
      updatedTimes[day].closingTime = null;
    }

    setTimes(updatedTimes);
    setSelectedDay(daysOfWeek.indexOf(day));
    setShowSetSameTimeForAll(true);
  };

  // Function to set the same opening/closing time for all days
  const handleSetSameTimeForAll = (index) => {
    const selectedDay = daysOfWeek[index];
    const selectedTime = times[selectedDay];

    const updatedTimes = {};
    daysOfWeek.forEach((day) => {
      updatedTimes[day] = selectedTime;
    });

    setTimes(updatedTimes);
    setIsOpen(Array(7).fill(true));
    setSelectedDay(null);
  };

  return (
    <div className={styles.timings}>
      <main className={styles.frameParent}>
        {/* Timings header */}
        <div className={styles.timingsWrapper}>
          <div className={styles.timings1}>
            <span>Timings</span>
            <span className={styles.span}>*</span>
          </div>
        </div>

        {/* Instruction for showing business working hours */}
        <div className={styles.showYourBusiness}>
          Show your business working hours
        </div>

        {/* List of days and their timings */}
        <ul className={styles.component102Parent}>
          {daysOfWeek.map((day, index) => {
            return (
              <li
                className={`${styles.component102} ${
                  isOpen[index] ? styles.openWeek : ""
                }`}
                key={index}
              >
                {/* Toggle switch for opening/closing times */}
                <div className={styles.component101}>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={isOpen[index]}
                      onChange={() => handleToggle(index)}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>

                {/* Day of the week */}
                <div
                  className={`${styles.dayOfWeek} ${
                    isOpen[index] ? styles.boldWeek : ""
                  }`}
                >
                  {day}
                </div>

                {/* Time picker for opening/closing times */}

                {isOpen[index] && (
                  <div className={styles.timePicker}>
                    <div>
                      <select
                        value={times[day]?.openingTime || ""}
                        onChange={(event) =>
                          handleTimeChange(day, "openingTime", event)
                        }
                        className={styles.timeDropdown}
                      >
                        <option
                          disabled
                          value=""
                          style={{
                            color:
                              "var(--foundation-neutral-neutral-200, #979696)",
                          }}
                        >
                          Select Time
                        </option>
                        {/* Generating options for opening time */}
                        {Array.from({ length: 24 * 2 }, (_, i) => {
                          const hour = Math.floor(i / 2) % 12 || 12;
                          const minutes = i % 2 === 0 ? "00" : "30";
                          const period = Math.floor(i / 24) === 0 ? "AM" : "PM";

                          // Ignore 12:30 AM
                          if (
                            hour === 12 &&
                            minutes === "30" &&
                            period === "AM"
                          ) {
                            return null;
                          }

                          // Replace 12:00 AM with 12:00 Noon
                          const timeLabel =
                            hour === 12 && minutes === "00" && period === "AM"
                              ? "12:00 Noon"
                              : `${hour
                                  .toString()
                                  .padStart(2, "0")}:${minutes} ${period}`;

                          return (
                            <option
                              key={i}
                              value={`${hour
                                .toString()
                                .padStart(2, "0")}:${minutes} ${period}`}
                              className={styles.timePickerOptions}
                            >
                              {timeLabel}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <span>To:</span>
                      <select
                        value={times[day]?.closingTime || ""}
                        onChange={(event) =>
                          handleTimeChange(day, "closingTime", event)
                        }
                        className={styles.timeDropdown}
                      >
                        <option
                          disabled
                          value=""
                          style={{
                            color:
                              "var(--foundation-neutral-neutral-200, #979696)",
                          }}
                        >
                          Select Time
                        </option>
                        {/* Generating options for closing time */}
                        {Array.from({ length: 24 * 2 }, (_, i) => {
                          const hour = Math.floor(i / 2) % 12 || 12;
                          const minutes = i % 2 === 0 ? "00" : "30";
                          const period = Math.floor(i / 24) === 0 ? "AM" : "PM";

                          // Ignore 12:30 AM
                          if (
                            hour === 12 &&
                            minutes === "30" &&
                            period === "AM"
                          ) {
                            return null;
                          }

                          // Replace 12:00 AM with 12:00 Noon
                          const timeLabel =
                            hour === 12 && minutes === "00" && period === "AM"
                              ? "12:00 Noon"
                              : `${hour
                                  .toString()
                                  .padStart(2, "0")}:${minutes} ${period}`;

                          // Check if the opening time is 12:00 Noon (PM)
                          if (isNoonTime(times[day]?.openingTime)) {
                            // Show only PM options for closing time
                            if (period === "PM") {
                              return (
                                <option
                                  key={i}
                                  value={`${hour
                                    .toString()
                                    .padStart(2, "0")}:${minutes} ${period}`}
                                  className={styles.timePickerOptions}
                                >
                                  {timeLabel}
                                </option>
                              );
                            }
                          } else {
                            // Show both AM and PM options for closing time
                            return (
                              <option
                                key={i}
                                value={`${hour
                                  .toString()
                                  .padStart(2, "0")}:${minutes} ${period}`}
                                className={styles.timePickerOptions}
                              >
                                {timeLabel}
                              </option>
                            );
                          }
                          return null; // Exclude the option if it doesn't meet the conditions
                        })}
                      </select>
                    </div>
                  </div>
                )}

                {/* "Set same time for all" button */}
                {isOpen[index] && selectedDay === index && (
                  <div className={styles.setSameNameForAll}>
                    <p
                      onClick={() => handleSetSameTimeForAll(index)}
                      className={styles.setSameNameForAllButton}
                    >
                      Set same time for all
                    </p>
                  </div>
                )}

                {/* Display "closed" for closed days */}
                {!isOpen[index] && (
                  <div className={styles.closed}>(closed)</div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Next and Back links */}
        <div className={styles.nextWrapper} onClick={onFrameContainer18Click}>
          <b className={styles.next}>Next</b>
        </div>
        <div className={styles.backWrapper} onClick={handleBackClick}>
          <b className={styles.next}>Back</b>
        </div>
      </main>

      {/* Top navigation */}
      <div className={styles.component1017}>
        <div className={styles.businessInfoParent}>
          <div className={styles.businessInfo}>Business Info</div>
          <div className={styles.businessInfo}>Categories & services</div>
          <div className={styles.businessInfo}>Timings</div>
          <div className={styles.photos}>Photos</div>
        </div>
        <div className={styles.frameDiv}>
          <div className={styles.frameChild} />
        </div>
      </div>
    </div>
  );
};
export default Timings;
