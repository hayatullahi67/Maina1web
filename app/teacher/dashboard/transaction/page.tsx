"use client";

import { TransactionItem } from "@/components/TransactionItem";
import { useEffect, useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sider";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  DollarSign,
  LayoutDashboard,
  MessageSquare,
  PanelLeft,
  PlusCircle,
  Settings,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";

// const transactions = [
//   { title: "Payment for Vue js", amount: 100, date: "4/18/2025" },
//   { title: "Payment for Node js", amount: 100, date: "4/18/2025" },
//   { title: "Payment Failed", amount: -190, date: "4/16/2025" },
//   { title: "Payment for Node js", amount: 100, date: "4/16/2025" },
//   { title: "Payment for Node", amount: 100, date: "4/16/2025" },
//   { title: "Payment Failed", amount: -100, date: "4/16/2025" },
//   { title: "Payment for css", amount: 100, date: "4/16/2025" },
//   { title: "Payment for PHP", amount: 100, date: "4/16/2025" },
//   { title: "Payment Failed", amount: -110, date: "4/16/2025" },
//   { title: "Payment for PHP", amount: 100, date: "4/16/2025" },
//   { title: "Payment Failed", amount: -180, date: "4/15/2025" },
//   { title: "Payment for react ts", amount: 100, date: "4/15/2025" },
//   { title: "Payment Failed", amount: -95, date: "4/15/2025" },
//   { title: "Payment for react ts", amount: 100, date: "4/14/2025" },
// ];

interface Transaction {
  amount: string;
  status: string;
  created_at: string;
  description: string;
  id: string;
  transaction_type: string;

  // Add more fields if needed
}
type Instructor = {
  fullname: string;
  email: string;
  token: string;
  id: string;
  wallet: {
    balance: string;
  };
};
export default function Home() {
  const [instructor, setInstructor] = useState<Instructor>({
    fullname: "Loading...",
    email: "",
    id: "",
    token: "",
    wallet: {
      balance: "0.00", // Default value
    },
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const instructorId = instructor.id;
  const token = instructor.token;

  //  const wallet = instructor.wallet.balance;

  //  console.log("wealle" , wallet)

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    console.log("stored", stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("parsed", parsed);
      setInstructor({
        fullname: parsed.fullname || "Student",
        email: parsed.email || "",
        id: parsed.id,
        token: parsed.token,
        wallet: parsed.wallet,
      });
    }
  }, []);

  console.log("instr", instructor);
  useEffect(() => {
    const fetchSuccessfulTransactions = async () => {
      if (!instructorId || !token) return;

      try {
        const response = await fetch(
          `https://api.a1schools.org/instructors/${instructorId}/transactions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("💰 Transactions data:", data);
        setTransactions(data.data);
      } catch (error) {
        console.error("❌ Failed to fetch transactions:", error);
      }
    };

    fetchSuccessfulTransactions();
  }, [instructorId, token]);
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `https://api.a1schools.org/auth/logout/${instructorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Logout successful");
        // Optional: Clear any user data from localStorage/sessionStorage
        // Redirect to login/home page
        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.message);
      }
    } catch (error) {
      console.error("Network error during logout:", error);
    }
  };

  return (
    <>
      <SidebarProvider className="pt-[80px]">
      <Sidebar className="bg-[#1e293b]">
          <SidebarHeader className="flex text-[#f8fafc] items-center gap-2 px-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold">A1 School</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/teacher/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/courses">
                    <BookOpen className="h-4 w-4" />
                    <span>My Courses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/students">
                    <Users className="h-4 w-4" />
                    <span>Students</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/analytics">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/dashboard/transaction">
                    ₦<span>Wallet</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/messages">
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/teacher/dashboard/notificationpage">
                                  <User className="h-4 w-4" />
                                  <span>Notifications</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button onClick={handleLogout}>
                    <span className="">Log Out</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center gap-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                width={40}
                height={40}
                alt="User avatar"
                className="rounded-full"
              />
              <div className="flex flex-col text-[#f8fafc]">
                <span className="text-sm font-medium">
                  {instructor.fullname}
                </span>
                <span className="text-xs ">
                  {instructor.email}
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarTrigger className="h-10 w-10 mt-[30px] ml-[30px] lg:hidden border border-gray-300 rounded-md flex items-center justify-center absolute right-4 bg-white">
          <PanelLeft className="h-4 w-4" />
        </SidebarTrigger>
        <div className="pb-20 w-[65%] mx-auto">
          {/* {transactions.map((tx, idx) => (
        <TransactionItem key={idx} {...tx} />


      ))} */}
          {/* <div className="bg-[lightblue] h-[100px] flex items-center pl-[50px]">
            <div className="text-white">
              <div>
                <p>Total Balance</p>
                <p>₦{parseFloat(instructor.wallet.balance).toFixed(2)}</p>
              </div>

              <div>
                <Link href="/teacher/dashboard/request">
                  <div>Withdraw</div>
                </Link>
              </div>
            </div>
          </div> */}
                   

                   <div className="max-w-[100%] rounded-2xl bg-[#3b92e3] p-6 text-white">
  <div className="flex flex-col">
    <p className="text-lg font-light mb-1">Total Balance</p>
    <p className="text-4xl font-medium mb-6">
      ₦{parseFloat(instructor.wallet.balance).toFixed(2)}
    </p>
    
    <Link href="/teacher/dashboard/request">
      <div className="w-full bg-[#5ca3e6] bg-opacity-40 hover:bg-opacity-50 py-4 px-5 rounded-xl flex items-center transition">
        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15v3H6v-3M12 16V4M12 4l4 4M12 4L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-medium text-lg">Withdraw</span>
      </div>
    </Link>
  </div>
</div>

          {Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.map((tx, idx) => <TransactionItem key={idx} {...tx} />)
          ) : (
            <p className="text-center text-gray-500">No transactions found.</p>
          )}
        </div>
      </SidebarProvider>
    </>
  );
}
