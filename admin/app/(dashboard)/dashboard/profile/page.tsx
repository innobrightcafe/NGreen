'use client'; 
import { userData } from "@/app/data/data"
import Profile from "@/app/mycomponents/profileCard/prodilecard"

const ProfilePage = () => {
    return (
        <div className="flex items-center gap-4">
        <Profile userData={userData} /> 
        </div>
    );
  };

  export default ProfilePage;
  