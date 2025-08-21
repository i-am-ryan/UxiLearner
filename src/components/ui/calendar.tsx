import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  BookOpen,
  CalendarClock,
} from "lucide-react";
import {
  DayPicker,
  type DayPickerSingleProps,
  type SelectSingleEventHandler,
  type DayClickEventHandler,
} from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/** ---------- Types ---------- */
type EventType = "assessment" | "class" | "notice";
type CalendarEvent = {
  id: string;
  date: string; // "YYYY-MM-DD"
  type: EventType;
  title: string;
  time?: string;
  location?: string;
  description?: string;
};

/** ---------- Helpers ---------- */
const NAVY = "#0B1220";
const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/** ---------- Seed 3–4 events per month through December ---------- */
function seedEventsForRestOfYear(): CalendarEvent[] {
  const now = new Date();
  const year = now.getFullYear();
  const startMonth = now.getMonth();

  const patterns: number[][] = [
    [5, 12, 21],
    [3, 14, 22, 28],
    [7, 18, 26],
    [4, 11, 20, 27],
  ];

  const classTitles = [
    "Practical Lab",
    "Workshop Session",
    "Circuit Building",
    "Safety Induction",
  ];
  const assessmentTitles = [
    "Maths for Electricians Quiz",
    "Engineering Science Test",
    "Electrical Principles Test",
    "Wiring Standards Assessment",
  ];
  const noticeTitles = [
    "Campus Briefing",
    "Tool Inspection Notice",
    "Library Extended Hours",
    "Industry Talk",
  ];

  const out: CalendarEvent[] = [];
  let seq = 1;

  for (let m = startMonth; m <= 11; m++) {
    const dim = daysInMonth(year, m);
    const pattern = patterns[(m - startMonth) % patterns.length];

    pattern.forEach((day, i) => {
      const d = Math.min(day, dim);
      const type: EventType = (["assessment", "class", "notice"] as const)[i % 3];
      const title =
        type === "assessment"
          ? assessmentTitles[(m + i) % assessmentTitles.length]
          : type === "class"
          ? classTitles[(m + i) % classTitles.length]
          : noticeTitles[(m + i) % noticeTitles.length];

      const time =
        type === "assessment" ? "10:00–11:00" : type === "class" ? "13:00–15:00" : "08:30–09:00";
      const location =
        type === "assessment" ? "Lecture Hall B" : type === "class" ? "Workshop 2" : "Auditorium";
      const description =
        type === "assessment"
          ? "Closed-book assessment. Bring a calculator."
          : type === "class"
          ? "Safety boots required."
          : "Updates and announcements for all students.";

      out.push({
        id: `seed-${seq++}`,
        date: iso(year, m, d),
        type,
        title,
        time,
        location,
        description,
      });
    });
  }

  return out;
}
const SEEDED_EVENTS = seedEventsForRestOfYear();

/** ---------- Component ---------- */
export type CalendarProps = DayPickerSingleProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date());
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalDate, setModalDate] = React.useState<Date | undefined>();
  const [modalEvents, setModalEvents] = React.useState<CalendarEvent[]>([]);

  const { onSelect: onSelectProp, ...rest } = props;

  const eventDates = React.useMemo(
    () => SEEDED_EVENTS.map((e) => new Date(e.date)),
    []
  );

  const openModalFor = (date: Date) => {
    const todaysEvents = SEEDED_EVENTS.filter((ev) =>
      sameDay(new Date(ev.date), date)
    );
    if (todaysEvents.length) {
      setModalDate(date);
      setModalEvents(todaysEvents);
      setModalOpen(true);
    }
  };

  const handleSelect: SelectSingleEventHandler = (date, selectedDay, modifiers, e) => {
    if (date) {
      setSelected(date);
      openModalFor(date); // open when a date is selected
    }
    onSelectProp?.(date, selectedDay, modifiers, e);
  };

  const handleDayClick: DayClickEventHandler = (date) => {
    // extra safety: open on explicit click as well
    openModalFor(date);
  };

  return (
    <div className={cn("p-3", className)}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        selected={selected}
        onSelect={handleSelect}
        onDayClick={handleDayClick}
        modifiers={{ event: eventDates }}
        modifiersClassNames={{
          // Full black fill for event days
          event: "bg-black text-white rounded-md hover:bg-black/90",
        }}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-semibold text-[#0B1220]",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 border border-[#0B1220]/30 text-[#0B1220] hover:bg-[#0B1220]/10 hover:text-[#0B1220]"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-[#0B1220]/70 rounded-md w-9 font-medium text-[0.8rem]",
          row: "flex w-full mt-2",
          cell:
            "h-9 w-9 p-0 relative text-center text-sm focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            // ensure day buttons are clickable
            "pointer-events-auto relative h-9 w-9 p-0 font-normal hover:bg-[#0B1220]/10 hover:text-[#0B1220] focus-visible:ring-2 focus-visible:ring-[#0B1220] aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-[#0B1220] text-white hover:bg-[#0B1220] hover:text-white focus:bg-[#0B1220] focus:text-white",
          day_today:
            "font-semibold ring-1 ring-[#0B1220] text-[#0B1220] rounded-md",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-[#0B1220]/10 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-[#0B1220]/10 aria-selected:text-[#0B1220]",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...rest}
      />

      {/* Popup modal with events for the clicked day */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {modalDate
                ? modalDate.toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Events"}
            </DialogTitle>
            <DialogDescription>
              {modalEvents.length} {modalEvents.length === 1 ? "event" : "events"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {modalEvents.map((e) => (
              <div
                key={e.id}
                className="rounded-lg border border-[#0B1220]/15 bg-white p-3"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-md bg-[#0B1220]/10 p-2 text-[#0B1220]">
                    {e.type === "assessment" ? (
                      <BookOpen className="h-4 w-4" />
                    ) : e.type === "class" ? (
                      <CalendarClock className="h-4 w-4" />
                    ) : (
                      <Bell className="h-4 w-4" />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{e.title}</p>
                    {(e.time || e.location) && (
                      <p className="text-xs text-muted-foreground">
                        {e.time ? `${e.time} • ` : ""}
                        {e.location || ""}
                      </p>
                    )}
                    {e.description && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {e.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
