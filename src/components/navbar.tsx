import logo from "../assets/logo.png";
import { formatCount } from "../utility";
import { useGroupServices } from "./context/groupsServicesContext";
import ServiceIcon from "./serviceIcon";

function Navbar() {
  const { githubStarCount } = useGroupServices();
  return (
    <header className="bg-white border-b ">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between  w-4/5"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="">
            <span className="sr-only"> Awesome Prometheus Toolkit</span>
            <img alt="" src={logo} className=" w-auto" height={80} />
          </a>
        </div>
        <div className="">
          <a
            href="https://github.com/samber/awesome-prometheus-alerts"
            target="_blank"
            className=" flex items-center gap-2"
          >
            <ServiceIcon serviceName="github" customColorCode="94A3B8" />
            <p className="text-slate-500 font-medium text-sm">
              {formatCount(githubStarCount)} stars
            </p>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
