"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CheckCircle, XCircle, Clock, TrendingUp, AlertTriangle, Users, BookOpen } from "lucide-react"

export default function AttendancePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

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

  const attendanceData = [
    { subject: "Mathematics", present: 28, total: 30, percentage: 93.3, status: "excellent" },
    { subject: "Physics", present: 25, total: 28, percentage: 89.3, status: "good" },
    { subject: "Chemistry", present: 22, total: 26, percentage: 84.6, status: "good" },
    { subject: "English", present: 24, total: 25, percentage: 96.0, status: "excellent" },
    { subject: "Computer Science", present: 20, total: 24, percentage: 83.3, status: "warning" },
  ]

  const recentAttendance = [
    { date: "2024-12-18", subject: "Mathematics", status: "present", time: "10:00 AM" },
    { date: "2024-12-18", subject: "Physics", status: "present", time: "2:00 PM" },
    { date: "2024-12-17", subject: "Chemistry", status: "absent", time: "11:00 AM" },
    { date: "2024-12-17", subject: "English", status: "present", time: "3:00 PM" },
    { date: "2024-12-16", subject: "Computer Science", status: "present", time: "9:00 AM" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "good":
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      case "warning":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "danger":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
      case "late":
        return <Clock className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    }
  }

  const overallAttendance = attendanceData.reduce((acc, curr) => acc + curr.percentage, 0) / attendanceData.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType="student" />

      <div className="lg:ml-80 p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 slide-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Attendance Tracker</h1>
              <p className="text-gray-600 dark:text-gray-400">Monitor your class attendance and maintain consistency</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {overallAttendance.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Overall</div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8 slide-in-left">
          <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Classes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">133</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Present</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">119</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Absent</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">14</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance Rate</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{overallAttendance.toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subject-wise Attendance */}
          <div className="lg:col-span-2">
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-up">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Subject-wise Attendance</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Your attendance breakdown by subject
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {attendanceData.map((subject, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{subject.subject}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {subject.present}/{subject.total} classes
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-gray-900 dark:text-white">
                            {subject.percentage.toFixed(1)}%
                          </div>
                          <Badge className={`text-xs ${getStatusColor(subject.status)}`}>{subject.status}</Badge>
                        </div>
                      </div>
                      <Progress value={subject.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Attendance */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mt-8 slide-in-up">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Recent Attendance</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Your latest class attendance records
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAttendance.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(record.status)}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{record.subject}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{record.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{record.date}</div>
                        <Badge variant={record.status === "present" ? "default" : "destructive"} className="text-xs">
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar and Alerts */}
          <div className="space-y-8">
            {/* Calendar */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-right">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Calendar</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Select date to view details
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>

            {/* Attendance Alerts */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-right">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Attendance Alerts</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Important notifications
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 text-sm">
                          Low Attendance Warning
                        </h4>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                          Computer Science attendance is below 85%. Attend next 3 classes to improve.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-sm">Excellent Attendance</h4>
                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                          Great job! Your Mathematics attendance is above 90%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Goals */}
            <Card className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm slide-in-right">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Attendance Goals</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">Track your progress</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Goal</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">92%</span>
                    </div>
                    <Progress value={92} className="h-3" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: 90%</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Semester Goal</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">89%</span>
                    </div>
                    <Progress value={89} className="h-3" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: 85%</p>
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
