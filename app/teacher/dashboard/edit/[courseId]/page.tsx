"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Image from "next/image";
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
// import Image from "next/image";

type Instructor = {
  fullname: string;
  email: string;
  token: string;
  id: string;
};

interface Course {
  name: string;
  description: string;
  price: string;
  category: string[];
  image_link?: string;
  discount?: string;
  modules?: Module[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz?: Quiz;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  video_link?: string;
  video_file?: File;
}

interface Quiz {
  id: string;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

interface Option {
  id: string;
  value: string;
  answer: boolean;
}

export default function EditCourse() {
  const router = useRouter();
  const { courseId } = useParams();
  const [instructor, setInstructor] = useState<Instructor>({
    fullname: "Loading...",
    email: "",
    id: "",
    token: "",
  });
  const [course, setCourse] = useState<Course>({
    name: "",
    description: "",
    price: "",
    category: [],
    modules: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const userData = localStorage.getItem("userData");
        const parsedUserData = JSON.parse(userData || "{}");
        const token = parsedUserData.token;

        const response = await fetch(
          `https://api.a1schools.org/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }

        const data = await response.json();
        setCourse({
          name: data.data.name,
          description: data.data.description,
          price: data.data.price.toString(),
          category: Array.isArray(data.data.category)
            ? data.data.category.map((cat: any) =>
                typeof cat === "object" ? cat.name : cat
              )
            : [data.data.category],
          image_link: data.data.image_link,
          discount: data.data.discount,
          modules: data.data.modules || [],
        });
        if (data.data.image_link) {
          setPreviewUrl(data.data.image_link);
        }
      } catch (error) {
        toast.error("Failed to load course");
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (
    moduleId: string,
    lessonId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourse((prev) => ({
        ...prev,
        modules: prev.modules?.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons.map((lesson) =>
                  lesson.id === lessonId
                    ? { ...lesson, video_file: file }
                    : lesson
                ),
              }
            : module
        ),
      }));
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => router.push("/teacher/dashboard");

  const handleAddModule = () => {
    setCourse((prev) => ({
      ...prev,
      modules: [
        ...(prev.modules || []),
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          lessons: [],
        },
      ],
    }));
  };

  const handleModuleChange = (
    moduleId: string,
    field: string,
    value: string
  ) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules?.map((module) =>
        module.id === moduleId ? { ...module, [field]: value } : module
      ),
    }));
  };

  const handleAddLesson = (moduleId: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules?.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: Date.now().toString(),
                  title: "",
                  description: "",
                  duration: "",
                },
              ],
            }
          : module
      ),
    }));
  };

  const handleLessonChange = (
    moduleId: string,
    lessonId: string,
    field: string,
    value: string
  ) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules?.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
              ),
            }
          : module
      ),
    }));
  };

  const handleEdit = async () => {
    setSaving(true);
    try {
      const userData = localStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData || "{}");
      const token = parsedUserData.token;

      // First, update the course details
      const response = await fetch(
        `https://api.a1schools.org/courses/${courseId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...course,
            price: parseFloat(course.price),
            category: course.category.map((cat: any) =>
              typeof cat === "object" ? cat.name : cat
            ),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update course");
      }

      // If there's a new image, upload it
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const imageResponse = await fetch(
          `https://api.a1schools.org/courses/${courseId}/image`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!imageResponse.ok) {
          throw new Error("Failed to upload image");
        }
      }

      // Update modules and lessons
      for (const courseModule of course.modules || []) {
        // Update or create module
        const moduleResponse = await fetch(
          `https://api.a1schools.org/courses/${courseId}/modules`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: courseModule.title,
              description: courseModule.description,
            }),
          }
        );

        if (!moduleResponse.ok) {
          throw new Error(`Failed to update module: ${courseModule.title}`);
        }

        const moduleData = await moduleResponse.json();
        const moduleId = moduleData.data.id;

