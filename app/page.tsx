"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  BookOpen,
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Play,
  Calendar,
  MessageSquare,
  Mail,
} from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    // prevent accidental horizontal scroll caused by absolutely positioned blobs
    <div className="min-h-screen overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* make large decorative blobs use smaller offsets on small screens so they don't create overflow */}
        <div className="absolute top-20 left-4 sm:left-20 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-4 sm:left-40 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SikshaLink
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn. Teach. Excel.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={() => router.push("/login/student")}
                className="btn-animate hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400"
              >
                Student Login
              </Button>
              <Button
                onClick={() => router.push("/login/teacher")}
                className="btn-animate bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Teacher Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 px-4 py-2">
              🚀 Next Generation Learning Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              <span className="text-gray-900 dark:text-white">Your</span>
              <br />
              <span className="text-gray-900 dark:text-white">Learning Journey</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect students and teachers in a seamless digital environment. Track progress, manage assignments, and
              foster meaningful educational relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/login/student")}
                className="btn-animate bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/login/teacher")}
                className="btn-animate border-2 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 px-8 py-4 text-lg"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Start Teaching
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Students", icon: Users },
              { number: "500+", label: "Expert Teachers", icon: GraduationCap },
              { number: "1000+", label: "Courses Available", icon: BookOpen },
              { number: "95%", label: "Success Rate", icon: Award },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive tools and features designed to enhance the learning and teaching experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Attendance",
                description: "Automated attendance tracking with real-time analytics and insights.",
                icon: CheckCircle,
                color: "from-green-500 to-emerald-600",
              },
              {
                title: "Assignment Management",
                description: "Create, distribute, and grade assignments with ease and efficiency.",
                icon: BookOpen,
                color: "from-blue-500 to-cyan-600",
              },
              {
                title: "Live Classes",
                description: "Interactive virtual classrooms with screen sharing and collaboration tools.",
                icon: Play,
                color: "from-purple-500 to-pink-600",
              },
              {
                title: "Doubt Resolution",
                description: "Instant Q&A platform connecting students with teachers and peers.",
                icon: MessageSquare,
                color: "from-orange-500 to-red-600",
              },
              {
                title: "Schedule Management",
                description: "Organized timetables and calendar integration for better planning.",
                icon: Calendar,
                color: "from-indigo-500 to-purple-600",
              },
              {
                title: "Progress Tracking",
                description: "Detailed analytics and reports to monitor learning progress.",
                icon: TrendingUp,
                color: "from-teal-500 to-green-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="card-hover border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Reference Section */}
      <section className="relative z-10 py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Help or Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our support team is here to assist you. Whether you need technical help, have questions about features, or want to provide feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.push("/contact")}
                className="btn-animate bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-animate border-2 border-white text-blue-600 hover:bg-gray-50  hover:text-blue-600 px-8 py-4 text-lg"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Education?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and teachers who are already experiencing the future of education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push("/login/student")}
              className="btn-animate bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg"
            >
              Get Started as Student
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/login/teacher")}
              className="btn-animate border-2 border-white text-blue-600 hover:bg-gray-50  hover:text-blue-600 px-8 py-4 text-lg"
            >
              Join as Teacher
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">SikshaLink</h3>
                  <p className="text-gray-400">Learn. Teach. Excel.</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Empowering education through technology. Connect, learn, and grow with our comprehensive learning
                management system.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#hero" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/contact")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SikshaLink. All rights reserved. Built with ❤️ for education.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
