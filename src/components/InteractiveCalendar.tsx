// src/components/InteractiveCalendar.tsx
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // ⬅️ the navy calendar with seeded events & banner
import { Clock } from "lucide-react";

export function InteractiveCalendar() {
  // Remount the calendar to jump to today (it initializes to today on mount)
  const [key, setKey] = React.useState(0);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#0B1220]" />
          <span>Calendar</span>
        </CardTitle>

        <Button
          variant="outline"
          onClick={() => setKey((k) => k + 1)}
          className="h-8 px-3 border-[#0B1220] text-[#0B1220] hover:bg-[#0B1220] hover:text-white"
        >
          Today
        </Button>
      </CardHeader>

      <CardContent>
        {/* The Calendar component already seeds 3–4 events per month
           and shows the navy details banner on day click */}
        <Calendar key={key} />
      </CardContent>
    </Card>
  );
}
