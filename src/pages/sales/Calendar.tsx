
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

// Sample events data
const events = [
  {
    id: "1",
    title: "Meeting with Acme Corp",
    date: new Date(2025, 4, 15),
    type: "meeting",
    description: "Quarterly review meeting with Acme Corp team",
  },
  {
    id: "2",
    title: "Product Demo for TechSoft",
    date: new Date(2025, 4, 18),
    type: "demo",
    description: "Product demonstration for potential client TechSoft Solutions",
  },
  {
    id: "3",
    title: "Sales Team Meeting",
    date: new Date(2025, 4, 12),
    type: "internal",
    description: "Weekly sales team meeting to review goals and progress",
  },
  {
    id: "4",
    title: "Deadline: Quarterly Tax Filing",
    date: new Date(2025, 4, 20),
    type: "deadline",
    description: "Submit quarterly tax returns",
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Get events for the selected date
  const eventsForSelectedDate = selectedDate
    ? events.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];
  
  // Function to check if a date has events
  const hasEvents = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
  };
  
  // Generate month navigation
  const currentMonth = date ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date) : '';
  
  // Navigate to the previous month
  const prevMonth = () => {
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);
      setDate(newDate);
    }
  };
  
  // Navigate to the next month
  const nextMonth = () => {
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      setDate(newDate);
    }
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="page-title mb-0">Sales Calendar</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="default">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event for the sales calendar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="event-title">Title</Label>
                <Input id="event-title" placeholder="Enter event title..." />
              </div>
              <div>
                <Label htmlFor="event-date">Date</Label>
                <Input id="event-date" type="date" />
              </div>
              <div>
                <Label htmlFor="event-type">Event Type</Label>
                <select
                  id="event-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="meeting">Meeting</option>
                  <option value="demo">Product Demo</option>
                  <option value="internal">Internal</option>
                  <option value="deadline">Deadline</option>
                </select>
              </div>
              <div>
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Enter event details..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Save Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>{currentMonth}</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={date}
                onMonthChange={setDate}
                className="rounded-md border"
                modifiers={{
                  hasEvent: (day) => hasEvents(day),
                }}
                modifiersStyles={{
                  hasEvent: { 
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderBottom: '2px solid #3B82F6'
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>
                {selectedDate
                  ? new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(selectedDate)
                  : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsForSelectedDate.map((event) => {
                    const eventTypeColors = {
                      meeting: "bg-blue-100 border-blue-500 text-blue-800",
                      demo: "bg-purple-100 border-purple-500 text-purple-800",
                      internal: "bg-green-100 border-green-500 text-green-800",
                      deadline: "bg-red-100 border-red-500 text-red-800",
                    };
                    
                    const typeColor = eventTypeColors[event.type as keyof typeof eventTypeColors];
                    
                    return (
                      <div
                        key={event.id}
                        className={`p-3 rounded-md border-l-4 ${typeColor}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-sm">{event.title}</h3>
                          <div className={`text-xs px-2 py-1 rounded-full ${typeColor}`}>
                            {event.type}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      No events scheduled for this day
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Event
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Event</DialogTitle>
                          <DialogDescription>
                            Create a new event for the sales calendar
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="event-title">Title</Label>
                            <Input id="event-title" placeholder="Enter event title..." />
                          </div>
                          <div>
                            <Label htmlFor="event-date">Date</Label>
                            <Input
                              id="event-date"
                              type="date"
                              defaultValue={selectedDate?.toISOString().split("T")[0]}
                            />
                          </div>
                          <div>
                            <Label htmlFor="event-type">Event Type</Label>
                            <select
                              id="event-type"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="meeting">Meeting</option>
                              <option value="demo">Product Demo</option>
                              <option value="internal">Internal</option>
                              <option value="deadline">Deadline</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="event-description">Description</Label>
                            <Textarea
                              id="event-description"
                              placeholder="Enter event details..."
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Save Event</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
