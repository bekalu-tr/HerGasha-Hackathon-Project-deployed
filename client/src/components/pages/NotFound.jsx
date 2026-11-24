
import { Link } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";

import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-pinkBg flex items-center justify-center px-4">

      <div className="max-w-lg w-full text-center">

        <div className="w-24 h-24 mx-auto rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
          <SearchX className="w-12 h-12 text-magenta" />
        </div>

        <h1 className="text-8xl font-extrabold text-plum">
          404
        </h1>

        <h2 className="text-2xl font-bold text-plum mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-3 leading-relaxed">
          Sorry! The page you are looking for does not exist,
          may have been moved, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">

          <Link to="/" className="w-full sm:w-auto">
            <Button fullWidth>
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>

          <Button
            variant="outline"
            fullWidth
            onClick={() => window.history.back()}
            className="sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>

        </div>

        <p className="mt-10 text-sm text-gray-500">
          HER GASHA — Safety, Opportunity and Support.
        </p>

      </div>

    </main>
  );
}
