"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"ide-react"
import { Video, Calendar, Clock, Users, Play, AlertCircle, Plus } from "lucide-react"
export default function SchedulePage() {abel"
export default function LiveClassesPage() { SelectTrigger, SelectValue } from "@/components/ui/select"
  const router = useRouter()pe] = useState<string | null>(null)
  const [userType, setUserType] = useState<string | null>(null)
  useEffect(() => {
  useEffect(() => {calStorage.getItem("userType")
    const type = localStorage.getItem("userType")
    if (!type) {h("/")
      router.push("/")
      returnmponents/ui/dialog"
    }etUserType(type)ock, User, Video, Star, Plus } from "lucide-react"
    setUserType(type)
  }, [router]) function MentorshipPage() {
  if (!userType) {seRouter()
  if (!userType) {ading...</div>= useState<string | null>(null)
    return <div>Loading...</div>kingOpen] = useState(false)
  }onst [selectedTeacher, setSelectedTeacher] = useState("")
  const todaySchedule = [tSelectedDate] = useState("")
  const liveClasses = [setSelectedTime] = useState("")
    { id: 1,sionTopic, setSessionTopic] = useState("")
      id: 1,sionDescription, setSessionDescription] = useState("")
      title: "Advanced Calculus - Integration Techniques",
      subject: "Mathematics",
      teacher: "Prof. Smith",.getItem("userType")
      startTime: "2024-01-16T14:00:00",
      duration: 60,/")ed",
      status: "Live",
      participants: 28,
      maxParticipants: 50,
      description: "Deep dive into advanced integration techniques including integration by parts and substitution.",
      meetingLink: "https://meet.example.com/math-calc-123",
    },!userType) {01",
    {eturn <div>Loading...</div>
      id: 2,"Lab Session",
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      teacher: "Prof. Johnson",
      startTime: "2024-01-16T16:00:00",
      duration: 45,mistry",
      status: "Upcoming",00 PM",
      participants: 0,,
      maxParticipants: 40,son",
      description: "Understanding reaction mechanisms in organic chemistry with practical examples.",
      meetingLink: "https://meet.example.com/chem-org-456",
    },image: "/placeholder.svg?height=40&width=40",
    {,
      id: 3,
      title: "Physics Problem Solving Session",
      subject: "Physics",n",
      teacher: "Prof. Davis",
      startTime: "2024-01-15T15:00:00",
      duration: 90,8 years",ics", time: "9:00-10:00", room: "101" },
      status: "Completed",s", time: "11:00-12:00", room: "201" },
      participants: 35,mistry", time: "2:00-3:00", room: "103" },
      maxParticipants: 45,.svg?height=40&width=40",
      description: "Interactive problem-solving session covering mechanics and thermodynamics.",
      recordingAvailable: true,
    },day: "Tuesday",
  ]   classes: [f. Davis",
        { subject: "English", time: "9:00-10:00", room: "105" },
  const upcomingClasses = liveClasses.filter((c) => c.status === "Upcoming")
  const liveNow = liveClasses.filter((c) => c.status === "Live")
  const completedClasses = liveClasses.filter((c) => c.status === "Completed")
      availability: "Mon-Wed-Fri, 1-4 PM",
  const getStatusColor = (status: string) => {=40",
    switch (status) {",
      case "Live":
        return "destructive"y", time: "9:00-10:00", room: "103" },
      case "Upcoming":glish", time: "11:00-12:00", room: "105" },
        return "default"ematics", time: "2:00-3:00", room: "101" },
      case "Completed":
        return "secondary"h",
      default: "Mathematics",
        return "secondary"blems",
    } classes: [4-01-20",
  }     { subject: "Physics", time: "9:00-10:00", room: "201" },
        { subject: "Chemistry", time: "11:00-12:00", room: "103" },
  const formatTime = (dateString: string) => {", room: "105" },
    return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } },
    {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }     { subject: "Mathematics", time: "9:00-10:00", room: "101" },
        { subject: "Physics", time: "11:00-12:00", room: "201" },
  return (subject: "Chemistry", time: "2:00-3:00", room: "103" },
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType={userType as "student" | "teacher"} />
  ]   status: "Pending",
      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>24-01-26", name: "Republic Day", type: "National Holiday" },
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Live Classesname: "Good Friday", type: "Religious Holiday" },
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join interactive live sessions with your teachers and classmates.
    { date: "2024-02-15", subject: "Mathematics", time: "9:00 AM - 12:00 PM", type: "Mid-term" },
    { date: "2024-02-17", subject: "Physics", time: "9:00 AM - 12:00 PM", type: "Mid-term" },
    { date: "2024-02-19", subject: "Chemistry", time: "9:00 AM - 12:00 PM", type: "Mid-term" },
  ]         <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
              <Plus className="h-4 w-4 mr-2" />
  const getStatusColor = (status: string) => {
    switch (status) { helpful session. Cleared all my doubts about force and motion.",
      case "Completed":
        return "default"
      case "In Progress":
        return "destructive"() => {
      case "Upcoming":="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        return "secondary""bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      case "Cancelled": className="flex flex-row items-center justify-between space-y-0 pb-2">
        return "outline" className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Classes</CardTitle>
      default:<Video className="h-4 w-4 text-muted-foreground" />
        return "secondary"Description,
    }       <CardContent>
  }           <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {liveClasses.length}
  return (    </div>"")
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType={userType as "student" | "teacher"} />
    setSessionDescription("")
      <div className="lg:ml-80 p-4 lg:p-8">:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="mb-8 flex items-center justify-between">stify-between space-y-0 pb-2">
          <div>CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Now</CardTitle>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">:to-gray-900">
              Scheduleer>e={userType as "student" | "teacher"} />
            </h1>Content>
            <p className="text-gray-600 dark:text-gray-400">View your class schedule, holidays, and exam timetable.</p>
          </div>rdContent>-8 flex items-center justify-between">
          {userType === "teacher" && (
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"> mb-2">
              <Plus className="h-4 w-4 mr-2" />gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              Add Class className="flex flex-row items-center justify-between space-y-0 pb-2">
            </Button>tle className="text-sm font-medium text-gray-700 dark:text-gray-300">Upcoming</CardTitle>
          )}  <Calendar className="h-4 w-4 text-muted-foreground" />ce.
        </div>CardHeader>
            <CardContent>
        {/* Today's Schedule */}xt-2xl font-bold text-blue-600 dark:text-blue-400">{upcomingClasses.length}</div>
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>rigger asChild>
            <CardTitle className="text-gray-900 dark:text-white">Today's Schedule</CardTitle>merald-700 hover:to-teal-700"></Button>
            <CardDescription className="text-gray-600 dark:text-gray-400">m border-0 shadow-lg">
              Your classes for today - {new Date().toLocaleDateString()}tween space-y-0 pb-2">
            </CardDescription>Name="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</CardTitle>
          </CardHeader>assName="h-4 w-4 text-muted-foreground" />
          <CardContent>r>ent className="max-w-2xl bg-white dark:bg-gray-800">
            <div className="space-y-4">
              {todaySchedule.map((classItem) => (text-green-600 dark:text-green-400">{completedClasses.length}</div>
                <divntent>escription className="text-gray-600 dark:text-gray-400">
          </Card> key={classItem.id}n-one session with your preferred teacher.
        </div>    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                >/DialogHeader>
        {/* Live Now Alert */}me="flex items-center space-x-4">
        {liveNow.length > 0 && (
          <Alert className="mb-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-300">
              {liveNow.length} class{liveNow.length > 1 ? "es are" : " is"} currently live! Join now to not miss out.
            </AlertDescription>bg-blue-500"ame="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
          </Alert>          : "bg-gray-400"older="Choose a teacher" />
        )}            }`}electTrigger>
                    ></div>ctContent>
        {/* Live Classes */}chers.map((teacher) => (
        {liveNow.length > 0 && (ame="font-medium text-gray-900 dark:text-white">{classItem.subject}</h4>
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">y-400">
            <CardHeader><div className="flex items-center space-x-1">
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span>Live Now</span>
              </CardTitle>iv className="flex items-center space-x-1">
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Classes currently in sessionoom}</span>
              </CardDescription>lFor="date" className="text-gray-700 dark:text-gray-300">
            </CardHeader>span>with {classItem.teacher}</span>
            <CardContent>iv>l>
              <div className="space-y-4">
                {liveNow.map((classItem) => (
                  <LiveClassCard key={classItem.id} classItem={classItem} userType={userType} />
                ))} <Badge variant="outline">{classItem.type}</Badge>
              </div><Badge variant={getStatusColor(classItem.status)}>{classItem.status}</Badge>
            </CardContent>assName="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          </Card>/div>/>
        )}    ))}   </div>
            </div>  <div>
        {/* Upcoming Classes */}lFor="time" className="text-gray-700 dark:text-gray-300">
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader></Label>
            <CardTitle className="text-gray-900 dark:text-white">Upcoming Classes</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Your scheduled live sessions</CardDescription>
          </CardHeader>   <SelectValue placeholder="Select time" />
          <CardContent>className="text-gray-900 dark:text-white">Weekly Schedule</CardTitle>
            <div className="space-y-4">"text-gray-600 dark:text-gray-400">
              {upcomingClasses.length > 0 ? (10:00">10:00 AM</SelectItem>
                upcomingClasses.map((classItem) => (11:00 AM</SelectItem>
                  <LiveClassCard key={classItem.id} classItem={classItem} userType={userType} />
                ))tent>   <SelectItem value="15:00">3:00 PM</SelectItem>
              ) : (assName="grid grid-cols-1 md:grid-cols-5 gap-4">Item>
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No upcoming classes scheduled</p>
              )}<div  </Select>
            </div>key={day.day}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white/50 dark:bg-gray-700/30"
                > <div>
                  <h4 className="font-medium mb-3 text-center text-gray-900 dark:text-white">{day.day}</h4>
                  <div className="space-y-2">
                    {day.classes.map((classItem, index) => (kdrop-blur-sm border-0 shadow-lg">
                      <div key={index} className="text-sm p-2 bg-gray-50 dark:bg-gray-600/50 rounded">
                        <div className="font-medium text-gray-900 dark:text-white">{classItem.subject}</div>
                        <div className="text-gray-600 dark:text-gray-400">{classItem.time}</div>
                        <div className="text-gray-500 dark:text-gray-400">Room {classItem.room}</div>
            </CardDescription>={(e) => setSessionTopic(e.target.value)}
          </CardHeader>lassName="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          <CardContent>>
            <div className="space-y-4">
              {completedClasses.map((classItem) => (
                <LiveClassCard key={classItem.id} classItem={classItem} userType={userType} />
              ))}ontent>scription
            </div>  </Label>
          </CardContent>tarea
        </Card>assName="grid grid-cols-1 lg:grid-cols-2 gap-6">
      </div>* Holidays */}eholder="Describe what you'd like to discuss in this session..."
    </div><Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
  )         <CardHeader>Change={(e) => setSessionDescription(e.target.value)}
}             <CardTitle className="text-gray-900 dark:text-white">Upcoming Holidays</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">ark:border-gray-600"
                Scheduled holidays and breaks}: { classItem: any; userType: string }) {
              </CardDescription>: string) => {
    switch (status) {der>assName="flex justify-end space-x-2">
      case "Live":ontent>on variant="outline" onClick={() => setIsBookingOpen(false)}>
        return "destructive"="space-y-3">
                {holidays.map((holiday, index) => (
                  <divt"ton onClick={handleBookSession}>Book Session</Button>
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                  >logContent>
                    <div>"
                      <h4 className="font-medium text-gray-900 dark:text-white">{holiday.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{holiday.date}</p>
                    </div>
                    <Badge variant="outline">{holiday.type}</Badge>
                  </div>String).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })-lg">
                ))}er>
              </div>le className="text-gray-900 dark:text-white">Available Teachers</CardTitle>
            </CardContent>String: string) => {ray-600 dark:text-gray-400">
          </Card>te(dateString).toLocaleDateString()mbers
  }         </CardDescription>
          {/* Exam Schedule */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>me="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CardTitle className="text-gray-900 dark:text-white">Exam Schedule</CardTitle>sItem.status === "Live" ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20" : ""}`}
              <CardDescription className="text-gray-600 dark:text-gray-400">Upcoming examinations</CardDescription>md">
            </CardHeader>ame="p-6">
            <CardContent>lex items-start justify-between">e-x-4">
              <div className="space-y-3">
                {examSchedule.map((exam, index) => (x-2 mb-2">laceholder.svg"} alt={teacher.name} />
                  <divsName="font-medium text-lg text-gray-900 dark:text-white">{classItem.title}</h4> dark:text-emerald-300">
                    key={index}etStatusColor(classItem.status)}>{classItem.status}</Badge>
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                  >sName="text-gray-600 dark:text-gray-400 mb-3">{classItem.description}</p>
                    <div className="flex items-center justify-between mb-2">0 dark:text-gray-400">
                      <h4 className="font-medium text-gray-900 dark:text-white">{exam.subject}</h4>
                      <Badge variant="destructive">{exam.type}</Badge>
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">">itle>
                      <div className="flex items-center space-x-1">ark:text-gray-400">
                      .split(" ") className="h-4 w-4" />
                      .map((n: string) => n[0])>
                      .join("")}
                  </AvatarFallback>e="flex items-center space-x-1">
                </Avatar>Clock className="h-4 w-4" />
                <span>{classItem.teacher}</span>
              </div>  </div>ssName="space-y-2 text-sm">
              <div className="flex items-center space-x-1">ce-x-2">
                <Calendar className="h-4 w-4" /> text-yellow-500" />
                <span>{formatDate(classItem.startTime)}</span>xt-gray-300">{teacher.rating}/5.0</span>
              </div>  </div>
              <div className="flex items-center space-x-1">ce-x-2">
                <Clock className="h-4 w-4" />w-4 text-gray-500 dark:text-gray-400" />
                <span>  <span className="text-gray-700 dark:text-gray-300">{teacher.experience} experience</span>
                  {formatTime(classItem.startTime)} ({classItem.duration} min)
                </span>Notifications */}ex items-center space-x-2">
              </div>= "student" && (Name="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div className="flex items-center space-x-1">0/80 backdrop-blur-sm border-0 shadow-lg">an>
                <Users className="h-4 w-4" />
                <span>le className="flex items-center space-x-2 text-gray-900 dark:text-white">/p>
                  {classItem.participants}/{classItem.maxParticipants}
                </span>chedule Changes</span> mt-4" size="sm">
              </div>Title> Session
            </div>dDescription className="text-gray-600 dark:text-gray-400">
          </div>Recent updates to your schedule
          <div className="flex flex-col space-y-2">
            {classItem.status === "Live" && (
              <Button className="bg-red-600 hover:bg-red-700">
                <Video className="h-4 w-4 mr-2" />
                Join LiveassName="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
              </Button>tDescription className="text-orange-800 dark:text-orange-300">
            )}      <h4 className="font-medium">Mathematics Class Rescheduled</h4>
            {classItem.status === "Upcoming" && (ns.length > 0 && (
              <Button variant="outline">tics class has been moved from 9:00 AM to 11:00 AM due to faculty meeting.
                <Calendar className="h-4 w-4 mr-2" />
                Set ReminderName="text-xs mt-2">Updated 2 hours ago</p>ming Sessions</CardTitle>
              </Button>rtDescription>ame="text-gray-600 dark:text-gray-400">
            )}  </Alert>eduled mentorship sessions
            {classItem.status === "Completed" && classItem.recordingAvailable && (
              <Button variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Watch Recordingpace-y-4">
              </Button>ngSessions.map((session) => (
            )}    <div
          </div>    key={session.id}
        </div>      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
      </CardContent>
    </Card>         <div>
  )                   <h4 className="font-medium text-gray-900 dark:text-white">{session.topic}</h4>
}                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        with {session.teacher} • {session.subject}                      </p>                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">                        <div className="flex items-center space-x-1">                          <Calendar className="h-4 w-4" />                          <span>{session.date}</span>                        </div>                        <div className="flex items-center space-x-1">                          <Clock className="h-4 w-4" />                          <span>                            {session.time} ({session.duration})                          </span>                        </div>                        <div className="flex items-center space-x-1">                          <Video className="h-4 w-4" />                          <span>{session.type}</span>                        </div>                      </div>                    </div>                    <div className="flex items-center space-x-2">                      <Badge variant={session.status === "Confirmed" ? "default" : "secondary"}>{session.status}</Badge>                      <Button variant="outline" size="sm">                        {session.type === "Video Call" ? "Join Call" : "View Details"}                      </Button>                    </div>                  </div>                ))}              </div>            </CardContent>          </Card>        )}        {/* Past Sessions */}        {userType === "student" && pastSessions.length > 0 && (          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">            <CardHeader>              <CardTitle className="text-gray-900 dark:text-white">Past Sessions</CardTitle>              <CardDescription className="text-gray-600 dark:text-gray-400">                Your completed mentorship sessions              </CardDescription>            </CardHeader>            <CardContent>              <div className="space-y-4">                {pastSessions.map((session) => (                  <div                    key={session.id}                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"                  >                    <div className="flex items-start justify-between mb-2">                      <div>                        <h4 className="font-medium text-gray-900 dark:text-white">{session.topic}</h4>                        <p className="text-sm text-gray-600 dark:text-gray-400">                          with {session.teacher} • {session.subject}                        </p>                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">                          <span>{session.date}</span>                          <span>{session.time}</span>                          <span>{session.duration}</span>                        </div>                      </div>                      <div className="flex items-center space-x-1">                        {[...Array(5)].map((_, i) => (                          <Star                            key={i}                            className={`h-4 w-4 ${                              i < session.rating ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"                            }`}                          />                        ))}                      </div>                    </div>                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded">                      "{session.feedback}"                    </p>                  </div>                ))}              </div>            </CardContent>          </Card>        )}        {/* Teacher View */}        {userType === "teacher" && (          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">              <CardHeader>                <CardTitle className="text-gray-900 dark:text-white">Upcoming Sessions</CardTitle>                <CardDescription className="text-gray-600 dark:text-gray-400">                  Your scheduled mentorship sessions                </CardDescription>              </CardHeader>              <CardContent>                <div className="space-y-4">                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30">                    <h4 className="font-medium text-gray-900 dark:text-white">Calculus Problems</h4>                    <p className="text-sm text-gray-600 dark:text-gray-400">with John Doe</p>                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">                      <span>Jan 20, 2024</span>                      <span>3:00 PM</span>                      <span>60 minutes</span>                    </div>                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">                      View Details                    </Button>                  </div>                </div>              </CardContent>            </Card>            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">              <CardHeader>                <CardTitle className="text-gray-900 dark:text-white">Session Requests</CardTitle>                <CardDescription className="text-gray-600 dark:text-gray-400">                  Pending mentorship requests                </CardDescription>              </CardHeader>              <CardContent>                <div className="space-y-4">                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30">                    <h4 className="font-medium text-gray-900 dark:text-white">Organic Reactions</h4>                    <p className="text-sm text-gray-600 dark:text-gray-400">Requested by Jane Smith</p>                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Preferred: Jan 22, 4:00 PM</p>                    <div className="flex space-x-2 mt-3">                      <Button size="sm">Accept</Button>                      <Button variant="outline" size="sm">                        Reschedule                      </Button>                    </div>                  </div>                </div>              </CardContent>            </Card>          </div>        )}      </div>    </div>  )