"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
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

interface CourseDetailProps {
  course: Course;
  onClose: () => void;
}

export function CourseDetail({ course, onClose }: CourseDetailProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const getModuleProgress = (module: Module) => {
    const totalLessons = module.lessons.length;
    const completedLessons = module.lessons.filter(
      (lesson) => !!(lesson as any).completed
    ).length;
    return (completedLessons / totalLessons) * 100;
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  return (
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
                    <span>{course?.modules?.length || 0} Modules</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {(course?.modules || [])?.map((module) => (
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
                          {module.lessons.map((lesson) => (
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
                          {module.quiz && (
                            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                                <span>Quiz: {module.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {module.quiz.length} questions
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
  );
}
