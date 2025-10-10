"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, MapPin, AlertCircle, Plus } from "lucide-react"

export default function SchedulePage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const type = localStorage.getItem("userType")
    if (!type) {
      router.push("/")
      return
    }
    setUserType(type)
  }, [router])

  if (!userType) {
    return <div>Loading...</div>
  }

  const todaySchedule = [
    {
      id: 1,
      subject: "Mathematics",
      time: "9:00 AM - 10:00 AM",
      room: "Room 101",
      teacher: "Prof. Smith",
      type: "Regular Class",
      status: "Completed",
    },
    {
      id: 2,
      subject: "Physics",
      time: "11:00 AM - 12:00 PM",
      room: "Lab 201",
      teacher: "Prof. Davis",
      type: "Lab Session",
      status: "In Progress",
    },
    {
      id: 3,
      subject: "Chemistry",
      time: "2:00 PM - 3:00 PM",
      room: "Room 103",
      teacher: "Prof. Johnson",
      type: "Regular Class",
      status: "Upcoming",
    },
  ]

  const weekSchedule = [
    {
      day: "Monday",
      classes: [
        { subject: "Mathematics", time: "9:00-10:00", room: "101" },
        { subject: "Physics", time: "11:00-12:00", room: "201" },
        { subject: "Chemistry", time: "2:00-3:00", room: "103" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { subject: "English", time: "9:00-10:00", room: "105" },
        { subject: "Mathematics", time: "11:00-12:00", room: "101" },
        { subject: "Physics", time: "2:00-3:00", room: "201" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { subject: "Chemistry", time: "9:00-10:00", room: "103" },
        { subject: "English", time: "11:00-12:00", room: "105" },
        { subject: "Mathematics", time: "2:00-3:00", room: "101" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { subject: "Physics", time: "9:00-10:00", room: "201" },
        { subject: "Chemistry", time: "11:00-12:00", room: "103" },
        { subject: "English", time: "2:00-3:00", room: "105" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { subject: "Mathematics", time: "9:00-10:00", room: "101" },
        { subject: "Physics", time: "11:00-12:00", room: "201" },
        { subject: "Chemistry", time: "2:00-3:00", room: "103" },
      ],
    },
  ]

  const holidays = [
    { date: "2024-01-26", name: "Republic Day", type: "National Holiday" },
    { date: "2024-03-08", name: "Holi", type: "Festival Holiday" },
    { date: "2024-04-14", name: "Good Friday", type: "Religious Holiday" },
  ]

  const examSchedule = [
    { date: "2024-02-15", subject: "Mathematics", time: "9:00 AM - 12:00 PM", type: "Mid-term" },
    { date: "2024-02-17", subject: "Physics", time: "9:00 AM - 12:00 PM", type: "Mid-term" },
    { date: "2024-02-19", subject: "Chemistry", time: "9:00 AM - 12:00 PM", type: "Mid-term" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"
      case "In Progress":
        return "destructive"
      case "Upcoming":
        return "secondary"
      case "Cancelled":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType={userType as "student" | "teacher"} />

      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Schedule
            </h1>
            <p className="text-gray-600 dark:text-gray-400">View your class schedule, holidays, and exam timetable.</p>
          </div>
          {userType === "teacher" && (
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          )}
        </div>

        {/* Today's Schedule */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Today's Schedule</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your classes for today - {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((classItem) => (
                <div
                  key={classItem.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                >
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        classItem.status === "Completed"
                          ? "bg-green-500"
                          : classItem.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                      }`}
                    ></div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{classItem.subject}</h4>
                      <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1 truncate">
                          <Clock className="h-4 w-4" />
                          <span className="truncate">{classItem.time}</span>
                        </div>
                        <div className="flex items-center space-x-1 truncate">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{classItem.room}</span>
                        </div>
                        <span className="truncate">with {classItem.teacher}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 flex-wrap">
                    <Badge variant="outline">{classItem.type}</Badge>
                    <Badge variant={getStatusColor(classItem.status)}>{classItem.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Weekly Schedule</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your complete weekly timetable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {weekSchedule.map((day) => (
                <div
                  key={day.day}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white/50 dark:bg-gray-700/30"
                >
                  <h4 className="font-medium mb-3 text-center text-gray-900 dark:text-white truncate">{day.day}</h4>
                  <div className="space-y-2">
                    {day.classes.map((classItem, index) => (
                      <div key={index} className="text-sm p-2 bg-gray-50 dark:bg-gray-600/50 rounded">
                        <div className="font-medium text-gray-900 dark:text-white truncate">{classItem.subject}</div>
                        <div className="text-gray-600 dark:text-gray-400 truncate">{classItem.time}</div>
                        <div className="text-gray-500 dark:text-gray-400 truncate">Room {classItem.room}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Holidays */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Upcoming Holidays</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Scheduled holidays and breaks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {holidays.map((holiday, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{holiday.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{holiday.date}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge variant="outline">{holiday.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exam Schedule */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Exam Schedule</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Upcoming examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {examSchedule.map((exam, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{exam.subject}</h4>
                      <div className="flex-shrink-0"><Badge variant="destructive">{exam.type}</Badge></div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{exam.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{exam.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reschedule Notifications */}
        {userType === "student" && (
          <Card className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <span>Schedule Changes</span>
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Recent updates to your schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
                  <AlertDescription className="text-orange-800 dark:text-orange-300">
                    <h4 className="font-medium">Mathematics Class Rescheduled</h4>
                    <p className="text-sm mt-1">
                      Tomorrow's Mathematics class has been moved from 9:00 AM to 11:00 AM due to faculty meeting.
                    </p>
                    <p className="text-xs mt-2">Updated 2 hours ago</p>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
