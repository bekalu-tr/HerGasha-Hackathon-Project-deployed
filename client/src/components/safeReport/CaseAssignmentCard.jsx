
import {
  UserRound,
  CalendarDays,
  CheckCircle,
  Clock,
} from "lucide-react";

const assignmentStatus = {
  assigned: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  in_progress: "bg-indigo-100 text-indigo-700",
  completed: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  reassigned: "bg-gray-100 text-gray-700",
};

const CaseAssignmentCard = ({
  assignment,
  onStatusChange,
  canManage = false,
}) => {
  if (!assignment) return null;

  const handler =
    typeof assignment.assignedTo === "object"
      ? assignment.assignedTo
      : null;

  const status = assignment.status || "assigned";

  const assignedDate = assignment.assignedAt
    ? new Date(assignment.assignedAt).toLocaleDateString()
    : "Unavailable";

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-purple-50 p-3 text-purple-700">
            <UserRound size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {handler?.name || "Assigned case handler"}
            </h3>

            <p className="text-sm capitalize text-gray-500">
              {(assignment.assignmentType || "primary_handler")
                .replaceAll("_", " ")}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            assignmentStatus[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status.replaceAll("_", " ")}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <CalendarDays size={16} />
          Assigned: {assignedDate}
        </p>

        {assignment.dueDate && (
          <p className="flex items-center gap-2">
            <Clock size={16} />
            Due: {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
        )}

        {assignment.completedAt && (
          <p className="flex items-center gap-2 text-green-700">
            <CheckCircle size={16} />
            Completed: {new Date(assignment.completedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {assignment.notes && (
        <p className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
          {assignment.notes}
        </p>
      )}

      {canManage && onStatusChange && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Update assignment status
          </label>

          <select
            value={status}
            onChange={(e) => onStatusChange(assignment._id, e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="assigned">Assigned</option>
            <option value="accepted">Accepted</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
            <option value="reassigned">Reassigned</option>
          </select>
        </div>
      )}
    </article>
  );
};

export default CaseAssignmentCard;
