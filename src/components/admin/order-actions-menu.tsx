"use client";

import { DotsThreeVertical } from "@phosphor-icons/react";
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
          <Button variant="outline" size="icon" aria-label="Order actions">
            <DotsThreeVertical className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Approve (mark as delivered)</DropdownMenuItem>
        <DropdownMenuItem>Request revision</DropdownMenuItem>
        <DropdownMenuItem>Update stage</DropdownMenuItem>
        <DropdownMenuItem>Send message to client</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
