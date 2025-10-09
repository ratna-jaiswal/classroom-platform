"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea" "@/components/ui/avatar"
import { Input } from "@/components/ui/input"tarea"
import { Label } from "@/components/ui/label"
import { Label } from "@/components/ui/label"
  Dialog,Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  DialogContent,
  DialogDescription,
  DialogHeader,,
  DialogTitle,ption,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Upload, Clock, CheckCircle } from "lucide-react"
import { Calendar, Clock, User, Video, Star, Plus } from "lucide-react"
export default function AssignmentsPage() {
  const router = useRouter()orshipPage() {
  const [userType, setUserType] = useState<string | null>(null)
  const [userType, setUserType] = useState<string | null>(null)
  useEffect(() => {pen, setIsBookingOpen] = useState(false)
    const type = localStorage.getItem("userType")seState("")
    if (type !== "student") {ectedDate] = useState("")
      router.push("/") setSelectedTime] = useState("")
      returnsionTopic, setSessionTopic] = useState("")
    }st [sessionDescription, setSessionDescription] = useState("")
    setUserType(type)
  }, [router]) => {
    const type = localStorage.getItem("userType")
  if (!userType) {
    return <div>Loading...</div>
  }   return
    }
  const assignments = [
    {[router])
      id: 1,
      title: "Mathematics Quiz 3",
      subject: "Mathematics",iv>
      type: "Graded",
      dueDate: "2024-01-20",
      status: "Submitted",
      grade: "85/100",
      description: "Solve the given calculus problems and show all working steps.",
      submittedAt: "2024-01-18",
    },subject: "Mathematics",
    { rating: 4.8,
      id: 2,ence: "10 years",
      title: "Physics Lab Report",lgebra, Statistics",
      subject: "Physics",Fri, 2-5 PM",
      type: "Graded",older.svg?height=40&width=40",
      dueDate: "2024-01-22",
      status: "Pending",
      description: "Write a detailed report on the pendulum experiment conducted in class.",
      submittedAt: null,on",
    },subject: "Chemistry",
    { rating: 4.9,
      id: 3,ence: "8 years",
      title: "English Essay",c Chemistry, Physical Chemistry",
      subject: "English",Thu, 3-6 PM",
      type: "Ungraded",der.svg?height=40&width=40",
      dueDate: "2024-01-25",
      status: "Submitted",
      description: "Write a 500-word essay on the theme of friendship in literature.",
      submittedAt: "2024-01-15",
    },subject: "Physics",
    { rating: 4.7,
      id: 4,ence: "12 years",
      title: "Chemistry Worksheet",hermodynamics, Optics",
      subject: "Chemistry",d-Fri, 1-4 PM",
      type: "Ungraded",der.svg?height=40&width=40",
      dueDate: "2024-01-18",
      status: "Overdue",
      description: "Complete the organic chemistry practice problems.",
      submittedAt: null, = [
    },
  ]   id: 1,
      teacher: "Prof. Smith",
  const getStatusColor = (status: string) => {
    switch (status) {s Problems",
      case "Submitted":",
        return "default"
      case "Pending":inutes",
        return "secondary"
      case "Overdue":ll",
        return "destructive"
      default:
        return "secondary"
    } teacher: "Prof. Johnson",
  }   subject: "Chemistry",
      topic: "Organic Reactions",
  const pendingAssignments = assignments.filter((a) => a.status === "Pending" || a.status === "Overdue")
  const submittedAssignments = assignments.filter((a) => a.status === "Submitted")
      duration: "45 minutes",
  return (us: "Pending",
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType="student" />
  ]
      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Assignments
          </h1>"Prof. Davis",
          <p className="text-gray-600 dark:text-gray-400">Manage your assignments and track your submissions.</p>
        </div>Newton's Laws",
      date: "2024-01-15",
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Assignments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent> = () => {
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {assignments.length}
              </div>Date,
            </CardContent>
          </Card>ionTopic,
      description: sessionDescription,
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{pendingAssignments.length}</div>
            </CardContent>
          </Card>
  return (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">m-gray-900 dark:via-gray-800 dark:to-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Submitted</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>b-8 flex items-center justify-between">
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{submittedAssignments.length}</div>t mb-2">
            </CardContent>ip
          </Card>
            <p className="text-gray-600 dark:text-gray-400">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Grade</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>{isBookingOpen} onOpenChange={setIsBookingOpen}>
            <CardContent>ger asChild>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                88%Plus className="h-4 w-4 mr-2" />
              </div>ok Session
            </CardContent>
          </Card>ialogTrigger>
        </div><DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
                <DialogHeader>
        <Tabs defaultValue="all" className="space-y-6"> dark:text-white">Book Mentorship Session</DialogTitle>
          <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">>
            <TabsTrigger value="all">All Assignments</TabsTrigger>red teacher.
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
          </TabsList>className="space-y-4">
                  <div>
          <TabsContent value="all" className="space-y-4">ext-gray-700 dark:text-gray-300">
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}     <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
          </TabsContent>electTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Choose a teacher" />
          <TabsContent value="pending" className="space-y-4">
            {pendingAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}           <SelectItem key={teacher.id} value={teacher.name}>
          </TabsContent>    {teacher.name} - {teacher.subject}
                          </SelectItem>
          <TabsContent value="submitted" className="space-y-4">
            {submittedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}   </div>
          </TabsContent>lassName="grid grid-cols-2 gap-4">
        </Tabs>     <div>
      </div>          <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">
    </div>              Preferred Date
  )                   </Label>
}                     <Input
                        id="date"
