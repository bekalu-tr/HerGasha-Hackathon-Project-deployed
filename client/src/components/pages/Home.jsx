
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  HeartHandshake,
  BriefcaseBusiness,
  ArrowRight,
  LockKeyhole,
  Users,
  Heart,
  CheckCircle2
} from "lucide-react";

const Home = () => {
  const services = [
    {
      icon: ShieldCheck,
      title: "Safe Reporting",
      description:
        "Access a reporting pathway for harassment, threats, blackmail, discrimination, and other safety concerns.",
      link: "/report",
      action: "Submit a report"
    },
    {
      icon: BriefcaseBusiness,
      title: "Career Opportunities",
      description:
        "Discover verified jobs, internships, part-time work, and other opportunities.",
      link: "/opportunities",
      action: "Explore opportunities"
    },
    {
      icon: HeartHandshake,
      title: "Support Services",
      description:
        "Request access to legal, health, counselling, and financial support.",
      link: "/support",
      action: "Get support"
    }
  ];

  const features = [
    "A dedicated place to submit safety reports",
    "Personal report and support request tracking",
    "Verified employment opportunities",
    "Access to different support services"
  ];

  return (
    <div className="bg-[#FFF3F9]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4B1248] via-[#521452] to-[#76104F]">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D90083]/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-pink-300/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-28">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-pink-100">
              <Heart size={16} />
              Safety. Opportunity. Support.
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              A stronger voice.
              <span className="block text-pink-300">
                A safer future.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-pink-100/90 sm:text-lg">
              Her Gasha connects female university students with
              reporting pathways, verified opportunities, and
              essential support services in one platform.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/report"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D90083] px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#B80070]"
              >
                Report an Incident
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/opportunities"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Find Opportunities
              </Link>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-pink-100/80">
              <LockKeyhole size={15} />
              Your privacy deserves careful protection.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg sm:p-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                <HeartHandshake size={34} className="text-[#D90083]" />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Your journey matters.
              </h2>

              <p className="mt-3 leading-7 text-pink-100/80">
                Whether you need to report an incident, find work,
                or access support, Her Gasha brings these pathways
                together.
              </p>

              <div className="mt-7 space-y-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-pink-300"
                    />
                    <span className="text-sm text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="font-bold uppercase tracking-widest text-[#D90083]">
            What we offer
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#4B1248] sm:text-4xl">
            One platform, essential services
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Explore the services designed to help students access
            support, safety pathways, and opportunities.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-pink-100 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-[#D90083]">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#4B1248]">
                  {service.title}
                </h3>

                <p className="mt-3 min-h-20 leading-7 text-gray-600">
                  {service.description}
                </p>

                <Link
                  to={service.link}
                  className="mt-5 inline-flex items-center gap-2 font-bold text-[#D90083] hover:text-[#4B1248]"
                >
                  {service.action}
                  <ArrowRight size={17} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className="border-y border-pink-100 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <span className="font-bold uppercase tracking-widest text-[#D90083]">
              About Her Gasha
            </span>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#4B1248]">
              Every student deserves dignity, safety, and opportunity.
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Her Gasha is designed to bring important services
              together so female university students can find
              appropriate reporting pathways and access support
              and career opportunities.
            </p>

            <Link
              to="/support"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#4B1248] px-6 py-3 font-semibold text-white transition hover:bg-[#D90083]"
            >
              Discover our services
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#FFF3F9] p-6">
              <ShieldCheck size={32} className="text-[#D90083]" />
              <h3 className="mt-4 font-bold text-[#4B1248]">
                Safety
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Reporting pathways for safety concerns.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-[#F8E8F3] p-6">
              <Users size={32} className="text-[#4B1248]" />
              <h3 className="mt-4 font-bold text-[#4B1248]">
                Community
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Support for female students.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8E8F3] p-6">
              <BriefcaseBusiness size={32} className="text-[#4B1248]" />
              <h3 className="mt-4 font-bold text-[#4B1248]">
                Opportunity
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Access to verified opportunities.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-[#FFF3F9] p-6">
              <HeartHandshake size={32} className="text-[#D90083]" />
              <h3 className="mt-4 font-bold text-[#4B1248]">
                Support
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Connections to essential services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#4B1248] px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white">
          Be part of a stronger future.
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-pink-100/80">
          Join Her Gasha and explore the services available to you.
        </p>

        <Link
          to="/register"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D90083] px-7 py-4 font-bold text-white transition hover:bg-[#B80070]"
        >
          Create an Account
          <ArrowRight size={18} />
        </Link>
      </section>

    </div>
  );
};

export default Home;
 