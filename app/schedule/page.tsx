"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"ts/ui/alert"ts/ui/avatar"
import { Input } from "@/components/ui/input", Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {router = useRouter()nt, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  Dialog,userType, setUserType] = useState<string | null>(null)
  DialogContent,ion,
  DialogDescription,
  DialogHeader,= localStorage.getItem("userType")
  DialogTitle, {
  DialogTrigger,h("/")i/dialog"
} from "@/components/ui/dialog"sList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"CheckCircle } from "lucide-react"
import { MessageSquare, Plus, ThumbsUp, MessageCircle, Tag, User, Loader2 } from "lucide-react"
import { Doubt } from "@/models/Doubt"e() {
  const router = useRouter()orshipPage() {
export default function DoubtsPage() {tate<string | null>(null)
  const router = useRouter()div>= useState<string | null>(null)
  const { toast } = useToast()ookingOpen] = useState(false)
  const [userType, setUserType] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("")
  const [isAskDoubtOpen, setIsAskDoubtOpen] = useState(false)
  const [doubtTitle, setDoubtTitle] = useState("")("")
  const [doubtDescription, setDoubtDescription] = useState("")("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [mentionedFaculty, setMentionedFaculty] = useState("")
  const [doubts, setDoubts] = useState<Doubt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
      id: 2,gnments = [
  // Faculty label mapping
  const facultyLabelMap: Record<string, string> = {
    'prof-smith': 'Prof. Smith (Mathematics)',
    'prof-johnson': 'Prof. Johnson (Chemistry)',
    'prof-davis': 'Prof. Davis (Physics)',
  }   status: "In Progress",
    },status: "Submitted",
  const getFacultyLabel = (value?: string) => {
    return value ? (facultyLabelMap[value] ?? value) : '' show all working steps.",
  }   subject: "Chemistry",-18",
      time: "2:00 PM - 3:00 PM",
  useEffect(() => {03",
    const type = localStorage.getItem("userType")
    const name = localStorage.getItem("userName") || "Anonymous User"
    const id = localStorage.getItem("userId") || Date.now().toString()
    if (!type) {ded",older.svg?height=40&width=40",
      router.push("/")1-22",
      return: "Pending",
    }st weekSchedule = [e a detailed report on the pendulum experiment conducted in class.",
    setUserType(type)ll,on",
    setUserName(name)stry",
    setUserId(id),
    // Store userId if it doesn't exist "9:00-10:00", room: "101" },
    if (!localStorage.getItem("userId")) {-12:00", room: "201" },
      localStorage.setItem("userId", id):00-3:00", room: "103" },
    } ],pe: "Ungraded",der.svg?height=40&width=40",
    fetchDoubts()024-01-25",
  }, [router])"Submitted",
      day: "Tuesday",rite a 500-word essay on the theme of friendship in literature.",
  const fetchDoubts = async () => {
    try { subject: "English", time: "9:00-10:00", room: "105" },
      setIsLoading(true)ematics", time: "11:00-12:00", room: "101" },
      const response = await fetch('/api/doubts')room: "201" },
      const data = await response.json()dynamics, Optics",
      subject: "Chemistry",d-Fri, 1-4 PM",
      if (data.success) {r.svg?height=40&width=40",
        setDoubts(data.data)
      } else { [verdue",
        toast({ct: "Chemistry", time: "9:00-10:00", room: "103" },ms.",
          title: "Error",sh", time: "11:00-12:00", room: "105" },
          description: "Failed to load doubts. Please try again.",,
          variant: "destructive",
        })her: "Prof. Smith",
      } getStatusColor = (status: string) => {
    } catch (error) {, Problems",
      console.error('Error fetching doubts:', error)
      toast({ject: "Physics", time: "9:00-10:00", room: "201" },
        title: "Error", istry", time: "11:00-12:00", room: "103" },
        description: "Failed to load doubts. Please try again.",
        variant: "destructive",
      })return "destructive"
    } finally {
      setIsLoading(false)"
    } classes: [Prof. Johnson",
  }     { subject: "Mathematics", time: "9:00-10:00", room: "101" },
        { subject: "Physics", time: "11:00-12:00", room: "201" },
  const formatTimestamp = (dateString: string) => {room: "103" },== "Pending" || a.status === "Overdue")
    const date = new Date(dateString)ments.filter((a) => a.status === "Submitted")
    if (Number.isNaN(date.getTime())) return ""
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    nst holidays = [erType="student" />
    if (diffInHours < 1) return "Just now"Day", type: "National Holiday" },
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    { date: "2024-04-14", name: "Good Friday", type: "Religious Holiday" },
    const diffInDays = Math.floor(diffInHours / 24)ient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    nst examSchedule = [vis",
    return date.toLocaleDateString()Mathematics", time: "9:00 AM - 12:00 PM", type: "Mid-term" },submissions.</p>
  } { date: "2024-02-17", subject: "Physics", time: "9:00 AM - 12:00 PM", type: "Mid-term" },
    { date: "2024-02-19", subject: "Chemistry", time: "9:00 AM - 12:00 PM", type: "Mid-term" },
  const handleSubmitDoubt = async () => {
    if (!doubtTitle.trim() || !doubtDescription.trim() || !selectedSubject) {
      toast({atusColor = (status: string) => {-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        title: "Validation Error","flex flex-row items-center justify-between space-y-0 pb-2">
        description: "Please fill in all required fields.",t-gray-700 dark:text-gray-300">Total Assignments</CardTitle>
        variant: "destructive",me="h-4 w-4 text-muted-foreground" />
      })se "In Progress":
      returnrn "destructive"() => {
    } case "Upcoming":ssName="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        return "secondary"ts.length}
    try {e "Cancelled":e,
      setIsSubmitting(true)
      default:rd>ionTopic,
      const response = await fetch('/api/doubts', {
        method: 'POST',me="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        headers: {eader className="flex flex-row items-center justify-between space-y-0 pb-2">
          'Content-Type': 'application/json',ont-medium text-gray-700 dark:text-gray-300">Pending</CardTitle>
        },    <Clock className="h-4 w-4 text-muted-foreground" />
        body: JSON.stringify({en bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          title: doubtTitle,userType as "student" | "teacher"} />
          description: doubtDescription,ont-bold text-orange-600 dark:text-orange-400">{pendingAssignments.length}</div>
          subject: selectedSubject,lg:p-8">
          topic: selectedTopic,ex items-center justify-between">
          mentionedFaculty,
          author: {ssName="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">:to-gray-900">
            id: userId || Date.now().toString(), items-center justify-between space-y-0 pb-2">
            name: userName,assName="text-sm font-medium text-gray-700 dark:text-gray-300">Submitted</CardTitle>
          },<p className="text-gray-600 dark:text-gray-400">View your class schedule, holidays, and exam timetable.</p>
        }),/div>rdHeader>b-8 flex items-center justify-between">
      })  {userType === "teacher" && (
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"> mb-2">
      const data = await response.json()r-2" />
              Add Class
      if (data.success) {"text-gray-600 dark:text-gray-400">
        toast({ className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          title: "Success",ssName="flex flex-row items-center justify-between space-y-0 pb-2">
          description: "Your question has been posted successfully!", dark:text-gray-300">Average Grade</CardTitle>
        })* Today's Schedule */}e="h-4 w-4 text-muted-foreground" />
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        // Add the new doubt to the beginning of the list
        setDoubts(prev => [data.data, ...prev]) dark:text-white">Today's Schedule</CardTitle> bg-clip-text text-transparent">
            <CardDescription className="text-gray-600 dark:text-gray-400">
        // Reset formasses for today - {new Date().toLocaleDateString()}
        setIsAskDoubtOpen(false)
        setDoubtTitle("")gger>
        setDoubtDescription("")assName="max-w-2xl bg-white dark:bg-gray-800">
        setSelectedSubject("")ace-y-4">
        setSelectedTopic("").map((classItem) => (-y-6"> dark:text-white">Book Mentorship Session</DialogTitle>
        setMentionedFaculty("")bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">>
      } else {    key={classItem.id}>All Assignments</TabsTrigger>red teacher.
        toast({   className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
          title: "Error",value="submitted">Submitted</TabsTrigger>
          description: data.message || "Failed to post question. Please try again.",
          variant: "destructive",
        })            className={`w-3 h-3 rounded-full ${ext-gray-700 dark:text-gray-300">
      }                 classItem.status === "Completed"
    } catch (error) {     ? "bg-green-500"ent.id} assignment={assignment} />
      console.error('Error submitting doubt:', error)Progress"nge={setSelectedTeacher}>
      toast({               ? "bg-blue-500"ame="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
        title: "Error",     : "bg-gray-400"older="Choose a teacher" />
        description: "Failed to post question. Please try again.",
        variant: "destructive",.map((assignment) => (
      })            <div>Card key={assignment.id} assignment={assignment} />
    } finally {       <h4 className="font-medium text-gray-900 dark:text-white">{classItem.subject}</h4>
      setIsSubmitting(false)lassName="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
    }                   <div className="flex items-center space-x-1">
  }                       <Clock className="h-4 w-4" />ce-y-4">
                          <span>{classItem.time}</span>
  if (!userType) {      </div>key={assignment.id} assignment={assignment} />
    return <div>Loading...</div>ssName="flex items-center space-x-1">
  }                       <MapPin className="h-4 w-4" />">
                          <span>{classItem.room}</span>
  if (isLoading) {      </div>tmlFor="date" className="text-gray-700 dark:text-gray-300">
    return (            <span>with {classItem.teacher}</span>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navigation userType={userType as "student" | "teacher"} />
        <div className="lg:ml-80 p-4 lg:p-8 flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center space-x-2">ce-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />type}</Badge>
            <span>Loading doubts...</span>tusColor(classItem.status)}>{classItem.status}</Badge>
          </div>  </div>eyPoints] = useState(""):bg-gray-700 border-gray-300 dark:border-gray-600"
        </div>  </div>/>
      </div>  ))}mit = () => {
    )       </div>ubmitting assignment:", { submission, keyPoints })
  }       </CardContent>false)tmlFor="time" className="text-gray-700 dark:text-gray-300">
        </Card>         Preferred Time
  return (            </Label>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType={userType as "student" | "teacher"} />kdrop-blur-sm border-0 shadow-lg">rder-gray-600">
          <CardHeader>:   <SelectValue placeholder="Select time" />
      <div className="lg:ml-80 p-4 lg:p-8">-900 dark:text-white">Weekly Schedule</CardTitle>
        <div className="mb-8 flex items-center justify-between">gray-400">
          <div>our complete weekly timetable"10:00">10:00 AM</SelectItem>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Doubts & QuestionstItem value="14:00">2:00 PM</SelectItem>
            </h1>ntent>   <SelectItem value="15:00">3:00 PM</SelectItem>
            <p className="text-gray-600 dark:text-gray-400">Ask questions and help your peers learn better.</p>
          </div>eekSchedule.map((day) => (
          <Dialog open={isAskDoubtOpen} onOpenChange={setIsAskDoubtOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">"
                <Plus className="h-4 w-4 mr-2" />/80 backdrop-blur-sm border-0 shadow-lg">
                Ask Questioname="font-medium mb-3 text-center text-gray-900 dark:text-white">{day.day}</h4>
              </Button>className="space-y-2">ify-between">
            </DialogTrigger>sses.map((classItem, index) => (
            <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">rk:bg-gray-600/50 rounded">CardTitle>
              <DialogHeader> className="font-medium text-gray-900 dark:text-white">{classItem.subject}</div>
                <DialogTitle className="text-gray-900 dark:text-white">Ask a Question</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">classItem.room}</div>
                  Describe your doubt clearly so others can help you better.
                </DialogDescription>-center space-x-2 flex-shrink-0 flex-wrap">700 border-gray-300 dark:border-gray-600"
              </DialogHeader>assignment.type === "Graded" ? "default" : "secondary"}>{assignment.type}</Badge>
              <div className="space-y-4">or(assignment.status)}>{assignment.status}</Badge>
                <div>iv>
                  <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">ray-300">
                    Question Title
                  </Label>l>
                  <Inputxt-gray-700 dark:text-gray-300 mb-4">{assignment.description}</p>
                    id="title"rid-cols-1 lg:grid-cols-2 gap-6">
                    placeholder="Enter a clear, descriptive title"cuss in this session..."
                    value={doubtTitle} dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    onChange={(e) => setDoubtTitle(e.target.value)}ext-green-300">Grade: {assignment.grade}</p>
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"e>
                  />escription className="text-gray-600 dark:text-gray-400">ark:border-gray-600"
                </div>led holidays and breaks
                <div>escription>&& (
                  <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">ment.submittedAt}</p>
                    Detailed Descriptionline" onClick={() => setIsBookingOpen(false)}>
                  </Label>me="space-y-3">
                  <Textareaap((holiday, index) => (
                    id="description"ending" || assignment.status === "Overdue") && (
                    placeholder="Explain your doubt in detail..."bmissionOpen}>
                    value={doubtDescription}nter justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                    onChange={(e) => setDoubtDescription(e.target.value)}go-600 hover:from-blue-700 hover:to-indigo-700">
                    rows={4}assName="h-4 w-4 mr-2" />
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"</h4>
                  />  <p className="text-sm text-gray-600 dark:text-gray-400">{holiday.date}</p>
                </div>div>ger>
                <div className="grid grid-cols-2 gap-4">pe}</Badge>2xl bg-white dark:bg-gray-800">
                  <div>>eader>bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
                      Subjectsignment: {assignment.title}-white">Available Teachers</CardTitle>
                    </Label>tle>ssName="text-gray-600 dark:text-gray-400">
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger> dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                      <SelectContent>-y-4">1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SelectItem value="mathematics">Mathematics</SelectItem></CardTitle>
                        <SelectItem value="physics">Physics</SelectItem>00">Upcoming examinations</CardDescription>md">
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>3">
                    </Select>.map((exam, index) => (age || "/placeholder.svg"} alt={teacher.name} />
                  </div>aceholder="Paste your assignment content here or describe your uploaded files..."rk:text-emerald-300">
                  <div>={index}bmission}
                    <Label htmlFor="topic" className="text-gray-700 dark:text-gray-300">g bg-white/50 dark:bg-gray-700/30"
                      Topic{6}ap((n) => n[0])
                    </Label>ssName="flex items-center justify-between mb-2">ark:border-gray-600"
                    <InputclassName="font-medium text-gray-900 dark:text-white">{exam.subject}</h4>
                      id="topic"iant="destructive">{exam.type}</Badge>
                      placeholder="e.g., Calculus, Mechanics"
                      value={selectedTopic}ems-center space-x-4 text-sm text-gray-600 dark:text-gray-400">itle>
                      onChange={(e) => setSelectedTopic(e.target.value)}ext-gray-400">
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />  <span>{exam.date}</span>
                  </div>div>le"
                </div><div className="flex items-center space-x-1">
                <div>   <Clock className="h-4 w-4" />
                  <Label htmlFor="faculty" className="text-gray-700 dark:text-gray-300">ray-600"
                    Mention Faculty (Optional)text-sm">
                  </Label> className="flex items-center space-x-2">
                  <Select value={mentionedFaculty} onValueChange={setMentionedFaculty}>
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select faculty to mention" />
                    </SelectTrigger>="flex items-center space-x-2">
                    <SelectContent>Name="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <SelectItem value="prof-smith">Prof. Smith (Mathematics)</SelectItem>nce} experience</span>
                      <SelectItem value="prof-johnson">Prof. Johnson (Chemistry)</SelectItem>n..."
                      <SelectItem value="prof-davis">Prof. Davis (Physics)</SelectItem>
                    </SelectContent>=> setKeyPoints(e.target.value)}:text-gray-400" />
                  </Select>mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">an>
                </div>r>assName="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                <div className="flex justify-end space-x-2">x-2 text-gray-900 dark:text-white">/p>
                  <Button variant="outline" onClick={() => setIsAskDoubtOpen(false)} disabled={isSubmitting}>
                    Canceldule Changes</span>y-end space-x-2">
                  </Button> variant="outline" onClick={() => setIsSubmissionOpen(false)}>
                  <Button onClick={handleSubmitDoubt} disabled={isSubmitting}>
                    {isSubmitting ? (r schedule
                      <>ription>ick={handleSubmit}>Submit Assignment</Button>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Posting...
                      </>ame="space-y-3">
                    ) : (assName="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
                      "Post Question"lassName="text-orange-800 dark:text-orange-300">
                    )}4 className="font-medium">Mathematics Class Rescheduled</h4>
                  </Button>sName="text-sm mt-1">ons.length > 0 && (
                </div>Tomorrow's Mathematics class has been moved from 9:00 AM to 11:00 AM due to faculty meeting.
              </div></p>
            </DialogContent>Name="text-xs mt-2">Updated 2 hours ago</p>ming Sessions</CardTitle>
          </Dialog>/AlertDescription>ame="text-gray-600 dark:text-gray-400">
        </div>  </Alert>eduled mentorship sessions
              </div>Description>
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Questions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>Name="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
            <CardContent>              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">                {doubts.length}              </div>            </CardContent>          </Card>          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Questions</CardTitle>              <User className="h-4 w-4 text-muted-foreground" />            </CardHeader>            <CardContent>              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">                {userId ? doubts.filter(d => d.author.id === userId).length : 0}              </div>            </CardContent>          </Card>          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Answered</CardTitle>              <MessageCircle className="h-4 w-4 text-muted-foreground" />            </CardHeader>            <CardContent>              <div className="text-2xl font-bold text-green-600 dark:text-green-400">                {doubts.filter(doubt => doubt.status === 'Answered').length}              </div>            </CardContent>          </Card>          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Likes</CardTitle>              <ThumbsUp className="h-4 w-4 text-muted-foreground" />            </CardHeader>            <CardContent>              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">                {doubts.reduce((total, doubt) => total + doubt.likes, 0)}              </div>            </CardContent>          </Card>        </div>        {/* Doubts List */}        <div className="space-y-6">          {doubts.length === 0 ? (            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">              <CardContent className="p-8 text-center">                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No doubts yet</h3>                <p className="text-gray-600 dark:text-gray-400">Be the first to ask a question!</p>              </CardContent>            </Card>          ) : (            doubts.map((d) => (              <div key={d.id} className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm">                <div className="flex-1 min-w-0">                  <h4 className="font-medium">{d.title}</h4>                  <p className="text-sm text-muted-foreground">{d.summary}</p>                </div>                <div className="flex items-center space-x-2 flex-shrink-0 flex-wrap">                  <Button size="sm">View</Button>                  <Button variant="ghost" size="sm">Reply</Button>                </div>              </div>            ))          }        </div>      </div>    </div>  )}                    <div>                      <h4 className="font-medium text-gray-900 dark:text-white">{session.topic}</h4>                      <p className="text-sm text-gray-600 dark:text-gray-400">                        with {session.teacher} • {session.subject}                      </p>                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">                        <div className="flex items-center space-x-1">                          <Calendar className="h-4 w-4" />                          <span>{session.date}</span>                        </div>                        <div className="flex items-center space-x-1">                          <Clock className="h-4 w-4" />                          <span>                            {session.time} ({session.duration})                          </span>                        </div>                        <div className="flex items-center space-x-1">                          <Video className="h-4 w-4" />                          <span>{session.type}</span>                        </div>                      </div>                    </div>                    <div className="flex items-center space-x-2">                      <Badge variant={session.status === "Confirmed" ? "default" : "secondary"}>{session.status}</Badge>                      <Button variant="outline" size="sm">                        {session.type === "Video Call" ? "Join Call" : "View Details"}                      </Button>                    </div>                  </div>                ))}              </div>            </CardContent>          </Card>        )}        {/* Past Sessions */}        {userType === "student" && pastSessions.length > 0 && (          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">            <CardHeader>              <CardTitle className="text-gray-900 dark:text-white">Past Sessions</CardTitle>              <CardDescription className="text-gray-600 dark:text-gray-400">                Your completed mentorship sessions              </CardDescription>            </CardHeader>            <CardContent>              <div className="space-y-4">                {pastSessions.map((session) => (                  <div                    key={session.id}                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"                  >                    <div className="flex items-start justify-between mb-2">                      <div>                        <h4 className="font-medium text-gray-900 dark:text-white">{session.topic}</h4>                        <p className="text-sm text-gray-600 dark:text-gray-400">                          with {session.teacher} • {session.subject}                        </p>                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">                          <span>{session.date}</span>                          <span>{session.time}</span>                          <span>{session.duration}</span>                        </div>                      </div>                      <div className="flex items-center space-x-1">                        {[...Array(5)].map((_, i) => (                          <Star                            key={i}                            className={`h-4 w-4 ${                              i < session.rating ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"                            }`}                          />                        ))}                      </div>                    </div>                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded">                      "{session.feedback}"                    </p>                  </div>                ))}              </div>            </CardContent>          </Card>        )}        {/* Teacher View */}        {userType === "teacher" && (          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">              <CardHeader>                <CardTitle className="text-gray-900 dark:text-white">Upcoming Sessions</CardTitle>                <CardDescription className="text-gray-600 dark:text-gray-400">                  Your scheduled mentorship sessions                </CardDescription>              </CardHeader>              <CardContent>                <div className="space-y-4">                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30">                    <h4 className="font-medium text-gray-900 dark:text-white">Calculus Problems</h4>                    <p className="text-sm text-gray-600 dark:text-gray-400">with John Doe</p>                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">                      <span>Jan 20, 2024</span>                      <span>3:00 PM</span>                      <span>60 minutes</span>                    </div>                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">                      View Details                    </Button>                  </div>                </div>              </CardContent>            </Card>            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">              <CardHeader>                <CardTitle className="text-gray-900 dark:text-white">Session Requests</CardTitle>                <CardDescription className="text-gray-600 dark:text-gray-400">                  Pending mentorship requests                </CardDescription>              </CardHeader>              <CardContent>                <div className="space-y-4">                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30">                    <h4 className="font-medium text-gray-900 dark:text-white">Organic Reactions</h4>                    <p className="text-sm text-gray-600 dark:text-gray-400">Requested by Jane Smith</p>                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Preferred: Jan 22, 4:00 PM</p>                    <div className="flex space-x-2 mt-3">                      <Button size="sm">Accept</Button>                      <Button variant="outline" size="sm">                        Reschedule                      </Button>                    </div>                  </div>                </div>              </CardContent>            </Card>          </div>        )}      </div>    </div>  )}