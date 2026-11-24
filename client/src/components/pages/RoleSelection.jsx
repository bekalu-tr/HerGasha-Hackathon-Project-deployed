
import { Link } from "react-router-dom";

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-4xl mb-4">🌱</div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Join Her Gasha
          </h1>

          <p className="text-slate-500 mt-3">
            Choose how you want to be part of our community.
          </p>
        </div>

        {/* Role selection */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Student */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition">

            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🎓
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              I'm a Student
            </h2>

            <p className="text-slate-500 mt-3 mb-6 leading-relaxed">
              Join Her Gasha to access opportunities, report
              harassment, find support, and connect with a
              safer community.
            </p>

            <ul className="space-y-3 text-sm text-slate-600 mb-8">
              <li>✓ Access student support</li>
              <li>✓ Report harassment</li>
              <li>✓ Discover opportunities</li>
              <li>✓ Track your reports</li>
            </ul>

            <Link
              to="/register"
              className="block text-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Continue as Student →
            </Link>
          </div>

          {/* Organization */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition">

            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🏢
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              I'm an Organization
            </h2>

            <p className="text-slate-500 mt-3 mb-6 leading-relaxed">
              Partner with Her Gasha to support women,
              promote safety, and provide meaningful
              opportunities.
            </p>

            <ul className="space-y-3 text-sm text-slate-600 mb-8">
              <li>✓ Partner with the platform</li>
              <li>✓ Share opportunities</li>
              <li>✓ Support women's safety</li>
              <li>✓ Collaborate with students</li>
            </ul>

            <Link
              to="/organization-register"
              className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Register Organization →
            </Link>
          </div>

        </div>

        {/* Login */}
        <div className="text-center mt-8 text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}
