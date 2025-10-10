"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
  Bell,
  FileText,
  Video,
  UserCheck,
  Menu,
  LogOut,
  Home,
  GraduationCap,
  Settings,
} from "lucide-react"

interface NavigationProps {
  userType: "student" | "teacher"
}

export default function Navigation({ userType }: NavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userId")
    router.push("/")
  }

  const studentNavItems = [
    { href: "/dashboard/student", label: "Dashboard", icon: Home },
    { href: "/attendance", label: "Attendance", icon: UserCheck },
    { href: "/assignments", label: "Assignments", icon: BookOpen },
    { href: "/doubts", label: "Doubts", icon: MessageSquare },
    { href: "/mentorship", label: "Mentorship", icon: Users },
    { href: "/schedule", label: "Schedule", icon: Calendar },
    { href: "/fees", label: "Fees", icon: DollarSign },
    { href: "/resources", label: "Resources", icon: FileText },
    { href: "/live-classes", label: "Live Classes", icon: Video },
    { href: "/notifications", label: "Notifications", icon: Bell },
  ]

  const teacherNavItems = [
    { href: "/dashboard/teacher", label: "Dashboard", icon: Home },
    { href: "/attendance/manage", label: "Manage Attendance", icon: UserCheck },
    { href: "/assignments/manage", label: "Manage Assignments", icon: BookOpen },
    { href: "/doubts", label: "Doubts", icon: MessageSquare },
    { href: "/mentorship", label: "Mentorship", icon: Users },
    { href: "/schedule/manage", label: "Manage Schedule", icon: Calendar },
    { href: "/resources/manage", label: "Manage Resources", icon: FileText },
    { href: "/live-classes/manage", label: "Live Classes", icon: Video },
    { href: "/notifications", label: "Notifications", icon: Bell },
  ]

  const navItems = userType === "student" ? studentNavItems : teacherNavItems

  const NavContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/10">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              userType === "student"
                ? "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500"
                : "bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500"
            }`}
          >
            {userType === "student" ? (
              <BookOpen className="h-5 w-5 text-white" />
            ) : (
              <GraduationCap className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">SikshaLink</h2>
            <p className="text-sm text-muted-foreground">
              {userType === "student" ? "Student Portal" : "Teacher Portal"}
            </p>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 bg-muted/50 dark:bg-muted/30 rounded-xl">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback
              className={`${userType === "student" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"}`}
            >
              {userType === "student" ? "JD" : "PS"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {userType === "student" ? "John Doe" : "Prof. Smith"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {userType === "student" ? "Roll: 2023001" : "Mathematics Dept."}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? userType === "student"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white shadow-lg"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 text-white shadow-lg"
                  : "text-foreground hover:bg-muted dark:hover:bg-muted/50 hover:text-foreground hover:-translate-y-0.5"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Icon
                className={`h-5 w-5 transition-all group-hover:scale-110 ${
                  isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span className="font-medium">{item.label}</span>
              {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="flex-1 justify-start text-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Button>
          <ThemeToggle />
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
               variant="outline"
               size="icon"
              className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300 transform-gpu motion-reduce:transition-none motion-reduce:hover:scale-100"
              aria-label="Open navigation"
              >
             <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 border-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-80 shadow-xl z-40 border-r border-border">
        <NavContent />
      </div>
    </>
  )
}

export function StudentLogin() {
  const router = useRouter()

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Animated Background Elements (responsive offsets to avoid overflow on small screens) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-20 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-4 sm:left-40 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
     <div className="w-full max-w-md relative z-10">
       {/* Header */}
       <div className="flex items-center justify-between mb-6">
         <Button
           variant="ghost"
           onClick={() => router.push("/")}
           className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 p-2"
         >
           <ArrowLeft className="h-4 w-4 mr-2" />
           Back to Home
         </Button>
         <ThemeToggle />
       </div>

       {/* Title */}
       <div className="text-center mb-8">
         <h1 className="text-4xl font-extrabold leading-tight text-foreground">
           Welcome to SikshaLink
         </h1>
         <p className="text-lg text-muted-foreground">
           {`The one-stop solution for ${userType === "student" ? "students" : "teachers"} to manage their academic life.`}
         </p>
       </div>

       {/* Login Form */}
       <div className="bg-muted/50 dark:bg-muted/30 p-6 rounded-xl shadow-md">
         <div className="space-y-4">
           <Button
             variant="outline"
             className="w-full h-12 border-2 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-300 dark:hover:text-blue-300"
             onClick={() => router.push("/login/student")}
           >
             <BookOpen className="h-4 w-4 mr-2" />
             Student Login
           </Button>
           <Button
             variant="outline"
             className="w-full h-12 border-2 hover:border-emerald-300 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
             onClick={() => router.push("/login/teacher")}
           >
             <GraduationCap className="h-4 w-4 mr-2" />
             Teacher Login
           </Button>
         </div>
       </div>

       {/* Footer */}
       <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
         <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
           Or sign in as
         </p>
         <div className="flex flex-col sm:flex-row gap-2">
           <Button
             variant="outline"
             onClick={() => router.push("/login/teacher")}
             className="w-full sm:w-1/2 h-12 border-2 hover:border-emerald-300 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
           >
             <GraduationCap className="h-4 w-4 mr-2" />
             Teacher
           </Button>
           <Button
             variant="ghost"
             onClick={() => router.push("/")}
             className="w-full sm:w-1/2 h-12"
           >
             Back
           </Button>
         </div>
       </div>
     </div>
  </div>
  )
}

export function TeacherLogin() {
  const router = useRouter()

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Animated Background Elements (responsive offsets to avoid overflow on small screens) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-20 w-72 h-72 bg-emerald-300 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-72 h-72 bg-teal-300 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-4 sm:left-40 w-72 h-72 bg-green-300 dark:bg-green-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
     <div className="w-full max-w-md relative z-10">
       {/* Header */}
       <div className="flex items-center justify-between mb-6">
         <Button
           variant="ghost"
           onClick={() => router.push("/")}
           className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 p-2"
         >
           <ArrowLeft className="h-4 w-4 mr-2" />
           Back to Home
         </Button>
         <ThemeToggle />
       </div>

       {/* Title */}
       <div className="text-center mb-8">
         <h1 className="text-4xl font-extrabold leading-tight text-foreground">
           Welcome to SikshaLink
         </h1>
         <p className="text-lg text-muted-foreground">
           {`The one-stop solution for ${userType === "student" ? "students" : "teachers"} to manage their academic life.`}
         </p>
       </div>

       {/* Login Form */}
       <div className="bg-muted/50 dark:bg-muted/30 p-6 rounded-xl shadow-md">
         <div className="space-y-4">
           <Button
             variant="outline"
             className="w-full h-12 border-2 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-300 dark:hover:text-blue-300"
             onClick={() => router.push("/login/student")}
           >
             <BookOpen className="h-4 w-4 mr-2" />
             Student Login
           </Button>
           <Button
             variant="outline"
             className="w-full h-12 border-2 hover:border-emerald-300 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
             onClick={() => router.push("/login/teacher")}
           >
             <GraduationCap className="h-4 w-4 mr-2" />
             Teacher Login
           </Button>
         </div>
       </div>

       {/* Footer */}
       <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
         <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
           Or sign in as
         </p>
         <div className="flex flex-col sm:flex-row gap-2">
           <Button
             variant="outline"
             onClick={() => router.push("/login/student")}
             className="w-full sm:w-1/2 h-12 border-2 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400"
           >
             <BookOpen className="h-4 w-4 mr-2" />
             Student
           </Button>
           <Button
             variant="ghost"
             onClick={() => router.push("/")}
             className="w-full sm:w-1/2 h-12"
           >
             Back
           </Button>
         </div>
       </div>
     </div>
  </div>
  )
}
