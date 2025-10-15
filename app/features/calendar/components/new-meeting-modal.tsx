import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { meetingSchema, type MeetingFormValues } from '../schemas/meeting-schema';
import { Users, User, Home } from 'lucide-react';

const projects = [
  { id: 'project-alpha', name: 'Project Alpha' },
  { id: 'project-beta', name: 'Project Beta' },
  { id: 'project-phoenix', name: 'Project Phoenix' },
];

const gates = [
  { id: 'gate-1', name: 'Gate 1 Review' },
  { id: 'gate-2', name: 'Gate 2 Review' },
  { id: 'gate-3', name: 'Gate 3 Review' },
];

const availableAttendees = [
  { id: 'att-1', name: 'Review Committee A', role: 'Committee', icon: Users },
  { id: 'att-2', name: 'Ethan Carter', role: 'Project Manager', icon: User },
  { id: 'att-3', name: 'Vendor X', role: 'Vendor', icon: Home },
];

type NewMeetingModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function NewMeetingModal({
  open,
  onClose,
  onSuccess,
}: NewMeetingModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      attendeeIds: [],
    },
  });

  const selectedAttendeeIds = watch('attendeeIds') || [];

  const onSubmit = (data: MeetingFormValues) => {
    console.log('Meeting data:', data);
    // TODO: Save meeting via API
    alert('Meeting scheduled successfully!');
    reset();
    onClose();
    onSuccess?.();
  };

  const toggleAttendee = (attendeeId: string) => {
    const currentIds = selectedAttendeeIds;
    const newIds = currentIds.includes(attendeeId)
      ? currentIds.filter((id) => id !== attendeeId)
      : [...currentIds, attendeeId];
    setValue('attendeeIds', newIds);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule Review Meeting</DialogTitle>
          <p className="text-gray-600 text-sm">
            Define the meeting details for the Gate 1 review of Project Alpha.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div>
            <Label htmlFor="title" className="text-base font-semibold">
              Meeting Title
            </Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="e.g., Final Design Review"
              className="mt-2"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project" className="text-base font-semibold">
                Project
              </Label>
              <Select onValueChange={(value) => setValue('project', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.project && (
                <p className="text-sm text-red-500 mt-1">{errors.project.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="gate" className="text-base font-semibold">
                Gate
              </Label>
              <Select onValueChange={(value) => setValue('gate', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select gate" />
                </SelectTrigger>
                <SelectContent>
                  {gates.map((gate) => (
                    <SelectItem key={gate.id} value={gate.name}>
                      {gate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.gate && (
                <p className="text-sm text-red-500 mt-1">{errors.gate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime" className="text-base font-semibold">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="datetime-local"
                {...register('startTime')}
                className="mt-2"
              />
              {errors.startTime && (
                <p className="text-sm text-red-500 mt-1">{errors.startTime.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="endTime" className="text-base font-semibold">
                End Time
              </Label>
              <Input
                id="endTime"
                type="datetime-local"
                {...register('endTime')}
                className="mt-2"
              />
              {errors.endTime && (
                <p className="text-sm text-red-500 mt-1">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="text-base font-semibold">
              Location / Virtual Meeting Link
            </Label>
            <Input
              id="location"
              {...register('location')}
              placeholder="e.g., https://meet.example.com/xyz-abc"
              className="mt-2"
            />
            {errors.location && (
              <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <Label className="text-base font-semibold">Attendees</Label>
            <div className="mt-3 space-y-2">
              {availableAttendees.map((attendee) => {
                const Icon = attendee.icon;
                const isSelected = selectedAttendeeIds.includes(attendee.id);

                return (
                  <button
                    key={attendee.id}
                    type="button"
                    onClick={() => toggleAttendee(attendee.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isSelected ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                    >
                      <Icon className="size-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{attendee.name}</div>
                      <div className="text-sm text-gray-500">{attendee.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.attendeeIds && (
              <p className="text-sm text-red-500 mt-1">{errors.attendeeIds.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-8"
            >
              Schedule Meeting
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
