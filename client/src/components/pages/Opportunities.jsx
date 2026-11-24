
import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  ExternalLink,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import api from "../../services/api.js";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/opportunities", {
        params: {
          search: search.trim() || undefined,
          type: type || undefined
        }
      });

      const result = response.data;

      setOpportunities(
        Array.isArray(result)
          ? result
          : result.opportunities || result.data || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load opportunities. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadOpportunities();
    }, 350);

    return () => clearTimeout(timeout);
  }, [search, type]);

  const formatType = (value = "") =>
    value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="min-h-screen bg-[#FFF3F9] px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4B1248] text-white">
            <BriefcaseBusiness size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-[#4B1248] sm:text-4xl">
            Career Opportunities
          </h1>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            Discover jobs, internships, part-time work, and
            freelance opportunities published on Her Gasha.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 grid gap-4 rounded-2xl border border-pink-100 bg-white p-5 shadow-sm md:grid-cols-[1fr_230px]">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs, organizations, or locations..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#D90083]"
          >
            <option value="">All opportunities</option>
            <option value="job">Jobs</option>
            <option value="internship">Internships</option>
            <option value="part_time">Part-time</option>
            <option value="short_term">Short-term</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <p className="font-semibold text-[#4B1248]">
            {loading ? "Searching..." : `${opportunities.length} opportunities found`}
          </p>

          <button
            onClick={loadOpportunities}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D90083]"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        {error && (
          <div role="alert" className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-48 items-center justify-center gap-3 text-[#4B1248]">
            <RefreshCw className="animate-spin" />
            Loading opportunities...
          </div>
        ) : opportunities.length === 0 ? (
          <div className="rounded-2xl border border-pink-100 bg-white px-6 py-16 text-center">
            <BriefcaseBusiness className="mx-auto text-[#D90083]" size={40} />
            <h2 className="mt-4 text-xl font-bold text-[#4B1248]">
              No opportunities found
            </h2>
            <p className="mt-2 text-gray-500">
              Try another search term or change your filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((item) => (
              <article
                key={item._id}
                className="flex flex-col rounded-2xl border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-[#D90083]">
                    <BriefcaseBusiness size={23} />
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Verified
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#4B1248]">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm font-medium text-[#D90083]">
                  {item.organization}
                </p>

                <p className="mt-4 flex-1 text-sm leading-7 text-gray-600">
                  {item.description}
                </p>

                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness size={16} />
                    {formatType(item.type)}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {item.location}
                  </div>

                  {item.deadline && (
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      Deadline: {new Date(item.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {item.applicationLink ? (
                  <a
                    href={item.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#D90083] px-5 py-3 font-bold text-white transition hover:bg-[#B80070]"
                  >
                    Apply Now
                    <ExternalLink size={17} />
                  </a>
                ) : (
                  <div className="mt-6 rounded-xl bg-gray-100 px-5 py-3 text-center text-sm text-gray-500">
                    Contact organization for application details
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Opportunities;
