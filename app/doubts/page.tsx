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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquare, Plus, ThumbsUp, MessageCircle, Tag, User } from "lucide-react"

export default function DoubtsPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)
  const [isAskDoubtOpen, setIsAskDoubtOpen] = useState(false)
  const [doubtTitle, setDoubtTitle] = useState("")
  const [doubtDescription, setDoubtDescription] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [mentionedFaculty, setMentionedFaculty] = useState("")

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

  const doubts = [
    {
      id: 1,
      title: "Integration by Parts Problem",
      description: "I'm having trouble understanding when to use integration by parts vs substitution method.",
      author: "John Doe",
      subject: "Mathematics",
      topic: "Calculus",
      timestamp: "2 hours ago",
      likes: 5,
      replies: 3,
      status: "Open",
      mentionedFaculty: "Prof. Smith",
    },
    {
      id: 2,
      title: "Organic Chemistry Reaction Mechanism",
      description: "Can someone explain the mechanism for SN1 and SN2 reactions with examples?",
      author: "Jane Smith",
      subject: "Chemistry",
      topic: "Organic Chemistry",
      timestamp: "4 hours ago",
      likes: 8,
      replies: 6,
      status: "Answered",
      mentionedFaculty: "Prof. Johnson",
    },
    {
      id: 3,
      title: "Newton's Laws Application",
      description: "How do I solve problems involving multiple forces acting on an object?",
      author: "Mike Wilson",
      subject: "Physics",
      topic: "Mechanics",
      timestamp: "1 day ago",
      likes: 3,
      replies: 2,
      status: "Open",
      mentionedFaculty: "",
    },
  ]

  const handleSubmitDoubt = () => {
    console.log("Submitting doubt:", {
      title: doubtTitle,
      description: doubtDescription,
      subject: selectedSubject,
      topic: selectedTopic,
      mentionedFaculty,
    })
    setIsAskDoubtOpen(false)
    setDoubtTitle("")
    setDoubtDescription("")
    setSelectedSubject("")
    setSelectedTopic("")
    setMentionedFaculty("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType={userType as "student" | "teacher"} />

      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Doubts & Questions
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Ask questions and help your peers learn better.</p>
          </div>
          <Dialog open={isAskDoubtOpen} onOpenChange={setIsAskDoubtOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="h-4 w-4 mr-2" />
                Ask Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">Ask a Question</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Describe your doubt clearly so others can help you better.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
                    Question Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter a clear, descriptive title"
                    value={doubtTitle}
                    onChange={(e) => setDoubtTitle(e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                    Detailed Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Explain your doubt in detail..."
                    value={doubtDescription}
                    onChange={(e) => setDoubtDescription(e.target.value)}
                    rows={4}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
                      Subject
                    </Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="topic" className="text-gray-700 dark:text-gray-300">
                      Topic
                    </Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Calculus, Mechanics"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="faculty" className="text-gray-700 dark:text-gray-300">
                    Mention Faculty (Optional)
                  </Label>
                  <Select value={mentionedFaculty} onValueChange={setMentionedFaculty}>
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select faculty to mention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prof-smith">Prof. Smith (Mathematics)</SelectItem>
                      <SelectItem value="prof-johnson">Prof. Johnson (Chemistry)</SelectItem>
                      <SelectItem value="prof-davis">Prof. Davis (Physics)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAskDoubtOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitDoubt}>Post Question</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Questions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {doubts.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Questions</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Answered</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">1</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Helpful Answers</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">15</div>
            </CardContent>
          </Card>
        </div>

        {/* Doubts List */}
        <div className="space-y-6">
          {doubts.map((doubt) => (
            <Card key={doubt.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 text-gray-900 dark:text-white">{doubt.title}</CardTitle>
                    <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                      {doubt.description}
                    </CardDescription>
                  </div>
                  <Badge variant={doubt.status === "Answered" ? "default" : "secondary"}>{doubt.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>By {doubt.author}</span>
                    <span>•</span>
                    <span>{doubt.timestamp}</span>
                    <div className="flex items-center space-x-2">
                      <Tag className="h-3 w-3" />
                      <span>{doubt.subject}</span>
                      {doubt.topic && (
                        <>
                          <span>•</span>
                          <span>{doubt.topic}</span>
                        </>
                      )}
                    </div>
                    {doubt.mentionedFaculty && (
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{doubt.mentionedFaculty}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{doubt.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{doubt.replies}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Answers
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
