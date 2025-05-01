
'use client'

import StudentNotificationsPage from "@/app/teacher/dashboard/notification";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  PanelLeft,
  Settings,
  Star,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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


export interface Instructor {
    id: string;
    fullname: string;
    verified: boolean;
    // categories: Category[];
    image_link: string;
    email: string;
    token: string;
  }

export default function NotificationPage() {
    const [instructor, setInstructor] = useState<Instructor>({
        fullname: "Loading...",
        email: "",
        id: "",
        token: "",
        verified: false,
        // categories: [],
        image_link: "",
      });


      const token = instructor.token;
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
        verified: parsed.verified,
        // categories: parsed.categories,
        image_link: parsed.image_link,
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `https://api.a1schools.org/auth/logout/${instructor.id}`,
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
  <SidebarProvider >
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


  <StudentNotificationsPage />  
  
  </SidebarProvider>
  </>

  );
}