        // Update lessons
        for (const lesson of courseModule.lessons) {
          const lessonResponse = await fetch(
            `https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/lessons`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: lesson.title,
                description: lesson.description,
                duration: lesson.duration,
              }),
            }
          );

          if (!lessonResponse.ok) {
            throw new Error(`Failed to update lesson: ${lesson.title}`);
          }

          const lessonData = await lessonResponse.json();
          const lessonId = lessonData.data.id;

          // Upload video if present
          if (lesson.video_file) {
            const videoFormData = new FormData();
            videoFormData.append("file", lesson.video_file);

            const videoResponse = await fetch(
              `https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/video`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: videoFormData,
              }
            );

            if (!videoResponse.ok) {
              throw new Error(
                `Failed to upload video for lesson: ${lesson.title}`
              );
            }
          }
        }
      }

      toast.success("Course updated successfully!");
      router.push("/teacher/dashboard");
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error(
        error instanceof Error ? error.message : "Update failed. Try again."
      );
    } finally {
      setSaving(false);
    }
  };
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
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="flex items-center gap-2 px-4">
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
                    <DollarSign className="h-4 w-4" />
                    <span>Wallet</span>
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
                    <span className="text-[red]">Log Out</span>
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
                <span className="text-sm font-medium">
                  {instructor.fullname}
                </span>
                <span className="text-xs text-muted-foreground">
                  {instructor.email}
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarTrigger className="h-10 w-10 mt-[30px] ml-[30px] lg:hidden border border-gray-300 rounded-md flex items-center justify-center absolute right-4 bg-white">
          <PanelLeft className="h-4 w-4" />
        </SidebarTrigger>

        <div className="max-w-4xl mx-auto mt-10">
          <Card className="shadow-2xl rounded-2xl mb-6">
            <CardHeader>
              <CardTitle>Edit Course</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-10">Loading...</p>
              ) : (
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Course Image
                    </label>
                    <div className="flex items-center gap-4">
                      {previewUrl && (
                        <div className="relative w-32 h-32">
                          <Image
                            src={previewUrl}
                            alt="Course preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      name="name"
                      placeholder="Course Name"
                      value={course.name}
                      onChange={handleChange}
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea
                      name="description"
                      placeholder="Course Description"
                      value={course.description}
                      onChange={handleChange}
                      className="rounded-xl"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Price ($)
                      </label>
                      <Input
                        name="price"
                        type="number"
                        placeholder="0.00"
                        value={course.price}
                        onChange={handleChange}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Category
                      </label>
                      <Select
                        name="category"
                        value={course.category[0]}
                        onValueChange={(value) =>
                          setCourse((prev) => ({ ...prev, category: [value] }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Modules</h3>
                      <Button onClick={handleAddModule} className="rounded-xl">
                        Add Module
                      </Button>
                    </div>

                    {course.modules?.map((module) => (
                      <Card key={module.id} className="mb-4">
                        <CardContent className="pt-6">
                          <div className="grid gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Module Title
                              </label>
                              <Input
                                value={module.title}
                                onChange={(e) =>
                                  handleModuleChange(
                                    module.id,
                                    "title",
                                    e.target.value
                                  )
                                }
                                className="rounded-xl"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Module Description
                              </label>
                              <Textarea
                                value={module.description}
                                onChange={(e) =>
                                  handleModuleChange(
                                    module.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="rounded-xl"
                                rows={3}
                              />
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="text-md font-semibold">
                                  Lessons
                                </h4>
                                <Button
                                  onClick={() => handleAddLesson(module.id)}
                                  className="rounded-xl"
                                >
                                  Add Lesson
                                </Button>
                              </div>

                              {module.lessons.map((lesson) => (
                                <Card key={lesson.id} className="mb-4">
                                  <CardContent className="pt-6">
                                    <div className="grid gap-4">
                                      <div>
                                        <label className="block text-sm font-medium mb-1">
                                          Lesson Title
                                        </label>
                                        <Input
                                          value={lesson.title}
                                          onChange={(e) =>
                                            handleLessonChange(
                                              module.id,
                                              lesson.id,
                                              "title",
                                              e.target.value
                                            )
                                          }
                                          className="rounded-xl"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium mb-1">
                                          Lesson Description
                                        </label>
                                        <Textarea
                                          value={lesson.description}
                                          onChange={(e) =>
                                            handleLessonChange(
                                              module.id,
                                              lesson.id,
                                              "description",
                                              e.target.value
                                            )
                                          }
                                          className="rounded-xl"
                                          rows={2}
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium mb-1">
                                          Duration (minutes)
                                        </label>
                                        <Input
                                          type="number"
                                          value={lesson.duration}
                                          onChange={(e) =>
                                            handleLessonChange(
                                              module.id,
                                              lesson.id,
                                              "duration",
                                              e.target.value
                                            )
                                          }
                                          className="rounded-xl"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium mb-1">
                                          Video
                                        </label>
                                        <input
                                          type="file"
                                          accept="video/*"
                                          onChange={(e) =>
                                            handleVideoChange(
                                              module.id,
                                              lesson.id,
                                              e
                                            )
                                          }
                                          className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                        />
                                        {lesson.video_link && (
                                          <div className="mt-2">
                                            <video
                                              src={lesson.video_link}
                                              controls
                                              className="w-full h-[200px] rounded-lg"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="rounded-xl"
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleEdit}
                      className="rounded-xl"
                      disabled={saving}
                    >
                      {saving ? "Updating..." : "Update"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarProvider>
    </>
  );
}
