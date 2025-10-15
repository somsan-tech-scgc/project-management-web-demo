'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarHeader } from '@/features/calendar/components/calendar-header';
import { MonthView } from '@/features/calendar/components/month-view';
import { WeekView } from '@/features/calendar/components/week-view';
import { DayView } from '@/features/calendar/components/day-view';
import { MeetingDetailModal } from '@/features/calendar/components/meeting-detail-modal';
import { NewMeetingModal } from '@/features/calendar/components/new-meeting-modal';
import { useCalendar } from '@/features/calendar/hooks/use-calendar';
import { meetingService } from '@/features/calendar/services/meeting-service';
import type { Meeting } from '@/features/calendar/types';

export default function CalendarPage() {
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);
  const [selectedMeetingForDetail, setSelectedMeetingForDetail] = useState<Meeting | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    currentDate,
    viewMode,
    setViewMode,
    navigatePrevious,
    navigateNext,
    getMeetingsForDate,
    getCalendarDays,
  } = useCalendar(meetings);

  const days = getCalendarDays();

  // Fetch meetings on component mount
  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      setIsLoading(true);
      const data = await meetingService.getAllMeetings();
      setMeetings(data);
    } catch (error) {
      console.error('Failed to load meetings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = (meeting: Meeting) => {
    setSelectedMeetingForDetail(meeting);
  };

  const handleNewReview = () => {
    setIsNewMeetingOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review Calendar</h1>
        <p className="text-gray-600 mb-4">
          Manage all project reviews in one place.
        </p>
        <Button onClick={handleNewReview} className="bg-blue-500 hover:bg-blue-600">
          New Review
        </Button>
      </div>

      {/* Calendar controls */}
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onPrevious={navigatePrevious}
        onNext={navigateNext}
        onViewModeChange={setViewMode}
      />

      {/* Calendar view */}
      {viewMode === 'month' && (
        <MonthView
          currentDate={currentDate}
          days={days}
          getMeetingsForDate={getMeetingsForDate}
          onEventClick={handleEventClick}
        />
      )}

      {viewMode === 'week' && (
        <WeekView
          currentDate={currentDate}
          getMeetingsForDate={getMeetingsForDate}
          onEventClick={handleEventClick}
        />
      )}

      {viewMode === 'day' && (
        <DayView
          currentDate={currentDate}
          getMeetingsForDate={getMeetingsForDate}
          onEventClick={handleEventClick}
        />
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12 text-gray-500">
          Loading meetings...
        </div>
      )}

      {/* Modals */}
      <NewMeetingModal
        open={isNewMeetingOpen}
        onClose={() => setIsNewMeetingOpen(false)}
        onSuccess={() => {
          // Refresh calendar data after creating a meeting
          loadMeetings();
        }}
      />

      <MeetingDetailModal
        meeting={selectedMeetingForDetail}
        open={!!selectedMeetingForDetail}
        onClose={() => setSelectedMeetingForDetail(null)}
      />
    </div>
  );
}
