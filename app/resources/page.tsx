"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, BookOpen, Download, Search, Filter, Eye } from "lucide-react"

export default function ResourcesPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")

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

  const resources = [
    {
      id: 1,
      title: "Calculus Fundamentals",
      type: "PDF",
      subject: "Mathematics",
      teacher: "Prof. Smith",
      uploadDate: "2024-01-15",
      size: "2.5 MB",
      downloads: 45,
      description: "Comprehensive guide to differential and integral calculus",
    },
    {
      id: 2,
      title: "Organic Chemistry Reactions",
      type: "Video",
      subject: "Chemistry",
      teacher: "Prof. Johnson",
      uploadDate: "2024-01-12",
      duration: "45 minutes",
      views: 128,
      description: "Video lecture covering major organic chemistry reaction mechanisms",
    },
    {
      id: 3,
      title: "Physics Lab Manual",
      type: "PDF",
      subject: "Physics",
      teacher: "Prof. Davis",
      uploadDate: "2024-01-10",
      size: "5.2 MB",
      downloads: 67,
      description: "Complete lab manual with experiments and procedures",
    },
    {
      id: 4,
      title: "English Literature Notes",
      type: "Notes",
      subject: "English",
      teacher: "Prof. Wilson",
      uploadDate: "2024-01-08",
      size: "1.8 MB",
      downloads: 32,
      description: "Detailed notes on Shakespeare's major works",
    },
    {
      id: 5,
      title: "Thermodynamics Lecture Series",
      type: "Video",
      subject: "Physics",
      teacher: "Prof. Davis",
      uploadDate: "2024-01-05",
      duration: "2 hours 15 minutes",
      views: 89,
      description: "Complete video series on thermodynamics principles",
    },
  ]

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-5 w-5 text-red-500" />
      case "PDF":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "Notes":
        return <BookOpen className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const videoResources = resources.filter((r) => r.type === "Video")
  const pdfResources = resources.filter((r) => r.type === "PDF")
  const notesResources = resources.filter((r) => r.type === "Notes")

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType={userType as "student" | "teacher"} />

      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Learning Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Access video lectures, books, PDFs, and notes shared by your teachers.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-48 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Resources</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {resources.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Video Lectures</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{videoResources.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">PDF Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{pdfResources.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{notesResources.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="videos">Video Lectures</TabsTrigger>
            <TabsTrigger value="pdfs">PDF Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pdfs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pdfResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notesResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ResourceCard({ resource }: { resource: any }) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-5 w-5 text-red-500" />
      case "PDF":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "Notes":
        return <BookOpen className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getResourceIcon(resource.type)}
            <Badge variant="outline">{resource.type}</Badge>
          </div>
          <Badge variant="secondary">{resource.subject}</Badge>
        </div>
        <CardTitle className="text-lg text-gray-900 dark:text-white">{resource.title}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>By {resource.teacher}</p>
          <p>Uploaded: {resource.uploadDate}</p>
          {resource.size && <p>Size: {resource.size}</p>}
          {resource.duration && <p>Duration: {resource.duration}</p>}
          {resource.downloads && <p>{resource.downloads} downloads</p>}
          {resource.views && <p>{resource.views} views</p>}
        </div>
        <div className="flex space-x-2 mt-4">
          <Button size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
