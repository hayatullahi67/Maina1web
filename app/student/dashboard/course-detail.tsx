"use client";

import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
import {
  // BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  PlayCircle,
  X,
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
import { Course, Module, Lesson, Quiz } from "./page";
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

interface CourseDetailProps {
  course: Course;
  onClose: () => void;
}
type Student = {
  fullname: string;
  email: string;
  token: string;
  id: string;
};
export function CourseDetail({ course, onClose }: CourseDetailProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [quizzes, setQuizzes] = useState<{ [key: string]: Quiz }>({});
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student>({
    fullname: "Loading...",
    email: "",
    id:"",
    token: "",
  });

  useEffect(() => {
    const fetchModulesAndQuizzes = async () => {
      try {
        const userData = localStorage.getItem("userData");
        const parsedUserData = JSON.parse(userData || "{}");
        const token = parsedUserData.token;

        // Fetch modules
        const modulesResponse = await fetch(
          `https://api.a1schools.org/courses/${course.id}/modules`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!modulesResponse.ok) {
          throw new Error("Failed to fetch modules");
        }

        const modulesData = await modulesResponse.json();
        setModules(modulesData.data || []);

        // Fetch quizzes for each module
        const quizzesData: { [key: string]: Quiz } = {};
        for (const moduleItem of modulesData.data || []) {
          const quizResponse = await fetch(
            `https://api.a1schools.org/courses/${course.id}/modules/${moduleItem.id}/quiz`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (quizResponse.ok) {
            const quizData = await quizResponse.json();
            if (quizData.data && quizData.data.length > 0) {
              quizzesData[moduleItem.id] = quizData.data[0];
            }
          }
        }
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error fetching modules and quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModulesAndQuizzes();
  }, [course.id]);

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `https://api.a1schools.org/auth/logout/${student.id}`,
        {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            
          },
        }
      );
  
      if (response.ok) {
        console.log('Logout successful');
        // Optional: Clear any user data from localStorage/sessionStorage
        // Redirect to login/home page
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message);
      }
    } catch (error) {
      console.error('Network error during logout:', error);
    }
  };
  const getModuleProgress = (module: Module) => {
    const totalLessons = module.lessons?.length || 0;
    const completedLessons = (module.lessons || [])?.filter(
      (lesson) => !!(lesson as any).completed
    ).length;
    return (completedLessons / totalLessons) * 100;
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="container max-w-6xl mx-auto p-4 h-screen overflow-y-auto">
          <Card className="relative">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
    <SidebarProvider >
    <Sidebar>
              <SidebarHeader className="flex items-center gap-2 px-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold">A1 School</span>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/student/dashboard">
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
                  {/* <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/teacher/dashboard/transaction">
                        <DollarSign className="h-4 w-4" />
                        <span>Wallet</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem> */}
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
                         <button  onClick={handleLogout}>
    
                         <span  className="text-[red]">Log Out</span>
    
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
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{student.fullname}</span>
                    <span className="text-xs text-muted-foreground">
                      {student.email}
                    </span>
                  </div>
                </div>
              </SidebarFooter>
            </Sidebar>
            <SidebarTrigger className="h-10 w-10 mt-[30px] ml-[30px] lg:hidden border border-gray-300 rounded-md flex items-center justify-center">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container max-w-6xl mx-auto p-4 h-screen overflow-y-auto">
        <Card className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          {selectedLesson ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedLesson.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLesson(null)}
                >
                  Back to Modules
                </Button>
              </div>
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                <video
                  src={selectedLesson.video_link}
                  controls
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {selectedLesson.description}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={course.image_link || "/placeholder.svg"}
                  alt={course.name}
                  width={1200}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center">
                    <Image
                      src={course.instructor.image_link || "/placeholder.svg"}
                      alt={course.instructor.fullname}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="ml-2">{course.instructor.fullname}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{modules.length} Modules</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <Card key={module.id}>
                      <CardHeader
                        className="cursor-pointer"
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {expandedModule === module.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                            <CardTitle className="text-lg">
                              {module.title}
                            </CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={getModuleProgress(module)}
                              className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">
                              {Math.round(getModuleProgress(module))}%
                            </span>
                          </div>
                        </div>
                        <CardDescription>{module.description}</CardDescription>
                      </CardHeader>

                      {expandedModule === module.id && (
                        <CardContent className="space-y-2">
                          {(module.lessons || [])?.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer"
                              onClick={() => handleLessonClick(lesson)}
                            >
                              <div className="flex items-center gap-2">
                                {!!(lesson as any).completed ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span>{lesson.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                          {quizzes[module.id] && (
                            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                                <span>Quiz: {module.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {quizzes[module.id].questions.length} questions
                              </span>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
    </SidebarProvider>
    </>
  );
}
