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
  Award,
  MessageSquare,
  Video,
  FileText,
  Star,
  Target,
  Activity,
} from "lucide-react"

export default function StudentDashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const userType = localStorage.getItem("userType")
    if (!userType || userType !== "student") {
      router.push("/login/student")
    }
  }, [router])

  if (!mounted) {
    return null
  }

  const upcomingClasses = [
    { subject: "Mathematics", time: "10:00 AM", teacher: "Dr. Smith", room: "Room 101" },
    { subject: "Physics", time: "2:00 PM", teacher: "Prof. Johnson", room: "Lab 201" },
    { subject: "Chemistry", time: "4:00 PM", teacher: "Dr. Brown", room: "Lab 301" },
  ]

  const recentAssignments = [
    { title: "Calculus Problem Set", subject: "Mathematics", dueDate: "Tomorrow", status: "pending" },
    { title: "Physics Lab Report", subject: "Physics", dueDate: "Dec 20", status: "submitted" },
    { title: "Chemical Equations", subject: "Chemistry", dueDate: "Dec 22", status: "pending" },
  ]

  const achievements = [
    { title: "Perfect Attendance", description: "30 days streak", icon: Award, color: "text-yellow-600" },
    { title: "Top Performer", description: "Mathematics", icon: Star, color: "text-blue-600" },
    { title: "Assignment Master", description: "100% completion", icon: Target, color: "text-green-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType="student" />

      {/* Main Content */}
      <div className="lg:ml-80 p-4 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8 slide-in-up">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
                  <p className="text-blue-100 dark:text-blue-200 text-lg">Ready to continue your learning journey?</p>
                </div>
                <div className="hidden md:block">
                  <Avatar className="h-20 w-20 border-4 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm text-blue-100 dark:text-blue-200">Overall Progress</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-blue-100 dark:text-blue-200">Courses</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-blue-100 dark:text-blue-200">Attendance</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">A+</div>
                  <div className="text-sm text-blue-100 dark:text-blue-200">Average Grade</div>
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
              { icon: Video, label: "Join Live Class", color: "from-red-500 to-pink-600", href: "/live-classes" },
              { icon: BookOpen, label: "View Assignments", color: "from-blue-500 to-cyan-600", href: "/assignments" },
              { icon: MessageSquare, label: "Ask Doubts", color: "from-purple-500 to-indigo-600", href: "/doubts" },
              { icon: FileText, label: "Resources", color: "from-green-500 to-emerald-600", href: "/resources" },
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
            {/* Today's Schedule */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 dark:text-white">Today's Schedule</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Your upcoming classes
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">3 Classes</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((class_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{class_.subject}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {class_.teacher} • {class_.room}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600 dark:text-blue-400">{class_.time}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Today</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Assignments */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 dark:text-white">Recent Assignments</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Track your assignment progress
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => router.push("/assignments")}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssignments.map((assignment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${assignment.status === "submitted" ? "bg-green-500" : "bg-yellow-500"}`}
                        ></div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{assignment.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={assignment.status === "submitted" ? "default" : "secondary"}>
                          {assignment.status === "submitted" ? "Submitted" : "Pending"}
                        </Badge>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Due: {assignment.dueDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Performance Overview */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-right">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Performance</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Your academic progress
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Assignment Completion</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">92%</span>
                  </div>
                  <Progress value={92} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Attendance Rate</span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">98%</span>
                  </div>
                  <Progress value={98} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-right">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Achievements</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Your recent accomplishments
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-600 flex items-center justify-center`}
                      >
                        <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-right">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Quick Stats</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">At a glance</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Courses</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">8</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Assignments</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">5</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Certificates</div>
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
