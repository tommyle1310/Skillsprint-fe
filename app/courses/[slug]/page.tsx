"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Play,
  Star,
  Clock,
  Users,
  CheckCircle,
  Lock,
  ArrowLeft,
  Plus,
  HelpCircle,
} from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useAuthStore } from "@/lib/authStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";

interface Lesson {
  id: string;
  title: string;
  order: number;
  avatar?: string;
  videoUrl?: string;
}

interface QuizItem {
  id: string;
  title: string;
  order: number;
  avatar?: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  avatar?: string;
  description: string;
  price: number;
  lessons: Lesson[];
  purchaseCount: number;
  quizzes?: QuizItem[];
  createdAt: string;
  createdById?: string;
}

function useHasPurchased(userId?: string, courseId?: string) {
  const [purchased, setPurchased] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const load = async () => {
      if (!userId || !courseId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/orders?userId=${encodeURIComponent(userId)}&courseId=${encodeURIComponent(courseId)}`);
        const data = await res.json();
        if (res.ok && data.success) setPurchased(!!data.purchased);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, courseId]);
  return { purchased, loading };
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthenticated, isAdmin, user } = useAuthStore();
  const { purchased } = useHasPurchased(user?.id, course?.id);

  const refresh = async () => {
    try {
      const response = await fetch(`/api/courses/${slug}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Transform backend data
          const transformedCourse = {
            ...data.course,
            price: data.course.price / 100, // Convert from cents
          };
          setCourse(transformedCourse);
        } else {
          setError("Course not found");
        }
      } else {
        setError("Failed to fetch course");
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
      setError("An error occurred while fetching the course");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) refresh();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            Course Not Found
          </h1>
          <p className="text-slate-600">
            {error || "The course you're looking for doesn't exist."}
          </p>
          <Link href="/courses">
            <AnimatedSubscribeButton>
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </span>
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </span>
            </AnimatedSubscribeButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/courses">
            <AnimatedSubscribeButton className="flex items-center">
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </span>
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </span>
            </AnimatedSubscribeButton>
          </Link>
        </div>

        {/* Course Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Course Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <BorderBeam className="rounded-2xl" />
              <img
                src={
                  course.avatar ||
                  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"
                }
                alt={course.title}
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Course Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">
                  {course.lessons.length}
                </div>
                <div className="text-sm text-slate-600">Lessons</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">
                  {Math.ceil(course.lessons.length * 0.4)}
                </div>
                <div className="text-sm text-slate-600">Hours</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">
                  {course.purchaseCount}
                </div>
                <div className="text-sm text-slate-600">Students</div>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${course.price}
                </span>
                {course.price > 79 && (
                  <span className="text-xl text-slate-400 line-through">
                    ${Math.round(course.price * 1.2)}
                  </span>
                )}
              </div>

              <div className="flex space-x-4">
                {(() => {
                  const isOwner = user?.id && course.createdById && user.id === course.createdById;
                  if (isOwner) {
                    return (
                      <Link href={`/courses/${course.slug}?edit=1`}>
                        <InteractiveHoverButton className="h-12">
                          <div className="flex items-center gap-2">
                            <Plus className="w-5 h-5 mr-2" />
                            Update Course
                          </div>
                        </InteractiveHoverButton>
                      </Link>
                    );
                  }
                  if (purchased) {
                    return (
                      null
                    );
                  }
                  return (
                    <ShimmerButton
                      className="flex-1 h-12"
                      onClick={() => {
                        if (!course) return;
                        window.location.href = `/checkout/${course.slug}`;
                      }}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Enroll Now
                    </ShimmerButton>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Tools */}
        {(() => {
          const isOwner =
            isAdmin ||
            (user?.id && course.createdById && user.id === course.createdById);
          if (!isOwner) return null;
          return (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Manage Course
              </h2>
              <div className="flex flex-wrap gap-3">
                {/* Add Lesson */}
                <Dialog>
                  <DialogTrigger asChild>
                    <InteractiveHoverButton>
                      <div className="flex items-center gap-2">
                        <Plus className="w-4 h-4 mr-2" /> Add Lesson
                      </div>
                    </InteractiveHoverButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Lesson</DialogTitle>
                    </DialogHeader>
                    <AddLessonForm courseId={course.id} onCreated={refresh} />
                  </DialogContent>
                </Dialog>

                {/* Add Quiz */}
                <Dialog>
                  <DialogTrigger asChild>
                    <InteractiveHoverButton>
                      <div className="flex items-center gap-2">
                        <Plus className="w-4 h-4 mr-2" /> Add Quiz
                      </div>
                    </InteractiveHoverButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Quiz</DialogTitle>
                    </DialogHeader>
                    <AddQuizForm courseId={course.id} onCreated={refresh} />
                  </DialogContent>
                </Dialog>

                {/* Reorder */}
                <Dialog>
                  <DialogTrigger asChild>
                    <InteractiveHoverButton>
                      Reorder Items
                    </InteractiveHoverButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reorder Lessons & Quizzes</DialogTitle>
                    </DialogHeader>
                    <ReorderList course={course} onSaved={refresh} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          );
        })()}

        {/* Course Content (merged lessons + quizzes by order) */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Course Content
          </h2>
          <div className="space-y-4">
            {[
              ...course.lessons.map((l) => ({
                kind: "lesson" as const,
                id: l.id,
                order: l.order,
                title: l.title,
                avatar: l.avatar,
              })),
              ...(course.quizzes?.map((q) => ({
                kind: "quiz" as const,
                id: q.id,
                order: q.order,
                title: q.title,
              })) || []),
            ]
              .sort((a, b) => a.order - b.order)
              .map((item, index) => (
                <div
                  key={`${item.kind}-${item.id}`}
                  className="relative rounded-2xl"
                >
                  <BorderBeam className="rounded-2xl" />
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {item.kind === "lesson" ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-100">
                            <img
                              src={
                                item.avatar ||
                                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=96&h=96&fit=crop"
                              }
                              alt={item.title}
                              className="w-12 h-12 object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <HelpCircle className="w-6 h-6 text-purple-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {item.kind === "lesson" ? "Lesson: " : "Quiz: "}{" "}
                            {item.title}
                          </h3>
                          <p className="text-slate-600">
                            {item.kind === "lesson" ? "Lesson" : "Quiz"} #
                            {item.order}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isAuthenticated ? (
                          <InteractiveHoverButton className="w-50">
                            <div className="flex items-center gap-2">
                              <Play className="w-4 h-4 mr-2" />
                              {item.kind === "lesson"
                                ? "Start Lesson"
                                : "Start Quiz"}
                            </div>
                          </InteractiveHoverButton>
                        ) : (
                          <div className="flex items-center text-slate-400">
                            <Lock className="w-4 h-4 mr-2" />
                            <span className="text-sm">Login to access</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            What You&apos;ll Learn
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Master fundamental concepts and build a strong foundation
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Work on real-world projects and practical exercises
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Get hands-on experience with industry-standard tools
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Learn at your own pace with lifetime access
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Receive a certificate upon completion
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Join our community of learners and experts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Join thousands of students who have already transformed their
              careers with this course.
            </p>
            <InteractiveHoverButton className="h-14 text-lg px-8 mx-auto">
              <div className="flex items-center gap-2">
                <Play className="w-6 h-6 mr-2" />
                Enroll Now - ${course.price}
              </div>
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddLessonForm({
  courseId,
  onCreated,
}: {
  courseId: string;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);
  return (
    <div className="space-y-3">
      {saving && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <LoadingSpinner variant="spinner" size="lg" />
        </div>
      )}
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="MP4 URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <Input
        placeholder="Thumbnail URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <Button
        disabled={saving}
        onClick={async () => {
          try {
            setSaving(true);
            const res = await fetch("/api/lessons", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ courseId, title, videoUrl, avatar }),
            });
            const data = await res.json();
            if (data.success) onCreated();
          } finally {
            setSaving(false);
          }
        }}
      >
        {saving ? <LoadingSpinner variant="spinner" size="sm" /> : 'Create'}
      </Button>
    </div>
  );
}

function AddQuizForm({
  courseId,
  onCreated,
}: {
  courseId: string;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { q: "", a: ["", ""], correct: 0 },
  ]);
  const [saving, setSaving] = useState(false);
  return (
    <div className="space-y-3">
      {saving && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <LoadingSpinner variant="spinner" size="lg" />
        </div>
      )}
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="space-y-2">
        {questions.map((item, idx) => (
          <div key={idx} className="border p-2 rounded">
            <Input
              placeholder="Question"
              value={item.q}
              onChange={(e) => {
                const next = [...questions];
                next[idx].q = e.target.value;
                setQuestions(next);
              }}
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              {item.a.map((ans, ai) => (
                <Input
                  key={ai}
                  placeholder={`Choice ${ai + 1}`}
                  value={ans}
                  onChange={(e) => {
                    const next = [...questions];
                    next[idx].a[ai] = e.target.value;
                    setQuestions(next);
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const next = [...questions];
                  next[idx].a.push("");
                  setQuestions(next);
                }}
              >
                Add Choice
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const next = [...questions];
                  if (next[idx].a.length > 2) {
                    next[idx].a.pop();
                    setQuestions(next);
                  }
                }}
              >
                Remove Choice
              </Button>
            </div>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setQuestions((q) => [...q, { q: "", a: ["", ""], correct: 0 }])
          }
        >
          Add Question
        </Button>
      </div>
      <Button
        disabled={saving}
        onClick={async () => {
          try {
            setSaving(true);
            const res = await fetch("/api/quizzes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ courseId, title, questions }),
            });
            const data = await res.json();
            if (data.success) onCreated();
          } finally {
            setSaving(false);
          }
        }}
      >
        {saving ? <LoadingSpinner variant="spinner" size="sm" /> : 'Create Quiz'}
      </Button>
    </div>
  );
}

function ReorderList({
  course,
  onSaved,
}: {
  course: Course;
  onSaved: () => void;
}) {
  const [items, setItems] = useState([
    ...course.lessons.map((l) => ({
      id: l.id,
      type: "lesson",
      title: l.title,
    })),
    ...(course.quizzes?.map((q) => ({
      id: q.id,
      type: "quiz",
      title: q.title,
    })) || []),
  ]);
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    const sourceId = e.dataTransfer.getData("text/plain");
    const next = [...items];
    const from = next.findIndex((i) => i.id === sourceId);
    const to = next.findIndex((i) => i.id === targetId);
    if (from < 0 || to < 0) return;
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setItems(next);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const [saving, setSaving] = useState(false);
  const save = async () => {
    setSaving(true);
    const lessonIds = items.filter((i) => i.type === "lesson").map((i) => i.id);
    const quizIds = items.filter((i) => i.type === "quiz").map((i) => i.id);
    try {
      if (lessonIds.length) {
        await fetch("/api/lessons", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: lessonIds }),
        });
      }
      if (quizIds.length) {
        await fetch("/api/quizzes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: quizIds }),
        });
      }
      onSaved();
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
      {saving && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <LoadingSpinner variant="spinner" size="lg" />
        </div>
      )}
      <div className="space-y-2">
        {items.map((it) => (
          <div
            key={it.id}
            draggable
            onDragStart={(e) => onDragStart(e, it.id)}
            onDrop={(e) => onDrop(e, it.id)}
            onDragOver={onDragOver}
            className="border rounded p-2 bg-slate-50"
          >
            {it.type.toUpperCase()}: {it.title}
          </div>
        ))}
      </div>
      <Button className="mt-3" onClick={save} disabled={saving}>
        {saving ? <LoadingSpinner variant="spinner" size="sm" /> : "Save Order"}
      </Button>
    </div>
  );
}
