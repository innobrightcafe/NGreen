import { Button } from "@/components/ui/button"; 
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";  

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  joined: string;
  avatarUrl: string;
  avatarFallback: string;
}

interface ProfileProps {
  userData: UserData; 
}

const Profile = ({ userData }: ProfileProps) => {
    
  return (
<main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={userData.avatarUrl} />
                  <AvatarFallback>{userData.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-gray-500">{userData.email}</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{userData.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p>{userData.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Joined</h3>
                  <p>{userData.joined}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#FFBE58]/50 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" defaultValue={userData.name} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" defaultValue={userData.email} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter your phone number" type="tel" defaultValue={userData.phone} />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter your address" className="min-h-[100px]" defaultValue={userData.address} />
                </div>
                <div className="flex justify-end">
                  <Button className="ml-auto">Save</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main> 
  );
};

export default Profile;