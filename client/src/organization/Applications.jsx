
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Search,
  Users,
  Filter,
  Inbox,
} from "lucide-react";

export default function Applications() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Applications will be loaded from the backend API later.
  const applications = [];

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.applicantName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      application.opportunityTitle
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || application.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b px-5 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/organization/dashboard"
            className="inline-flex items-center gap-2 text-sm text-green-700 hover:underline mb-3"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">
            Applications
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Review applications submitted to your organization.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-5 sm:p-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {applications.length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="text-blue-700" size={25} />
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Pending Applications
                </p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {applications.filter((item) => item.status === "Pending").length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <FileText className="text-orange-600" size={25} />
              </div>
            </div>
          </div>
        </div>

        <section className="bg-white border rounded-xl p-5">

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Applicant List
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Search and filter applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search applicant..."
                  className="w-full sm:w-56 border rounded-lg py-2.5 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div className="relative">
                <Filter
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full sm:w-44 border rounded-lg py-2.5 pl-9 pr-3 outline-none focus:ring-2 focus:ring-green-200"
                >
                  <option value="All">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="py-16 text-center border-t">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Inbox size={30} className="text-gray-400" />
              </div>

              <h3 className="font-bold text-gray-800 text-lg">
                No applications yet
              </h3>

              <p className="text-gray-500 text-sm max-w-md mx-auto mt-2">
                Applications submitted to your published opportunities
                will appear here once the applications API is connected.
              </p>

              <Link
                to="/organization/opportunities"
                className="inline-flex items-center gap-2 mt-5 bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-800"
              >
                <FileText size={17} />
                Manage Opportunities
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-3">Applicant</th>
                    <th className="p-3">Opportunity</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="border-t">
                      <td className="p-3 font-medium">
                        {application.applicantName}
                      </td>
                      <td className="p-3">
                        {application.opportunityTitle}
                      </td>
                      <td className="p-3">
                        {application.date}
                      </td>
                      <td className="p-3">
                        {application.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}
