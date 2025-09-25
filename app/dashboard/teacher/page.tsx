"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  TrendingUp,
  MessageSquare,
  Video,
  FileText,
  CheckCircle,
  Clock,
  Target,
  Activity,
  GraduationCap,
} from "lucide-react"

export default function TeacherDashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const userType = localStorage.getItem("userType")
    if (!userType || userType !== "teacher") {
      router.push("/login/teacher")
    }
  }, [router])

  if (!mounted) {
    return null
  }

  const upcomingClasses = [
    { subject: "Advanced Mathematics", time: "10:00 AM", students: 25, room: "Room 101" },
    { subject: "Calculus II", time: "2:00 PM", students: 30, room: "Room 205" },
    { subject: "Statistics", time: "4:00 PM", students: 22, room: "Room 301" },
  ]

  const recentActivities = [
    { action: "Graded Assignment", subject: "Mathematics", count: 25, time: "2 hours ago" },
    { action: "Posted Resource", subject: "Calculus", count: 1, time: "4 hours ago" },
    { action: "Answered Doubts", subject: "Statistics", count: 8, time: "6 hours ago" },
  ]

  const classPerformance = [
    { subject: "Advanced Math", average: 85, students: 25, color: "from-blue-500 to-cyan-600" },
    { subject: "Calculus II", average: 78, students: 30, color: "from-purple-500 to-indigo-600" },
    { subject: "Statistics", average: 92, students: 22, color: "from-green-500 to-emerald-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType="teacher" />

      {/* Main Content */}
      <div className="lg:ml-80 p-4 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8 slide-in-up">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Good morning, Prof. Smith! 👨‍🏫</h1>
                  <p className="text-emerald-100 dark:text-emerald-200 text-lg">Ready to inspire minds today?</p>
                </div>
                <div className="hidden md:block">
                  <Avatar className="h-20 w-20 border-4 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">PS</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-transform hover:scale-105"> {/* MODIFIED */}
                  <div className="text-2xl font-bold">77</div>
                  <div className="text-sm text-emerald-100 dark:text-emerald-200">Total Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-transform hover:scale-105"> {/* MODIFIED */}
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-emerald-100 dark:text-emerald-200">Active Courses</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-transform hover:scale-105"> {/* MODIFIED */}
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm text-emerald-100 dark:text-emerald-200">Avg. Performance</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-transform hover:scale-105"> {/* MODIFIED */}
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-emerald-100 dark:text-emerald-200">Pending Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 slide-in-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Video,
                label: "Start Live Class",
                color: "from-red-500 to-pink-600",
                href: "/live-classes/manage",
              },
              {
                icon: BookOpen,
                label: "Create Assignment",
                color: "from-blue-500 to-cyan-600",
                href: "/assignments/manage",
              },
              { icon: MessageSquare, label: "Answer Doubts", color: "from-purple-500 to-indigo-600", href: "/doubts" },
              {
                icon: FileText,
                label: "Upload Resource",
                color: "from-green-500 to-emerald-600",
                href: "/resources/manage",
              },
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex-col space-y-2 border-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                onClick={() => router.push(action.href)}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Classes */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 dark:text-white">Today's Classes</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Your scheduled classes for today
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                    3 Classes
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((class_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-0.5 transition-all" // MODIFIED
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{class_.subject}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {class_.students} students • {class_.room}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-emerald-600 dark:text-emerald-400">{class_.time}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Today</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Class Performance */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 dark:text-white">Class Performance</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Average scores by subject
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => router.push("/analytics")} className="btn-animate"> {/* MODIFIED */}
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {classPerformance.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center`}
                          >
                            <BookOpen className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{subject.subject}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{subject.students} students</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-gray-900 dark:text-white">{subject.average}%</div>
                        </div>
                      </div>
                      <Progress value={subject.average} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Activities */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-right">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Recent Activities</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">Your latest actions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700" // MODIFIED
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{activity.action}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {activity.subject} • {activity.count} items
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-right">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Pending Tasks</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Items requiring attention
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800 transition-all hover:-translate-y-0.5 hover:bg-red-100 dark:hover:bg-red-900/30"> {/* MODIFIED */}
                    <div>
                      <h4 className="font-semibold text-red-900 dark:text-red-300 text-sm">Grade Assignments</h4>
                      <p className="text-xs text-red-600 dark:text-red-400">12 submissions pending</p>
                    </div>
                    <Badge variant="destructive">Urgent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800 transition-all hover:-translate-y-0.5 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"> {/* MODIFIED */}
                    <div>
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 text-sm">Update Attendance</h4>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400">3 classes pending</p>
                    </div>
                    <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">
                      Medium
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 transition-all hover:-translate-y-0.5 hover:bg-blue-100 dark:hover:bg-blue-900/30"> {/* MODIFIED */}
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-sm">Prepare Materials</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400">Next week's classes</p>
                    </div>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Low</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Stats */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-right">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Teaching Stats</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">This semester</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl transition-transform hover:scale-105"> {/* MODIFIED */}
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">77</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl transition-transform hover:scale-105"> {/* MODIFIED */}
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">156</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Classes Taught</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl transition-transform hover:scale-105"> {/* MODIFIED */}
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">89</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Assignments</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl transition-transform hover:scale-105"> {/* MODIFIED */}
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4.8</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}