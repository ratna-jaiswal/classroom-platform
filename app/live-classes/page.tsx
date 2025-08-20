"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Video, Calendar, Clock, Users, Play, AlertCircle, Plus } from "lucide-react"

export default function LiveClassesPage() {
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

  const liveClasses = [
    {
      id: 1,
      title: "Advanced Calculus - Integration Techniques",
      subject: "Mathematics",
      teacher: "Prof. Smith",
      startTime: "2024-01-16T14:00:00",
      duration: 60,
      status: "Live",
      participants: 28,
      maxParticipants: 50,
      description: "Deep dive into advanced integration techniques including integration by parts and substitution.",
      meetingLink: "https://meet.example.com/math-calc-123",
    },
    {
      id: 2,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      teacher: "Prof. Johnson",
      startTime: "2024-01-16T16:00:00",
      duration: 45,
      status: "Upcoming",
      participants: 0,
      maxParticipants: 40,
      description: "Understanding reaction mechanisms in organic chemistry with practical examples.",
      meetingLink: "https://meet.example.com/chem-org-456",
    },
    {
      id: 3,
      title: "Physics Problem Solving Session",
      subject: "Physics",
      teacher: "Prof. Davis",
      startTime: "2024-01-15T15:00:00",
      duration: 90,
      status: "Completed",
      participants: 35,
      maxParticipants: 45,
      description: "Interactive problem-solving session covering mechanics and thermodynamics.",
      recordingAvailable: true,
    },
  ]

  const upcomingClasses = liveClasses.filter((c) => c.status === "Upcoming")
  const liveNow = liveClasses.filter((c) => c.status === "Live")
  const completedClasses = liveClasses.filter((c) => c.status === "Completed")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "destructive"
      case "Upcoming":
        return "default"
      case "Completed":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType={userType as "student" | "teacher"} />

      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Live Classes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join interactive live sessions with your teachers and classmates.
            </p>
          </div>
          {userType === "teacher" && (
            <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Class
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Classes</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {liveClasses.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Now</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{liveNow.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{upcomingClasses.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedClasses.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Live Now Alert */}
        {liveNow.length > 0 && (
          <Alert className="mb-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-300">
              {liveNow.length} class{liveNow.length > 1 ? "es are" : " is"} currently live! Join now to not miss out.
            </AlertDescription>
          </Alert>
        )}

        {/* Live Classes */}
        {liveNow.length > 0 && (
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span>Live Now</span>
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Classes currently in session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveNow.map((classItem) => (
                  <LiveClassCard key={classItem.id} classItem={classItem} userType={userType} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Classes */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Upcoming Classes</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Your scheduled live sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.length > 0 ? (
                upcomingClasses.map((classItem) => (
                  <LiveClassCard key={classItem.id} classItem={classItem} userType={userType} />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No upcoming classes scheduled</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Completed Classes */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Recent Classes</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Previously conducted live sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedClasses.map((classItem) => (
                <LiveClassCard key={classItem.id} classItem={classItem} userType={userType} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LiveClassCard({ classItem, userType }: { classItem: any; userType: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "destructive"
      case "Upcoming":
        return "default"
      case "Completed":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Card
      className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-md ${classItem.status === "Live" ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20" : ""}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium text-lg text-gray-900 dark:text-white">{classItem.title}</h4>
              <Badge variant={getStatusColor(classItem.status)}>{classItem.status}</Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{classItem.description}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
                    {classItem.teacher
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{classItem.teacher}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(classItem.startTime)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>
                  {formatTime(classItem.startTime)} ({classItem.duration} min)
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>
                  {classItem.participants}/{classItem.maxParticipants}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {classItem.status === "Live" && (
              <Button className="bg-red-600 hover:bg-red-700">
                <Video className="h-4 w-4 mr-2" />
                Join Live
              </Button>
            )}
            {classItem.status === "Upcoming" && (
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Set Reminder
              </Button>
            )}
            {classItem.status === "Completed" && classItem.recordingAvailable && (
              <Button variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Watch Recording
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
