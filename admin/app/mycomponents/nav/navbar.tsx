"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  menuData,
  notifications,
  profileMenuData,
  userData,
} from "@/app/data/data";
import { ProfileMenu } from "./profileMenu";
import Notifications from "./notifications";

export function Navbar() {
  const pathName = usePathname(); // Fix declaration here

  return (
    <div className="flex flex-col">
      <header className="bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-r-2" prefetch={false}>
            <Image
              loading="lazy"
              src="/logooo-re.png"
              alt="Nicolas Green Logistics"
              height={40}
              width={90}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {menuData.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`hover:text-white ${
                  pathName === link.href
                    ? "bg-[#FFBE58] text-gray-100 rounded-xl px-4"
                    : "text-gray-300"
                }`}
                prefetch={false}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Notifications />
          <ProfileMenu userData={userData} profileMenuData={profileMenuData} />
        </div>
      </header>
    </div>
  );
}
