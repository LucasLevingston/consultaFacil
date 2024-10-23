"use client";
import { SignOut } from "@/lib/actions/user.actions";
import { LogOut } from "lucide-react";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function LogOutButton() {
  const handleLogOut = async () => {
    await SignOut();
  };
  return (
    <DropdownMenuItem onClick={handleLogOut} asChild>
      <div className="flex items-center">
        <LogOut className="mr-2 h-4 w-4" />
        Sair da conta
      </div>
    </DropdownMenuItem>
  );
}