function AssignmentCard({ assignment }: { assignment: any }) {
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false)
  const [submission, setSubmission] = useState("")edDate(e.target.value)}
  const [keyPoints, setKeyPoints] = useState(""):bg-gray-700 border-gray-300 dark:border-gray-600"
                      />
  const handleSubmit = () => {
    console.log("Submitting assignment:", { submission, keyPoints })
    setIsSubmissionOpen(false)tmlFor="time" className="text-gray-700 dark:text-gray-300">
  }                     Preferred Time
                      </Label>
  const getStatusColor = (status: string) => {ime} onValueChange={setSelectedTime}>
    switch (status) {   <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
      case "Submitted":   <SelectValue placeholder="Select time" />
        return "default"</SelectTrigger>
      case "Pending":   <SelectContent>
        return "secondary"<SelectItem value="10:00">10:00 AM</SelectItem>
      case "Overdue":     <SelectItem value="11:00">11:00 AM</SelectItem>
        return "destructive"electItem value="14:00">2:00 PM</SelectItem>
      default:            <SelectItem value="15:00">3:00 PM</SelectItem>
        return "secondary"<SelectItem value="16:00">4:00 PM</SelectItem>
    }                   </SelectContent>
  }                   </Select>
                    </div>
  return (        </div>
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>  <Label htmlFor="topic" className="text-gray-700 dark:text-gray-300">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">     </Label>
            <CardTitle className="text-lg text-gray-900 dark:text-white truncate">{assignment.title}</CardTitle>
            <CardDescription className="mt-1 text-gray-600 dark:text-gray-400 truncate">
              {assignment.subject} • Due: {assignment.dueDate}ganic Chemistry"
            </CardDescription>essionTopic}
          </div>      onChange={(e) => setSessionTopic(e.target.value)}
          <div className="flex items-center space-x-2 flex-shrink-0 flex-wrap">700 border-gray-300 dark:border-gray-600"
             <Badge variant={assignment.type === "Graded" ? "default" : "secondary"}>{assignment.type}</Badge>
             <Badge variant={getStatusColor(assignment.status)}>{assignment.status}</Badge>
           </div>  <div>
         </div>      <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
      </CardHeader>   Description
      <CardContent> </Label>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{assignment.description}</p>
                      id="description"
        {assignment.grade && (der="Describe what you'd like to discuss in this session..."
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">Grade: {assignment.grade}</p>
          </div>      rows={3}
        )}            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
        {assignment.submittedAt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Submitted on: {assignment.submittedAt}</p>
        )}          <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                      Cancel
        <div className="flex flex-wrap gap-2">
          {(assignment.status === "Pending" || assignment.status === "Overdue") && (
            <Dialog open={isSubmissionOpen} onOpenChange={setIsSubmissionOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-full sm:max-w-2xl bg-white dark:bg-gray-800">
                <DialogHeader>bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <DialogTitle className="text-gray-900 dark:text-white">
                    Submit Assignment: {assignment.title}-white">Available Teachers</CardTitle>
                  </DialogTitle>ssName="text-gray-600 dark:text-gray-400">
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    Upload your work and add any key points or notes.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>.map((teacher) => (
                    <Label htmlFor="submission" className="text-gray-700 dark:text-gray-300">ur-sm border-0 shadow-md">
                      Your Work
                    </Label>ssName="flex items-center space-x-4">
                    <Textarea>
                      id="submission"src={teacher.image || "/placeholder.svg"} alt={teacher.name} />
                      placeholder="Paste your assignment content here or describe your uploaded files..."rk:text-emerald-300">
                      value={submission}
                      onChange={(e) => setSubmission(e.target.value)}
                      rows={6}ap((n) => n[0])
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />  </AvatarFallback>
                  </div>Avatar>
                  <div>div>
                    <Label htmlFor="file" className="text-gray-700 dark:text-gray-300">eacher.name}</CardTitle>
                      Upload Filesiption className="text-gray-600 dark:text-gray-400">
                    </Label>eacher.subject}
                    <InputCardDescription>
                      id="file"
                      type="file"
                      multiple>
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />iv className="space-y-2 text-sm">
                  </div>iv className="flex items-center space-x-2">
                  <div> <Star className="h-4 w-4 text-yellow-500" />
                    <Label htmlFor="keyPoints" className="text-gray-700 dark:text-gray-300">5.0</span>
                      Key Points (Optional)
                    </Label>lassName="flex items-center space-x-2">
                    <Textarea className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      id="keyPoints"ame="text-gray-700 dark:text-gray-300">{teacher.experience} experience</span>
                      placeholder="Add any important notes or key points about your submission..."
                      value={keyPoints}lex items-center space-x-2">
                      onChange={(e) => setKeyPoints(e.target.value)}:text-gray-400" />
                      rows={3}className="text-gray-700 dark:text-gray-300">{teacher.availability}</span>
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    /><p className="text-gray-600 dark:text-gray-400">{teacher.specialization}</p>
                  </div>v>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsSubmissionOpen(false)}>
                      Cancel>
                    </Button>nt>
                    <Button onClick={handleSubmit}>Submit Assignment</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        {/* Upcoming Sessions */}
          <Button variant="outline">pcomingSessions.length > 0 && (
            <FileText className="h-4 w-4 mr-2" />bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            View Details
          </Button>Title className="text-gray-900 dark:text-white">Upcoming Sessions</CardTitle>
        </div><CardDescription className="text-gray-600 dark:text-gray-400">
      </CardContent> scheduled mentorship sessions
    </Card>   </CardDescription>
  )         </CardHeader>
}           <CardContent>
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
