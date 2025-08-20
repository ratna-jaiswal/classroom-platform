"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Users, UserCheck, Plus, Search, Download } from "lucide-react"

export default function ManageAttendancePage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [attendanceData, setAttendanceData] = useState({} as Record<number, boolean>)

  const classes = [
    { id: "12A", name: "Class 12A - Mathematics", students: 35 },
    { id: "12B", name: "Class 12B - Mathematics", students: 32 },
    { id: "11A", name: "Class 11A - Physics", students: 28 },
  ]

  const students = [
    { id: 1, rollNumber: "2023001", name: "John Doe", attendance: 85, present: true },
    { id: 2, rollNumber: "2023002", name: "Jane Smith", attendance: 92, present: true },
    { id: 3, rollNumber: "2023003", name: "Mike Johnson", attendance: 78, present: false },
    { id: 4, rollNumber: "2023004", name: "Sarah Wilson", attendance: 88, present: true },
    { id: 5, rollNumber: "2023005", name: "David Brown", attendance: 65, present: false },
    { id: 6, rollNumber: "2023006", name: "Emily Davis", attendance: 95, present: true },
  ]

  const attendanceRecords = [
    {
      date: "2024-01-15",
      class: "Class 12A",
      totalStudents: 35,
      present: 32,
      absent: 3,
      percentage: 91.4,
    },
    {
      date: "2024-01-14",
      class: "Class 12A",
      totalStudents: 35,
      present: 30,
      absent: 5,
      percentage: 85.7,
    },
    {
      date: "2024-01-13",
      class: "Class 12B",
      totalStudents: 32,
      present: 29,
      absent: 3,
      percentage: 90.6,
    },
  ]

  useEffect(() => {
    const type = localStorage.getItem("userType")
    if (type !== "teacher") {
      router.push("/")
      return
    }
    setUserType(type)
    setAttendanceData(
      students.reduce(
        (acc, student) => {
          acc[student.id] = student.present
          return acc
        },
        {} as Record<number, boolean>,
      ),
    )
  }, [router])

  if (!userType) {
    return <div>Loading...</div>
  }

  const handleAttendanceChange = (studentId: number, present: boolean) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: present,
    }))
  }

  const handleSubmitAttendance = () => {
    console.log("Submitting attendance:", attendanceData)
    setIsMarkingAttendance(false)
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNumber.includes(searchTerm),
  )

  const presentCount = Object.values(attendanceData).filter(Boolean).length
  const absentCount = students.length - presentCount
  const attendancePercentage = (presentCount / students.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType="teacher" />

      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Manage Attendance
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track and manage student attendance for your classes.
            </p>
          </div>
          <Dialog open={isMarkingAttendance} onOpenChange={setIsMarkingAttendance}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">Mark Attendance</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Mark attendance for {selectedDate} - {classes.find((c) => c.id === selectedClass)?.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class" className="text-gray-700 dark:text-gray-300">
                      Select Class
                    </Label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Choose a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                {selectedClass && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search students..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-600 dark:text-green-400">Present: {presentCount}</span>
                        <span className="text-red-600 dark:text-red-400">Absent: {absentCount}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          Percentage: {attendancePercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 font-medium text-sm">
                        <span className="text-gray-900 dark:text-white">Roll Number</span>
                        <span className="text-gray-900 dark:text-white">Student Name</span>
                        <span className="text-gray-900 dark:text-white">Overall Attendance</span>
                        <span className="text-gray-900 dark:text-white">Today's Status</span>
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredStudents.map((student) => (
                          <div key={student.id} className="grid grid-cols-4 gap-4 p-4 items-center">
                            <span className="font-mono text-gray-900 dark:text-white">{student.rollNumber}</span>
                            <span className="text-gray-900 dark:text-white">{student.name}</span>
                            <div className="flex items-center space-x-2">
                              <span
                                className={
                                  student.attendance >= 75
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }
                              >
                                {student.attendance}%
                              </span>
                              {student.attendance < 75 && (
                                <Badge variant="destructive" className="text-xs">
                                  Low
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`present-${student.id}`}
                                  checked={attendanceData[student.id]}
                                  onCheckedChange={(checked) => handleAttendanceChange(student.id, checked as boolean)}
                                />
                                <Label htmlFor={`present-${student.id}`} className="text-green-600 dark:text-green-400">
                                  Present
                                </Label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsMarkingAttendance(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitAttendance}>Submit Attendance</Button>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Classes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{classes.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Students</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {classes.reduce((sum, cls) => sum + cls.students, 0)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Today's Average</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">88.5%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Low Attendance</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">12</div>
              <p className="text-xs text-muted-foreground">Students below 75%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="records">Attendance Records</TabsTrigger>
            <TabsTrigger value="students">Student Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Recent Attendance Records</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Latest attendance data for your classes
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceRecords.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{record.class}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{record.date}</p>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-gray-900 dark:text-white">{record.totalStudents}</p>
                          <p className="text-gray-500 dark:text-gray-400">Total</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-green-600 dark:text-green-400">{record.present}</p>
                          <p className="text-gray-500 dark:text-gray-400">Present</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-red-600 dark:text-red-400">{record.absent}</p>
                          <p className="text-gray-500 dark:text-gray-400">Absent</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900 dark:text-white">{record.percentage}%</p>
                          <p className="text-gray-500 dark:text-gray-400">Percentage</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Student Attendance Overview</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Individual student attendance statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{student.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Roll: {student.rollNumber}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p
                            className={`font-medium ${student.attendance >= 75 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                          >
                            {student.attendance}%
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Overall</p>
                        </div>
                        <Badge variant={student.attendance >= 75 ? "default" : "destructive"}>
                          {student.attendance >= 75 ? "Good" : "Low"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Class-wise Performance</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Average attendance by class
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classes.map((cls) => (
                      <div key={cls.id} className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">{cls.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${Math.random() * 30 + 70}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {(Math.random() * 30 + 70).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Weekly Trends</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Attendance trends over the week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">{day}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${Math.random() * 20 + 80}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {(Math.random() * 20 + 80).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
