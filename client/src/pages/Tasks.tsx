import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Trash2, Edit2, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import TaskModal from "@/components/TaskModal";
import { format, isPast, isToday } from "date-fns";

const PRIORITY_COLORS = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};

const STATUS_ICONS = {
  todo: <AlertCircle className="w-4 h-4" />,
  "in-progress": <Clock className="w-4 h-4" />,
  done: <CheckCircle2 className="w-4 h-4" />,
};

export default function Tasks() {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
    search: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  const { data: tasks = [], isLoading, refetch } = trpc.tasks.list.useQuery(filters);
  const deleteMutation = trpc.tasks.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate({ id: taskId });
    }
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    refetch();
  };

  const isOverdue = (dueDate: Date | null) => {
    if (!dueDate) return false;
    const date = new Date(dueDate);
    return isPast(date) && !isToday(date);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-2">Manage and organize your tasks efficiently.</p>
          </div>
          <Button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <Input
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="border-gray-300"
          />
          <Select value={filters.status || "all"} onValueChange={(value) => setFilters({ ...filters, status: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.priority || "all"} onValueChange={(value) => setFilters({ ...filters, priority: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.category || "all"} onValueChange={(value) => setFilters({ ...filters, category: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Study">Study</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setFilters({ status: "", priority: "", category: "", search: "" })}
            className="border-gray-300"
          >
            Clear Filters
          </Button>
        </div>

        {/* Task List */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : tasks.length === 0 ? (
          <Card className="p-12 text-center border-gray-200">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No tasks found</h3>
            <p className="text-gray-600 mt-2">Create a new task to get started.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {tasks.map((task: any) => (
              <Card
                key={task.id}
                className={`p-4 border-2 transition-all hover:shadow-md ${
                  isOverdue(task.dueDate) ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-500">{STATUS_ICONS[task.status as keyof typeof STATUS_ICONS]}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[task.priority as keyof typeof PRIORITY_COLORS]}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      {task.category && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {task.category}
                        </span>
                      )}
                      {isOverdue(task.dueDate) && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Overdue
                        </span>
                      )}
                    </div>
                    {task.description && (
                      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {task.dueDate && (
                        <span>
                          Due: <strong className={isOverdue(task.dueDate) ? "text-red-600" : "text-gray-900"}>
                            {format(new Date(task.dueDate), "MMM dd, yyyy")}
                          </strong>
                        </span>
                      )}
                      <span>Created: {format(new Date(task.createdAt), "MMM dd, yyyy")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(task)}
                      className="border-gray-300"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(task.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editingTask={editingTask}
        />
      </div>
    </DashboardLayout>
  );
}
