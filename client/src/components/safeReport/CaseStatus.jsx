
import {
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck,
  FileSearch,
} from "lucide-react";

const statusConfig = {
  submitted: {
    label: "Submitted",
    description: "Your report has been received.",
    icon: Clock,
    color: "bg-blue-100 text-blue-700",
  },
  under_review: {
    label: "Under Review",
    description: "An authorized handler is reviewing your report.",
    icon: FileSearch,
    color: "bg-yellow-100 text-yellow-700",
  },
  assigned: {
    label: "Handler Assigned",
    description: "Your report has been assigned to a case handler.",
    icon: UserCheck,
    color: "bg-purple-100 text-purple-700",
  },
  in_progress: {
    label: "In Progress",
    description: "Your case is being handled.",
    icon: Clock,
    color: "bg-indigo-100 text-indigo-700",
  },
  resolved: {
    label: "Resolved",
    description: "The case has been marked as resolved.",
    icon: CheckCircle,
    color: "bg-green-100 text-green-700",
  },
  closed: {
    label: "Closed",
    description: "The case has been closed.",
    icon: CheckCircle,
    color: "bg-gray-100 text-gray-700",
  },
  rejected: {
    label: "Not Accepted",
    description: "The report was not accepted for handling.",
    icon: AlertCircle,
    color: "bg-red-100 text-red-700",
  },
};

const CaseStatus = ({ status = "submitted" }) => {
  const current = statusConfig[status] || statusConfig.submitted;
  const Icon = current.icon;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-3 text-sm font-medium text-gray-500">
        Current case status
      </p>

      <div className="flex items-center gap-3">
        <div className={`rounded-full p-3 ${current.color}`}>
          <Icon size={22} />
        </div>

        <div>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${current.color}`}>
            {current.label}
          </span>

          <p className="mt-2 text-sm text-gray-600">
            {current.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseStatus;
