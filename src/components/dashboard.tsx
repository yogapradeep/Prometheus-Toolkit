import React, { useState } from "react";
import {
  IRule,
  IService,
  useGroupServices,
} from "./context/groupsServicesContext";
import logo from "../assets/logo.png";
import type { SimpleIcon } from "simple-icons";
import * as SimpleIcons from "simple-icons";
import { formatCount } from "../utility";

function Dashboard() {
  const { groups, githubStarCount } = useGroupServices();
  console.log("context", groups);
  const [searchQuery, setSearchQuery] = useState("");

  const getServiceIcon = (serviceName: string, customColorCode?: string) => {
    const iconName = serviceName.toLowerCase().split(" ")[0];
    console.log("iconName", iconName);
    const icon: SimpleIcon = (SimpleIcons as any)[
      `si${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`
    ];

    console.info("icon", icon);

    if (icon) {
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill={`#${customColorCode ?? icon.hex}`}
          className="h-6 w-6 inline-block"
        >
          <path d={icon.path} />
        </svg>
      );
    }

    return (
      <svg
        role="img"
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.66671 16.5H2.50004C2.04171 16.5 1.64935 16.3368 1.32296 16.0104C0.996568 15.684 0.833374 15.2917 0.833374 14.8333V11.6667C1.50004 11.6667 2.08337 11.4549 2.58337 11.0312C3.08337 10.6076 3.33337 10.0694 3.33337 9.41667C3.33337 8.76389 3.08337 8.22569 2.58337 7.80208C2.08337 7.37847 1.50004 7.16667 0.833374 7.16667V4C0.833374 3.54167 0.996568 3.14931 1.32296 2.82292C1.64935 2.49653 2.04171 2.33333 2.50004 2.33333H5.83337C5.83337 1.75 6.03476 1.25694 6.43754 0.854167C6.84032 0.451389 7.33337 0.25 7.91671 0.25C8.50004 0.25 8.9931 0.451389 9.39587 0.854167C9.79865 1.25694 10 1.75 10 2.33333H13.3334C13.7917 2.33333 14.1841 2.49653 14.5105 2.82292C14.8368 3.14931 15 3.54167 15 4V7.33333C15.5834 7.33333 16.0764 7.53472 16.4792 7.9375C16.882 8.34028 17.0834 8.83333 17.0834 9.41667C17.0834 10 16.882 10.4931 16.4792 10.8958C16.0764 11.2986 15.5834 11.5 15 11.5V14.8333C15 15.2917 14.8368 15.684 14.5105 16.0104C14.1841 16.3368 13.7917 16.5 13.3334 16.5H10.1667C10.1667 15.8056 9.94796 15.2153 9.51046 14.7292C9.07296 14.2431 8.54171 14 7.91671 14C7.29171 14 6.76046 14.2431 6.32296 14.7292C5.88546 15.2153 5.66671 15.8056 5.66671 16.5Z"
          fill="#94A3B8"
        />
      </svg>
    );
  };

  const filterServices = (services: any[]) =>
    services.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="container mx-auto  ">
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
              {getServiceIcon("github", "94A3B8")}
              <p className="text-slate-500 font-medium text-sm">
                {formatCount(githubStarCount)} stars
              </p>
            </a>
          </div>
        </nav>
      </header>
      <div className="container mx-auto w-4/5">
        <div className="mt-12">
          <p className="text-slate-600 text-xl text-left mb-4 font-medium">
            Browse Library
          </p>
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33334 7.33334H7.80667L7.62001 7.15334C8.42001 6.22 8.83334 4.94667 8.60667 3.59334C8.29334 1.74001 6.74667 0.260005 4.88 0.0333384C2.06 -0.313328 -0.313328 2.06 0.0333384 4.88C0.260005 6.74667 1.74001 8.29334 3.59334 8.60667C4.94667 8.83334 6.22001 8.42 7.15334 7.62L7.33334 7.80667V8.33334L10.1667 11.1667C10.44 11.44 10.8867 11.44 11.16 11.1667C11.4333 10.8933 11.4333 10.4467 11.16 10.1733L8.33334 7.33334ZM4.33334 7.33334C2.67334 7.33334 1.33334 5.99334 1.33334 4.33334C1.33334 2.67334 2.67334 1.33334 4.33334 1.33334C5.99334 1.33334 7.33334 2.67334 7.33334 4.33334C7.33334 5.99334 5.99334 7.33334 4.33334 7.33334Z"
                  fill="#94A3B8"
                />
              </svg>
            </span>
            <input
              className=" placeholder:text-slate-400  block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-200 focus:ring-1 sm:text-sm text-slate-400 font-medium text-xs"
              placeholder="Search for a component"
              type="text"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>

        <div className="">
          {groups?.map((group) => {
            const filteredServices = filterServices(group.services);
            if (filteredServices.length === 0) return null;

            return (
              <div key={group.name} className="py-4">
                <h2 className="font-bold text-left text-slate-400 text-2xs mb-4">
                  {group.name.toUpperCase()}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {filteredServices.map((service: IService) => (
                    <div
                      key={service.name}
                      className=" bg-white rounded-md shadow-sm  border border-slate-100 p-6"
                    >
                      <div className="flex items-center mb-4">
                        {getServiceIcon(service.name)}

                        <p className="text-slate-600 ml-2 font-bold text-sm">
                          {service.name}
                        </p>
                      </div>
                      <div className="mb-4 text-left h-18 overflow-hidden text-ellipsis ">
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-1    ring-1 ring-inset ring-gray-500/10 text-slate-400 font-bold text-2xs mr-1">
                          {service.exporters[0]?.rules?.length ?? 0} RULES
                        </span>
                        <span className=" text-ellipsis overflow-hidden ">
                          {service?.exporters[0]?.rules?.map((rule: IRule) => (
                            <span
                              key={rule.name}
                              className="text-xs text-slate-400 font-medium"
                            >
                              {rule.name},{" "}
                            </span>
                          ))}
                        </span>
                      </div>
                      <button
                        // onClick={() => openServiceModal(service)}
                        className=" text-slate-600  rounded border border-slate-200 bg-white w-full p-2 font-semibold text-xs "
                      >
                        View Alert Rules
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
