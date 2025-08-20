"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, BookOpen, Calendar, DollarSign, Users, MessageSquare, AlertCircle } from "lucide-react"

export default function NotificationsPage() {
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

  const notifications = [
    {
      id: 1,
      type: "assignment",
      title: "New Assignment Posted",
      message: "Prof. Smith has posted a new Mathematics assignment due on Jan 25, 2024.",
      timestamp: "2 hours ago",
      read: false,
      priority: "medium",
    },
    {
      id: 2,
      type: "class",
      title: "Class Rescheduled",
      message: "Tomorrow's Physics class has been moved from 9:00 AM to 11:00 AM.",
      timestamp: "4 hours ago",
      read: false,
      priority: "high",
    },
    {
      id: 3,
      type: "fee",
      title: "Fee Payment Reminder",
      message: "Your next installment of ₹40,000 is due on March 15, 2024.",
      timestamp: "1 day ago",
      read: true,
      priority: "high",
    },
    {
      id: 4,
      type: "doubt",
      title: "Your Question was Answered",
      message: "Prof. Johnson answered your question about organic chemistry reactions.",
      timestamp: "2 days ago",
      read: true,
      priority: "low",
    },
    {
      id: 5,
      type: "mentorship",
      title: "Mentorship Session Confirmed",
      message: "Your session with Prof. Smith on Jan 20 at 3:00 PM has been confirmed.",
      timestamp: "3 days ago",
      read: true,
      priority: "medium",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <BookOpen className="h-4 w-4" />
      case "class":
        return <Calendar className="h-4 w-4" />
      case "fee":
        return <DollarSign className="h-4 w-4" />
      case "doubt":
        return <MessageSquare className="h-4 w-4" />
      case "mentorship":
        return <Users className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  const markAllAsRead = () => {
    console.log("Marking all notifications as read")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType={userType as "student" | "teacher"} />

      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with your classes, assignments, and important announcements.
            </p>
          </div>
          <Button onClick={markAllAsRead} variant="outline">
            Mark All as Read
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Notifications
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {notifications.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Unread</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{unreadNotifications.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">High Priority</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {notifications.filter((n) => n.priority === "high").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {notifications.filter((n) => n.timestamp.includes("hour")).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {unreadNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            {notifications
              .filter((n) => n.type === "assignment")
              .map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            {notifications
              .filter((n) => n.type === "class")
              .map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
          </TabsContent>

          <TabsContent value="fees" className="space-y-4">
            {notifications
              .filter((n) => n.type === "fee")
              .map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function NotificationCard({ notification }: { notification: any }) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <BookOpen className="h-4 w-4" />
      case "class":
        return <Calendar className="h-4 w-4" />
      case "fee":
        return <DollarSign className="h-4 w-4" />
      case "doubt":
        return <MessageSquare className="h-4 w-4" />
      case "mentorship":
        return <Users className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <Card
      className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg ${!notification.read ? "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div
            className={`p-2 rounded-full ${!notification.read ? "bg-blue-100 dark:bg-blue-900/50" : "bg-gray-100 dark:bg-gray-700"}`}
          >
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{notification.timestamp}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
