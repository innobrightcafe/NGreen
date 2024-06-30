"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { LogOutIcon } from "../icons";
import { useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  joined: string;
  avatarUrl: string;
}

interface ProfileMenuItem {
  name: string;
  href: string;
}

interface ProfileMenuProps {
  userData: UserData;
  profileMenuData: ProfileMenuItem[];
}

export const ProfileMenu = ({
  userData,
  profileMenuData,
}: ProfileMenuProps) => {
  const [isImageError, setImageError] = useState(false);
  const router = useRouter();

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    setImageError(false); // Reset error state on avatarUrl change
  }, [userData.avatarUrl]);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         
        <Avatar>
          <AvatarImage src={userData.avatarUrl} alt="User avatar" />
          <AvatarFallback className="bg-transparent hover:bg-[#7F1945]/50 hover:text-[#FFF]" > <UserCircle /> </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileMenuData.map((item, index) => (
          <DropdownMenuItem key={index}>
            <Link
              href={item.href}
              className="flex items-center gap-2"
              prefetch={false}
            >
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
