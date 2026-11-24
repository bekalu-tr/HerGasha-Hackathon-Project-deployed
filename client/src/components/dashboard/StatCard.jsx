
import {
  FileText,
  Clock,
  CheckCircle,
  HeartHandshake,
  TrendingUp
} from "lucide-react";

const iconMap = {
  reports: FileText,
  pending: Clock,
  completed: CheckCircle,
  support: HeartHandshake,
  default: TrendingUp
};

export default function StatCard({
  title,
  value = 0,
  description,
  icon = "default",
  color = "plum",
  trend
}) {
  const Icon = iconMap[icon] || iconMap.default;

  const colors = {
    plum: "bg-purple-100 text-plum",
    pink: "bg-pink-100 text-magenta",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700"
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

      <div className="flex items-start justify-between gap-3">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-plum mt-3">
            {value}
          </h3>
        </div>

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color] || colors.plum}`}>
          <Icon className="w-6 h-6" />
        </div>

      </div>

      {description && (
        <p className="text-sm text-gray-500 mt-4">
          {description}
        </p>
      )}

      {trend && (
        <div className="flex items-center gap-1 mt-3 text-sm text-green-700">
          <TrendingUp className="w-4 h-4" />
          <span>{trend}</span>
        </div>
      )}

    </div>
  );
}
