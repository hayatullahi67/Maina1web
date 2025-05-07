

'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen, Calendar, Clock, GraduationCap, LayoutDashboard, MessageSquare,
  PanelLeft, Settings, Star, User, Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger,
} from "@/components/ui/sider";
import Header from "@/components/header";

// Category type
interface Category {
  name: string;
}

// Instructor type
interface Instructor {
  fullname: string;
  image_link: string | null;
}

// Lesson type
interface Lesson {
  title: string;
  description: string | null;
  duration: string | null;
  module_id: string;
  video_link: string | null;
  id: string;
}

// Module type
interface Module {
  title: string;
  description: string;
  course_id: string;
  id: string;
  completed: boolean;
  lessons: Lesson[];
  quiz: any; // Replace 'any' with a specific type if you know the quiz structure
}

// Course type
export interface Course {
  name: string;
  description: string;
  price: string;
  id: string;
  instructor_id: string;
  instructor: Instructor;
  average_rating: number | null;
  category: Category[];
  created_at: string;
  updated_at: string;
  image_link: string;
  students: any; // Replace 'any' if you know the structure
  discount: string;
  completed: boolean;
  modules: Module[];
  enrolled: boolean;
}

// API Response type
export interface CourseApiResponse {
  message: string;
  data: Course;
}

// Student type
interface Student {
  fullname: string;
  email: string;
  id: string;
  token: string;
  verified: boolean;
  image_link: string;
}

export default function Preview() {
  const router = useRouter();
  const [course, setCourse] = useState<Course | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [student, setStudent] = useState<Student>({
    fullname: "Loading...", email: "", id: "", token: "", verified: false, image_link: "",
  });

  const params = useParams();
  const courseId = params.id as string;

  // Load student from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setStudent({
        fullname: parsed.fullname || "Student",
        email: parsed.email || "",
        id: parsed.id,
        token: parsed.token,
        verified: parsed.verified,
        image_link: parsed.image_link || "",
      });
    }
  }, []);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `https://api.a1schools.org/courses/${courseId}?user_id=${student.id}`
        );
        if (!response.ok) throw new Error('Failed to fetch course');
        const data: CourseApiResponse = await response.json();
        setCourse(data.data); // Use data.data based on your API response
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    if (student.id && courseId) fetchCourse();
  }, [student.id, courseId]);

  // Enroll handler
  // const enrollCourse = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.a1schools.org/courses/${courseId}/enroll`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${student.token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       setCourse(prev => prev ? { ...prev, enrolled: true } : undefined);
  //       setShowEnrollModal(false);
  //     }
  //   } catch (error) {
  //     alert("Enrollment failed");
  //   }
  // };

  const enrollCourse = async () => {
    try {
      const response = await fetch(
        `https://api.a1schools.org/courses/${courseId}/enroll`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${student.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to enroll course");
      }

      const data = await response.json();
      console.log("enrolldata", data);

      const paymentLink = data?.data?.link;
      if (paymentLink) {
        window.location.href = paymentLink; // takes the user to the Flutterwave payment page
      } else {
        console.warn("No payment link found in response");
      }
    } catch (error) {
      console.error("Error enrolling course:", error);
    }
  };

  // // Logout handler
  // const handleLogout = async () => {
  //   try {
  //     await fetch(
  //       `https://api.a1schools.org/auth/logout/${student.id}`,
  //       { method: "GET", headers: { "Content-Type": "application/json" } }
  //     );
  //     window.location.href = "/login";
  //   } catch (error) {
  //     alert("Logout failed");
  //   }
  // };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    
     <>
     <Header />
      <div className="flex bg-[#F8F9FA] w-[100%]">
       
       

        {/* Main Content */}
        <div className="w-[100%] p-4 md:p-8 bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef]">
          {/* Course Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            <div className="col-span-2 flex flex-col justify-center">
              <h1 className="text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">{course.name}</h1>
              <p className="text-lg text-[gray] mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-700" />
                  <span className="font-medium text-[gray]">{course.instructor.fullname}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[yellow]" />
                  <span className="font-medium text-[gray]">
                    {course.average_rating ?? "No rating"} 
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {course.category?.map((cat, idx) => (
                  <span key={idx} className="bg-[blue] text-[white] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{cat.name}</span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center border border-[blue]">
              <div className="relative w-48 h-32 mb-4 rounded-lg overflow-hidden shadow">
                <Image
                  src={course.image_link}
                  alt={course.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 w-full items-center">
                <span className="text-2xl font-bold text-[gray]">
                ₦{course.price}
                  {course.discount && course.discount !== "0" && (
                    <span className="text-sm line-through text-[gray] ml-2">
                      ₦{(parseFloat(course.price) + parseFloat(course.discount)).toString()}
                    </span>
                  )}
                </span>
                {course.enrolled ? (
                  <Button className="bg-[#1e293b] hover:bg-[#1e293b] w-full rounded-lg mt-2">
                  Enrolled
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowEnrollModal(true)}
                    className="bg-[#1e293b] hover:bg-[#1e293b] w-full rounded-lg mt-2"
                  >
                    Enroll Now
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[gray] ">Course Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {course.modules.map((module) => (
                <div key={module.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
                  <h3 className="text-lg font-semibold mb-2 text-[blue]">{module.title}</h3>
                  <p className="text-[gray] mb-4">{module.description}</p>
                  <div className="space-y-3">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-4 p-3 rounded-lg border border-blue-50 hover:bg-blue-50 transition cursor-pointer ${!course.enrolled ? "opacity-60" : "hover:scale-[1.02]"} ${lesson.video_link ? "bg-blue-50/30" : ""}`}
                        onClick={() => {
                          if (!course.enrolled) {
                            setShowEnrollModal(true);
                          } else if (lesson.video_link) {
                            setSelectedVideo(lesson.video_link);
                            setShowVideoModal(true);
                          }
                        }}
                      >
                        <Video className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">{lesson.title}</span>
                        {lesson.video_link ? (
                          <span className="ml-auto text-xs text-[green] font-semibold">Watch Video</span>
                        ) : (
                          <span className="ml-auto text-xs text-[gray]">No Video</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enroll Modal */}
          {showEnrollModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full border border-blue-100">
                <h3 className="text-xl font-bold mb-2 text-center text-[blue]">You have not enrolled</h3>
                <p className="mb-6 text-center text-[gray]">
                  You have not enrolled in this course. Please enroll to access all lessons and videos.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={enrollCourse}
                    className="bg-[blue] hover:bg-[blue] w-full rounded-lg"
                  >
                    Enroll Now (₦{course.price})
                  </Button>
                  <Button
                    onClick={() => setShowEnrollModal(false)}
                    variant="outline"
                    className="w-full rounded-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Video Modal */}
          {showVideoModal && selectedVideo && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center max-w-xl w-full border border-blue-100">
                <video
                  controls
                  src={selectedVideo}
                  className="w-full h-64 rounded-lg mb-4 shadow-lg bg-black"
                  poster={course.image_link}
                />
                <Button onClick={() => setShowVideoModal(false)} className="w-full rounded-lg">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
     </>
     
    
  );
}