
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  HeartHandshake,
  BriefcaseBusiness,
  Plus,
  RefreshCw,
  AlertCircle,
  Clock3,
  CheckCircle2
} from "lucide-react";
import api from "../../services/api.js";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [supportRequests, setSupportRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [reportsResponse, supportResponse] = await Promise.all([
        api.get("/reports"),
        api.get("/support")
      ]);

      const reportData = reportsResponse.data;
      const supportData = supportResponse.data;

      const reportList = Array.isArray(reportData)
        ? reportData
        : reportData.reports || reportData.data || [];

      const supportList = Array.isArray(supportData)
        ? supportData
        : supportData.requests ||
          supportData.supportRequests ||
          supportData.data ||
          [];

      setReports(reportList);
      setSupportRequests(supportList);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load your dashboard. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const getStatusStyle = (status) => {
    const styles = {
      submitted: "bg-blue-50 text-blue-700",
      under_review: "bg-yellow-50 text-yellow-700",
      assigned: "bg-purple-50 text-purple-700",
      in_progress: "bg-indigo-50 text-indigo-700",
      resolved: "bg-green-50 text-green-700",
      fulfilled: "bg-green-50 text-green-700",
      closed: "bg-gray-100 text-gray-600",
      pending: "bg-yellow-50 text-yellow-700"
    };

    return styles[status] || "bg-gray-100 text-gray-600";
  };

  const formatStatus = (status = "unknown") =>
    status.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const StatCard = ({ title, count, icon: Icon, description }) => (
    <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-extrabold text-[#4B1248]">
            {count}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-[#D90083]">
          <Icon size={25} />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">{description}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-[#4B1248]">
        <RefreshCw className="animate-spin" />
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF3F9] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-[#D90083]">
              STUDENT DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-[#4B1248]">
              Welcome, {user?.name || "Student"}
            </h1>

            <p className="mt-2 text-gray-600">
              View your reports and support requests in one place.
            </p>
          </div>

          <button
            onClick={loadDashboard}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-pink-200 bg-white px-5 py-3 font-semibold text-[#4B1248] hover:bg-pink-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {error && (
          <div role="alert" className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="My Reports"
            count={reports.length}
            icon={FileText}
            description="Reports submitted through Her Gasha"
          />

          <StatCard
            title="Support Requests"
            count={supportRequests.length}
            icon={HeartHandshake}
            description="Your submitted support requests"
          />

          <StatCard
            title="Resolved Reports"
            count={reports.filter((report) => report.status === "resolved").length}
            icon={CheckCircle2}
            description="Reports marked as resolved"
          />
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <Link
            to="/report"
            className="flex items-center justify-between rounded-2xl bg-[#4B1248] p-6 text-white transition hover:bg-[#521452]"
          >
            <div>
              <h3 className="font-bold">Submit a Report</h3>
              <p className="mt-1 text-sm text-pink-100/80">
                Share a safety concern
              </p>
            </div>
            <Plus size={25} />
          </Link>

          <Link
            to="/support"
            className="flex items-center justify-between rounded-2xl bg-[#D90083] p-6 text-white transition hover:bg-[#B80070]"
          >
            <div>
              <h3 className="font-bold">Request Support</h3>
              <p className="mt-1 text-sm text-pink-100/90">
                Find assistance
              </p>
            </div>
            <HeartHandshake size={25} />
          </Link>

          <Link
            to="/opportunities"
            className="flex items-center justify-between rounded-2xl border border-pink-200 bg-white p-6 text-[#4B1248] transition hover:border-[#D90083]"
          >
            <div>
              <h3 className="font-bold">Find Opportunities</h3>
              <p className="mt-1 text-sm text-gray-500">
                Explore jobs and internships
              </p>
            </div>
            <BriefcaseBusiness size={25} />
          </Link>
        </div>

        <section className="mb-8 rounded-2xl border border-pink-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#4B1248]">
                My Reports
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your submitted safety reports
              </p>
            </div>

            <FileText className="text-[#D90083]" size={25} />
          </div>

          {reports.length === 0 ? (
            <div className="rounded-xl bg-[#FFF3F9] p-8 text-center">
              <FileText className="mx-auto text-[#D90083]" size={35} />
              <p className="mt-3 font-semibold text-[#4B1248]">
                No reports yet
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Your submitted reports will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-semibold capitalize text-[#4B1248]">
                      {(report.category || "Report").replaceAll("_", " ")}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Submitted: {report.createdAt
                        ? new Date(report.createdAt).toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(report.status)}`}>
                    <Clock3 size={13} />
                    {formatStatus(report.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#4B1248]">
                My Support Requests
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Track your requests for assistance
              </p>
            </div>

            <HeartHandshake className="text-[#D90083]" size={25} />
          </div>

          {supportRequests.length === 0 ? (
            <div className="rounded-xl bg-[#FFF3F9] p-8 text-center">
              <HeartHandshake className="mx-auto text-[#D90083]" size={35} />
              <p className="mt-3 font-semibold text-[#4B1248]">
                No support requests yet
              </p>
              <Link
                to="/support"
                className="mt-3 inline-block font-semibold text-[#D90083]"
              >
                Request support
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {supportRequests.map((request) => (
                <div
                  key={request._id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-semibold capitalize text-[#4B1248]">
                      {(request.category || "Support").replaceAll("_", " ")}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {request.createdAt
                        ? new Date(request.createdAt).toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <span className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(request.status)}`}>
                    {formatStatus(request.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
