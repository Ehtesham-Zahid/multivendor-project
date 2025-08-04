"use client";

import React, { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/shadcn/button";
import { Calendar } from "@/shadcn/calendar";
import { Input } from "@/shadcn/input";
import { Label } from "@/shadcn/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/popover";

function formatDate(date) {
  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

const EventDateSelector = ({ title, onDateChange }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date("2025-06-01"));
  const [month, setMonth] = useState(date);
  const [value, setValue] = useState(formatDate(date));

  console.log(value);

  useEffect(() => {
    if (isValidDate(date)) {
      onDateChange?.(date); // notify parent
    }
  }, [date]); // only trigger when `date` changes

  return (
    <div className="flex flex-col gap-1 bg-background">
      <Label htmlFor="date" className="px-1">
        {title}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10 outline-none "
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(newDate)) {
              setDate(newDate);
              setMonth(newDate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen} className="bg-background">
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 bg-background"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setValue(formatDate(selectedDate));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EventDateSelector;
