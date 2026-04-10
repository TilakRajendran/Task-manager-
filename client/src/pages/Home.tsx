import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, BarChart3, Filter, Lock } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated && !loading) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
            <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Task Manager Pro</h1>
            </div>
            {!isAuthenticated && (
              <Button asChild>
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Organize Your Tasks Effortlessly
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            A powerful, elegant task management application designed to help you stay productive. Create, organize, and track your tasks with beautiful analytics and intuitive controls.
          </p>
          {!isAuthenticated && (
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <a href={getLoginUrl()}>Get Started Free</a>
            </Button>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Create, edit, and delete tasks with comprehensive fields including priority, status, and due dates.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Visualize your task progress with real-time charts and statistics showing task distribution and status breakdown.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Filter className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Smart Filtering</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Filter tasks by status, priority, category, or search by title to quickly find what you need.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Your tasks are protected with secure Manus OAuth authentication and encrypted session management.</p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Powerful Features</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">✓</span>
                Full Task CRUD Operations
              </h4>
              <p className="text-slate-600">Create, read, update, and delete tasks with all essential fields: title, description, priority, status, due date, and category.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">✓</span>
                Real-time Analytics
              </h4>
              <p className="text-slate-600">View live statistics with bar charts and pie charts showing task distribution across statuses and priorities.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">✓</span>
                Advanced Filtering & Search
              </h4>
              <p className="text-slate-600">Filter by status, priority, and category. Search tasks by title with instant results and clear filters option.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">✓</span>
                Overdue Task Highlighting
              </h4>
              <p className="text-slate-600">Visual indicators for overdue tasks and formatted due dates help you stay on top of deadlines.</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-slate-900 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Built with Modern Technology</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Frontend</h4>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• React 19 with TypeScript</li>
                <li>• Tailwind CSS 4</li>
                <li>• shadcn/ui Components</li>
                <li>• Recharts Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Backend</h4>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Express.js Server</li>
                <li>• tRPC APIs</li>
                <li>• Drizzle ORM</li>
                <li>• MySQL Database</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Security</h4>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Manus OAuth</li>
                <li>• Session Management</li>
                <li>• Protected Routes</li>
                <li>• Type-Safe APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-slate-600">
          <p>Task Manager Pro • Built with Manus • © 2026</p>
        </div>
      </footer>
    </div>
  );
}
