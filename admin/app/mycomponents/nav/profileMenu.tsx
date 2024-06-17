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
import { LogOutIcon, UsersIcon } from "../icons";

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

export const ProfileMenu = ({ userData, profileMenuData }: ProfileMenuProps) => {
  const [isImageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    setImageError(false); // Reset error state on avatarUrl change
  }, [userData.avatarUrl]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {isImageError ? (
            <UsersIcon className="h-8 w-8" /> // Use a fallback icon
          ) : (
            <img
              src={userData.avatarUrl}
              onError={handleImageError}
              width="32"
              height="32"
              className="rounded-full"
              alt="Avatar"
            />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
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
        <DropdownMenuItem>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <LogOutIcon className="h-4 w-4" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
