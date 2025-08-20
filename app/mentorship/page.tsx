"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, User, Video, Star, Plus } from "lucide-react"

export default function MentorshipPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionTopic, setSessionTopic] = useState("")
  const [sessionDescription, setSessionDescription] = useState("")

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

  const teachers = [
    {
      id: 1,
      name: "Prof. Smith",
      subject: "Mathematics",
      rating: 4.8,
      experience: "10 years",
      specialization: "Calculus, Algebra, Statistics",
      availability: "Mon-Fri, 2-5 PM",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Prof. Johnson",
      subject: "Chemistry",
      rating: 4.9,
      experience: "8 years",
      specialization: "Organic Chemistry, Physical Chemistry",
      availability: "Tue-Thu, 3-6 PM",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Prof. Davis",
      subject: "Physics",
      rating: 4.7,
      experience: "12 years",
      specialization: "Mechanics, Thermodynamics, Optics",
      availability: "Mon-Wed-Fri, 1-4 PM",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      teacher: "Prof. Smith",
      subject: "Mathematics",
      topic: "Calculus Problems",
      date: "2024-01-20",
      time: "3:00 PM",
      duration: "60 minutes",
      status: "Confirmed",
      type: "Video Call",
    },
    {
      id: 2,
      teacher: "Prof. Johnson",
      subject: "Chemistry",
      topic: "Organic Reactions",
      date: "2024-01-22",
      time: "4:00 PM",
      duration: "45 minutes",
      status: "Pending",
      type: "In-Person",
    },
  ]

  const pastSessions = [
    {
      id: 1,
      teacher: "Prof. Davis",
      subject: "Physics",
      topic: "Newton's Laws",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "60 minutes",
      rating: 5,
      feedback: "Very helpful session. Cleared all my doubts about force and motion.",
    },
  ]

  const handleBookSession = () => {
    console.log("Booking session:", {
      teacher: selectedTeacher,
      date: selectedDate,
      time: selectedTime,
      topic: sessionTopic,
      description: sessionDescription,
    })
    setIsBookingOpen(false)
    setSelectedTeacher("")
    setSelectedDate("")
    setSelectedTime("")
    setSessionTopic("")
    setSessionDescription("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType={userType as "student" | "teacher"} />

      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              1:1 Mentorship
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connect directly with teachers for personalized guidance.
            </p>
          </div>
          {userType === "student" && (
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Book Session
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-white">Book Mentorship Session</DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    Schedule a one-on-one session with your preferred teacher.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="teacher" className="text-gray-700 dark:text-gray-300">
                      Select Teacher
                    </Label>
                    <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                      <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Choose a teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.name}>
                            {teacher.name} - {teacher.subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">
                        Preferred Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-gray-700 dark:text-gray-300">
                        Preferred Time
                      </Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="topic" className="text-gray-700 dark:text-gray-300">
                      Session Topic
                    </Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Calculus Problems, Organic Chemistry"
                      value={sessionTopic}
                      onChange={(e) => setSessionTopic(e.target.value)}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you'd like to discuss in this session..."
                      value={sessionDescription}
                      onChange={(e) => setSessionDescription(e.target.value)}
                      rows={3}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleBookSession}>Book Session</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Available Teachers */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Available Teachers</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Choose from our experienced faculty members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <Card key={teacher.id} className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={teacher.image || "/placeholder.svg"} alt={teacher.name} />
                        <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">{teacher.name}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          {teacher.subject}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-gray-700 dark:text-gray-300">{teacher.rating}/5.0</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{teacher.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{teacher.availability}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{teacher.specialization}</p>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        {userType === "student" && upcomingSessions.length > 0 && (
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Upcoming Sessions</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Your scheduled mentorship sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{session.topic}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        with {session.teacher} • {session.subject}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {session.time} ({session.duration})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Video className="h-4 w-4" />
                          <span>{session.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={session.status === "Confirmed" ? "default" : "secondary"}>{session.status}</Badge>
                      <Button variant="outline" size="sm">
                        {session.type === "Video Call" ? "Join Call" : "View Details"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Past Sessions */}
        {userType === "student" && pastSessions.length > 0 && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Past Sessions</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Your completed mentorship sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{session.topic}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          with {session.teacher} • {session.subject}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <span>{session.date}</span>
                          <span>{session.time}</span>
                          <span>{session.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < session.rating ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                      "{session.feedback}"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Teacher View */}
        {userType === "teacher" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Upcoming Sessions</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Your scheduled mentorship sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30">
                    <h4 className="font-medium text-gray-900 dark:text-white">Calculus Problems</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">with John Doe</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Jan 20, 2024</span>
                      <span>3:00 PM</span>
                      <span>60 minutes</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Session Requests</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Pending mentorship requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30">
                    <h4 className="font-medium text-gray-900 dark:text-white">Organic Reactions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Requested by Jane Smith</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Preferred: Jan 22, 4:00 PM</p>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm">Accept</Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
