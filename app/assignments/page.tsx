"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Upload, Clock, CheckCircle } from "lucide-react"

export default function AssignmentsPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const type = localStorage.getItem("userType")
    if (type !== "student") {
      router.push("/")
      return
    }
    setUserType(type)
  }, [router])

  if (!userType) {
    return <div>Loading...</div>
  }

  const assignments = [
    {
      id: 1,
      title: "Mathematics Quiz 3",
      subject: "Mathematics",
      type: "Graded",
      dueDate: "2024-01-20",
      status: "Submitted",
      grade: "85/100",
      description: "Solve the given calculus problems and show all working steps.",
      submittedAt: "2024-01-18",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      type: "Graded",
      dueDate: "2024-01-22",
      status: "Pending",
      description: "Write a detailed report on the pendulum experiment conducted in class.",
      submittedAt: null,
    },
    {
      id: 3,
      title: "English Essay",
      subject: "English",
      type: "Ungraded",
      dueDate: "2024-01-25",
      status: "Submitted",
      description: "Write a 500-word essay on the theme of friendship in literature.",
      submittedAt: "2024-01-15",
    },
    {
      id: 4,
      title: "Chemistry Worksheet",
      subject: "Chemistry",
      type: "Ungraded",
      dueDate: "2024-01-18",
      status: "Overdue",
      description: "Complete the organic chemistry practice problems.",
      submittedAt: null,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "default"
      case "Pending":
        return "secondary"
      case "Overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const pendingAssignments = assignments.filter((a) => a.status === "Pending" || a.status === "Overdue")
  const submittedAssignments = assignments.filter((a) => a.status === "Submitted")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType="student" />

      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Assignments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your assignments and track your submissions.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Assignments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {assignments.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{pendingAssignments.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Submitted</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{submittedAssignments.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Grade</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                88%
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="all">All Assignments</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4">
            {submittedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AssignmentCard({ assignment }: { assignment: any }) {
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false)
  const [submission, setSubmission] = useState("")
  const [keyPoints, setKeyPoints] = useState("")

  const handleSubmit = () => {
    console.log("Submitting assignment:", { submission, keyPoints })
    setIsSubmissionOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "default"
      case "Pending":
        return "secondary"
      case "Overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg text-gray-900 dark:text-white truncate">{assignment.title}</CardTitle>
            <CardDescription className="mt-1 text-gray-600 dark:text-gray-400 truncate">
              {assignment.subject} • Due: {assignment.dueDate}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0 flex-wrap">
             <Badge variant={assignment.type === "Graded" ? "default" : "secondary"}>{assignment.type}</Badge>
             <Badge variant={getStatusColor(assignment.status)}>{assignment.status}</Badge>
           </div>
         </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{assignment.description}</p>

        {assignment.grade && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">Grade: {assignment.grade}</p>
          </div>
        )}

        {assignment.submittedAt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Submitted on: {assignment.submittedAt}</p>
        )}

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
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-white">
                    Submit Assignment: {assignment.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    Upload your work and add any key points or notes.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="submission" className="text-gray-700 dark:text-gray-300">
                      Your Work
                    </Label>
                    <Textarea
                      id="submission"
                      placeholder="Paste your assignment content here or describe your uploaded files..."
                      value={submission}
                      onChange={(e) => setSubmission(e.target.value)}
                      rows={6}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="file" className="text-gray-700 dark:text-gray-300">
                      Upload Files
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      multiple
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="keyPoints" className="text-gray-700 dark:text-gray-300">
                      Key Points (Optional)
                    </Label>
                    <Textarea
                      id="keyPoints"
                      placeholder="Add any important notes or key points about your submission..."
                      value={keyPoints}
                      onChange={(e) => setKeyPoints(e.target.value)}
                      rows={3}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsSubmissionOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Submit Assignment</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
