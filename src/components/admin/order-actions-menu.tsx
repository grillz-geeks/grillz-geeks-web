"use client";

import {
  ArrowsClockwise,
  CaretDown,
  CheckCircle,
  ChatCircle,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OrderActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="gap-2">
            Actions
            <CaretDown className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem>
          <CheckCircle />
          Approve (mark as delivered)
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ClockCounterClockwise />
          Request revision
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ArrowsClockwise />
          Update stage
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ChatCircle />
          Send message to client
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
