import { 
  CircleCheckIcon,  
  PackageIcon,
  DollarSignIcon,
  UsersIcon, 
  CircleXIcon, 
  ClockIcon, 
  ShoppingCartIcon, 
  TruckIcon
} from "@/app/mycomponents/icons";
 
export const cardData = [
  {
    title: "Total Orders",
    icon: <ShoppingCartIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 12345,
    changes: "+20.1% from last month",
  },
  {
    title: "Completed Orders",
    icon: <CircleCheckIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 10234,
    changes: "+18.2% from last month",
  },
  {
    title: "Pending Orders",
    icon: <ClockIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 2111,
    changes: "+5.4% from last month",
  },
  {
    title: "Cancelled Orders",
    icon: <CircleXIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 157,
    changes: "+2.1% from last month",
  },
];



export const driverCardData = [
  {
    title: "Total Drivers",
    icon: <UsersIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 1234,
    changes: "+3.2% from last month",
  },
  {
    title: "Active Drivers",
    icon: <UsersIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: "123,450",
    changes: "+8.9% from last month",
  },
  {
    title: "Offline Drivers",
    icon: <UsersIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 234,
    changes: "+0.8% from last month",
  },
  {
    title: "Average Delivery Time",
    icon: <UsersIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 34,
    changes: "-2.0% from last month",
  },
];

export const dashbordCardData = [
  {
    title: "Total Orders",
    icon: <PackageIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 12345,
    changes: "+5.2% from last month",
  },
  {
    title: "Total Revenue",
    icon: <DollarSignIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 123450,
    changes: "+8.9% from last month",
  },
  {
    title: "Active Drivers",
    icon: <UsersIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 1234,
    changes: "+3.1% from last month",
  },
  {
    title: "Customers",
    icon: <UsersIcon className="h-6 w-6 text-[#7F1945] dark:text-[#FFBE58]" />,
    num: 12334,
    changes: "+20% from last month",
  },
];


export const menuData = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Carriers", href: "/carriers" },
    { name: "Customers", href: "/customers" },
    { name: "Reports", href: "/reports" },
    { name: "Referral Program", href: "/referrerprogram" },
    { name: "Delivery Activities", href: "/delivery_activities" }, 
  ];

  export const profileMenuData= [
    { name: "Account", href: "/account" },
    { name: "Settings", href: "/settings" },
    { name: "Support", href: "/support" },
    { name: "Profile", href: "/profile" }, 
  ];

  export const driverTableData = [
    {
      driver: "Dav Lee",
      status: "Offline",
      deliveries: "1,345",
      rating: 3,
    },
    {
      driver: "Sam Omo",
      status: "Active",
      deliveries: "1,100",
      rating: 2,
    },
    {
      driver: "Jane Smith",
      status: "Active",
      deliveries: "113",
      rating: 5,
    },
    {
      driver: "Mama Smith",
      status: "Offline",
      deliveries: "977",
      rating: 4,
    },
  ];

  export const customerTableData = [
    {
      name: "Alice Dav",
      email: "Alicedav@example.com",
      phone: "+234-805-577-1234",
      orders: 3,
      totalspent: 1570,

    },
    {
      name: "David Smith",
      email: "dav@example.com",
      phone: "+234-805-555-1684",
      orders: 3,
      totalspent: 3900,
    },
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+234-805-455-1252",
      orders: 3,
      totalspent: 8570,
    },
    {
      name: "Bob Lee",
      email: "bob@example.com",
      phone: "+234-805-657-1838",
      orders: 3,
      totalspent: 3570,
    },
  ];
 
  export const actionTableData = [
    {
      order: "12345",
      customer: "John Doe",
      address: "2 godown st ikeja lagos", 
      driver: "Jane Smith",
      status: "Delivered",
      deliveryTime: "1.13 min",
      total: 100.00,
    },
    {
      order: "12346",
      customer: "Jane Doe",
      address: "12 ademola cre ikeja lagos", 
      driver: "John Smith",
      status: "Shipped",
      deliveryTime: "4.13 min",
      total:175.00,
    },
    {
      order: "12347",
      customer: "Bob Smith",
      address: "12 osun st ikeja lagos", 
      driver: "Alice Johnson",
      status: "Pending",
      deliveryTime: "2.13 min",
      total: 50.00,
    },
  ];
 

  export const tableData = [
    {
      order: "12345",
      driver: "Alice Johnson",
      customer: "John Doe",
      address: "123 Main St, Anytown USA",
      status: "Delivered",
      deliveryTime: "25 min",
      total: 24.99,
    },
    {
      order: "12346",
      driver: "Jane Smith",
      customer: "Jane Smith",
      address: "456 Oak Rd, Somewhere CA",
      status: "In Progress",
      deliveryTime: "32 min",
      total: 18.75,
    },
    {
      order: "12347",
      driver: "Jane Smith",
      customer: "Bob Johnson",
      address: "789 Elm St, Elsewhere NY",
      status: "Cancelled",
      deliveryTime: "-",
      total: 32.50,
    },
    {
      order: "12348",
      driver: "Jane Smith",
      customer: "Alice Williams",
      address: "321 Pine Rd, Somewhere Else FL",
      status: "Delivered",
      deliveryTime: "28 min",
      total: 19.99,
    },
  ];

  export const orderData = [
    {
      order: "12345",
      customer: "John Doe",
      date: "June 1, 2023",
      status: "Delivered",
    },
    {
      order: "12346",
      customer: "Jane Smith",
      date: "June 2, 2023",
      status: "Shipped",
    },
    {
      order: "12347",
      customer: "Michael Johnson",
      date: "June 3, 2023",
      status: "Cancelled",
    },
    {
      order: "12348",
      customer: "Sarah Lee",
      date: "June 4, 2023",
      status: "Pending",
    },
  ];
 
  export const activityData = [
    { label: "Drivers Online", value: 15, Icon: UsersIcon },
    { label: "En Route to Pick Up", value: 8, Icon: TruckIcon },
    { label: "En Route to Deliver", value: 12, Icon: TruckIcon },
  ];

  export const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 555-5555",
    address: "123 Main St, Anytown USA",
    joined: "January 1, 2023",
    avatarUrl: "/placeholder-user.jpg",
    avatarFallback: "JD",
  };
  
  export const notifications = [
    { icon: PackageIcon, title: "New Order Received", description: "Order #12345 from John Doe" },
    { icon: UsersIcon, title: "New Driver Assigned", description: "Driver: Jane Smith" },
    { icon: ClockIcon, title: "Delivery Delayed", description: "Order #12346 delayed by 15 minutes" },
  ];
  