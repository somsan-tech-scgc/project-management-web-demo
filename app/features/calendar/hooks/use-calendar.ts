import { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  isSameDay,
  startOfDay,
  endOfDay,
} from 'date-fns';
import type { Meeting, ViewMode } from '../types';

export function useCalendar(meetings: Meeting[]) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const navigatePrevious = () => {
    if (viewMode === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const navigateNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getMeetingsForDate = (date: Date): Meeting[] => {
    return meetings.filter((meeting) =>
      isSameDay(meeting.startTime, date)
    );
  };

  const getMeetingsInRange = (start: Date, end: Date): Meeting[] => {
    return meetings.filter(
      (meeting) =>
        meeting.startTime >= start && meeting.startTime <= end
    );
  };

  const getCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = calendarStart;

    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  return {
    currentDate,
    viewMode,
    selectedMeeting,
    setViewMode,
    setSelectedMeeting,
    navigatePrevious,
    navigateNext,
    goToToday,
    getMeetingsForDate,
    getMeetingsInRange,
    getCalendarDays,
  };
}
