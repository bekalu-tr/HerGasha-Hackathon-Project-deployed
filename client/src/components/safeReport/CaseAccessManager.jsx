
import { useState } from "react";
import {
  ShieldCheck,
  ShieldX,
  UserRound,
  CalendarDays,
} from "lucide-react";

const CaseAccessManager = ({
  accessRecords = [],
  onRevoke,
  onGrant,
  canManage = false,
}) => {
  const [userId, setUserId] = useState("");
  const [permission, setPermission] = useState("read");
  const [accessType, setAccessType] = useState("case_handler");

  const handleGrant = async (event) => {
    event.preventDefault();

    if (!userId.trim()) return;

    await onGrant?.({
      user: userId.trim(),
      permission,
      accessType,
    });

    setUserId("");
  };

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900">
          Case access management
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Review who has been granted access to this case.
        </p>
      </div>

      {canManage && (
        <form
          onSubmit={handleGrant}
          className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
        >
          <h3 className="font-semibold text-gray-800">
            Grant case access
          </h3>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Authorized user's ID
            </label>

            <input
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Access type
              </label>

              <select
                value={accessType}
                onChange={(e) => setAccessType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
              >
                <option value="case_handler">Case handler</option>
                <option value="legal_advisor">Legal advisor</option>
                <option value="support_coordinator">
                  Support coordinator
                </option>
                <option value="admin_reviewer">Admin reviewer</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Permission
              </label>

              <select
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
              >
                <option value="read">Read</option>
                <option value="update">Update</option>
                <option value="manage">Manage</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
          >
            Grant access
          </button>
        </form>
      )}

      <div className="space-y-3">
        {accessRecords.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
            <ShieldCheck className="mx-auto mb-2 text-gray-400" size={28} />
            <p className="font-medium text-gray-700">
              No access records
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Authorized access records will appear here.
            </p>
          </div>
        ) : (
          accessRecords.map((record) => {
            const user =
              typeof record.user === "object" ? record.user : null;

            return (
              <div
                key={record._id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                    <UserRound size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      {user?.name || "Authorized user"}
                    </p>
                    <p className="text-xs capitalize text-gray-500">
                      {(record.accessType || "").replaceAll("_", " ")}
                      {" · "}
                      {record.permission}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <CalendarDays size={13} />
                      {record.createdAt
                        ? new Date(record.createdAt).toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      record.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {record.isActive ? "Active" : "Revoked"}
                  </span>

                  {canManage && record.isActive && (
                    <button
                      type="button"
                      onClick={() => onRevoke?.(record._id)}
                      className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      <ShieldX size={17} />
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <p className="text-xs leading-5 text-gray-500">
        This is an interface only. The backend must verify administrator
        permissions, validate the user's role, record consent separately,
        and enforce access restrictions on every protected API request.
      </p>
    </section>
  );
};

export default CaseAccessManager;
