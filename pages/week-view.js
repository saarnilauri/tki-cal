import Head from "next/head";
import axios from "axios";
import { getFromCache, setInCache } from "@components/cache";
import {
  format,
  startOfWeek,
  endOfWeek,
  getDay,
  subDays,
  addDays,
} from "date-fns";
import DateView from "@components/dateTime";

async function getEvents() {
  const apiKey = process.env.GOOGLE_CAL_API_KEY;
  const calendarId = process.env.GOOGLE_CAL_ID;
  const today = new Date();

  // Calculate the start and end of the current week
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const timeMin = weekStart.toISOString();
  const timeMax = weekEnd.toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId
  )}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}`;

  try {
    const response = await axios.get(url);
    const events = response.data.items;
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function orderByStartAscending(array) {
  return array.sort((a, b) => {
    const dateA = new Date(a.start.dateTime);
    const dateB = new Date(b.start.dateTime);

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });
}

function filterObjectsWithRecurringEventId(array) {
  const recurringEventIds = new Set();

  // Create a set of unique recurringEventId values
  array.forEach((obj) => {
    if (obj.recurringEventId) {
      recurringEventIds.add(obj.recurringEventId);
    }
  });

  // Filter the array to include only objects with unique recurringEventId values or no recurringEventId
  const filteredArray = array.filter((obj) => {
    if (recurringEventIds.has(obj.id)) {
      //recurringEventIds.delete(obj.recurringEventId); // Remove the recurringEventId from the set
      return false; // Keep the first occurrence of this recurringEventId
    }
    return true; // Remove objects with duplicate recurringEventId
  });

  return filteredArray;
}

function getCurrentWeekDay(date) {
  // Get current date
  const now = new Date();

  const curDayNum = getDay(now);
  const dateDayNum = getDay(date);
  let sameDayCurrentWeek = now;
  if (curDayNum > dateDayNum) {
    sameDayCurrentWeek = subDays(now, curDayNum - dateDayNum);
  } else if (curDayNum < dateDayNum) {
    sameDayCurrentWeek = addDays(now, dateDayNum - curDayNum);
  }

  return sameDayCurrentWeek;
}

export async function getServerSideProps() {
  const cachedData = getFromCache("events");

  if (cachedData) {
    return {
        props: {
            events: cachedData,
        },
    };
  }

  const events = await getEvents();

  // Convert the date and time of recurring events to the current week
  let currentWeekEvents = events.map((event) => {
    const startDateTime = new Date(event.start.dateTime);
    const endDateTime = new Date(event.end.dateTime);
    //const today = new Date();
    // Check if the event is within the current week
    if (startDateTime <= startOfWeek(new Date())) {
      const currentWeekDate = getCurrentWeekDay(startDateTime);
      

      return {
        ...event,
        start: {
          dateTime: format(
            new Date(
              currentWeekDate.getFullYear(),
              currentWeekDate.getMonth(),
              currentWeekDate.getDate(),
              startDateTime.getHours(),
              startDateTime.getMinutes(),
              startDateTime.getSeconds()
            ),
            "yyyy-MM-dd'T'HH:mm:ssXXX"
          ),
          timeZone: event.start.timeZone,
        },
        end: {
          dateTime: format(
            new Date(
              currentWeekDate.getFullYear(),
              currentWeekDate.getMonth(),
              currentWeekDate.getDate(),
              endDateTime.getHours(),
              endDateTime.getMinutes(),
              endDateTime.getSeconds()
            ),
            "yyyy-MM-dd'T'HH:mm:ssXXX"
          ),
          timeZone: event.end.timeZone,
        },
      };
    }

    return event;
  });

  currentWeekEvents = filterObjectsWithRecurringEventId(currentWeekEvents);
  currentWeekEvents = orderByStartAscending(currentWeekEvents)
  console.log('NO cache');
  setInCache('events',   currentWeekEvents = orderByStartAscending(currentWeekEvents)
  );

  return {
    props: {
      events: currentWeekEvents,
    },
  };
}

export default function WeekView({ events }) {
  return (
    <div className="container">
      <Head>
        <title>Kalenteri</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id}>
              <div className="event-list__event">
                <div className="event-list__date-wrapper">
                  <DateView startDate={event.start.dateTime} />
                </div>
                <div className="event-list__info">
                  <h3 className="event-list__title">{event.summary}</h3>
                  <p className="event-list__content">{event.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
