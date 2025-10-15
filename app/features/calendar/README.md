# Calendar Feature

Google Calendar-like meeting calendar with Month, Week, and Day views.

## Features

- ✅ **Month View** - Overview with colored event blocks
- ✅ **Week View** - 7-day timeline with hourly time slots
- ✅ **Day View** - Detailed single-day schedule with current time indicator
- ✅ **Meeting Modals** - Create and view meeting details
- ✅ **Centralized Data Service** - Easy API integration

## Structure

```
features/calendar/
├── components/
│   ├── calendar-header.tsx      # Navigation & view toggle
│   ├── month-view.tsx            # Month calendar grid
│   ├── week-view.tsx             # Week timeline view
│   ├── day-view.tsx              # Day detailed view
│   ├── event-card.tsx            # Event display component
│   ├── view-toggle.tsx           # Month/Week/Day switcher
│   ├── meeting-detail-modal.tsx  # View meeting details
│   └── new-meeting-modal.tsx     # Create new meeting
├── hooks/
│   └── use-calendar.ts           # Calendar state & logic
├── services/
│   └── meeting-service.ts        # Data fetching layer
├── schemas/
│   └── meeting-schema.ts         # Zod validation
├── types.ts                       # TypeScript definitions
└── mock-data.ts                   # Sample data
```

## API Integration Guide

### Step 1: Update Meeting Service

Replace the mock implementations in `services/meeting-service.ts` with real API calls:

```typescript
import { $api } from '@/api/client';

export const meetingService = {
  getAllMeetings: async (): Promise<Meeting[]> => {
    const response = await $api.GET('/api/meetings');
    return response.data || [];
  },

  getMeetingsInRange: async (startDate: Date, endDate: Date): Promise<Meeting[]> => {
    const response = await $api.GET('/api/meetings', {
      params: {
        query: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
      },
    });
    return response.data || [];
  },

  getMeetingById: async (id: string): Promise<Meeting | null> => {
    const response = await $api.GET('/api/meetings/{id}', {
      params: { path: { id } },
    });
    return response.data || null;
  },

  createMeeting: async (meetingData: Omit<Meeting, 'id'>): Promise<Meeting> => {
    const response = await $api.POST('/api/meetings', {
      body: meetingData,
    });
    return response.data;
  },

  updateMeeting: async (id: string, meetingData: Partial<Meeting>): Promise<Meeting | null> => {
    const response = await $api.PUT('/api/meetings/{id}', {
      params: { path: { id } },
      body: meetingData,
    });
    return response.data || null;
  },

  deleteMeeting: async (id: string): Promise<boolean> => {
    await $api.DELETE('/api/meetings/{id}', {
      params: { path: { id } },
    });
    return true;
  },
};
```

### Step 2: Update API Types

Add meeting endpoints to your `app/api/types.ts`:

```typescript
export interface paths {
  '/api/meetings': {
    get: {
      parameters: {
        query?: {
          start?: string;
          end?: string;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': Meeting[];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          'application/json': Omit<Meeting, 'id'>;
        };
      };
      responses: {
        201: {
          content: {
            'application/json': Meeting;
          };
        };
      };
    };
  };
  '/api/meetings/{id}': {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': Meeting;
          };
        };
      };
    };
    put: {
      parameters: {
        path: {
          id: string;
        };
      };
      requestBody: {
        content: {
          'application/json': Partial<Meeting>;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': Meeting;
          };
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        204: {
          content: never;
        };
      };
    };
  };
}
```

### Step 3: No Changes Needed in Components

The calendar page already uses the service layer, so no changes are needed in:
- `routes/calendar/calendar-page.tsx`
- Any view components (MonthView, WeekView, DayView)
- Modal components

The calendar will automatically use the real API once the service is updated!

## Usage

### Basic Usage

```typescript
import { CalendarPage } from '@/routes/calendar/calendar-page';

// The component handles everything internally
<CalendarPage />
```

### With Custom Data Source

If you need to use a different data source:

```typescript
import { useCalendar } from '@/features/calendar/hooks/use-calendar';
import { MonthView } from '@/features/calendar/components/month-view';

const customMeetings = [...]; // Your meetings

function CustomCalendar() {
  const calendar = useCalendar(customMeetings);
  
  return (
    <MonthView
      currentDate={calendar.currentDate}
      days={calendar.getCalendarDays()}
      getMeetingsForDate={calendar.getMeetingsForDate}
      onEventClick={(meeting) => console.log(meeting)}
    />
  );
}
```

## Data Flow

```
User Action → Calendar Page → Meeting Service → API (Future)
                    ↓
              Update State
                    ↓
            Re-render Views
```

Current flow (Mock):
```
loadMeetings() → meetingService.getAllMeetings() → mockMeetings → setState(meetings)
```

Future flow (API):
```
loadMeetings() → meetingService.getAllMeetings() → $api.GET('/api/meetings') → setState(meetings)
```

## Notes

- All views (Month/Week/Day) use the same data source
- Data is loaded once on mount and refreshed after mutations
- Service layer provides a clean separation for testing
- Mock data is only in `mock-data.ts` - easy to remove when ready
