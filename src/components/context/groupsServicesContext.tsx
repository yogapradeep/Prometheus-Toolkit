"use client";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as yaml from "js-yaml";

export interface IExporter {
  slug: string;
  rules: IRule[];
}

export interface IService {
  name: string;
  exporters: IExporter[];
}

export interface IGroup {
  name: string;
  services: IService[];
}

export interface IRule {
  name: string;
  description: string;
  query: string;
  severity: string;
}

export interface GroupServicesContextProps {
  groups: IGroup[] | null;
  setGroups: React.Dispatch<React.SetStateAction<IGroup[] | null>>;
  githubStarCount: number;
}

const GroupServicesContext = createContext<GroupServicesContextProps | null>(
  null
);

const GroupServicesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [groups, setGroups] = useState<IGroup[] | null>(null);
  const [githubStarCount, setGithubStarCount] = useState<number>(125);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/_data/rules.yml"
    )
      .then((response) => response.text())
      .then((data) => {
        const parsedData = yaml.load(data);

        if (parsedData && parsedData.groups) {
          const newGroups = parsedData.groups?.map((group: IGroup) => ({
            name: group.name,
            services: group.services?.map((service: IService) => ({
              name: service.name,
              exporters: service.exporters?.map((exporter: IExporter) => ({
                slug: exporter.slug,
                rules: exporter.rules?.map((rule: IRule) => ({
                  name: rule.name,
                  description: rule.description,
                  query: rule.query,
                  severity: rule.severity,
                })),
              })),
            })),
          }));
          setGroups(newGroups);
        }
        console.log("Groups", groups);
      })
      .catch((error) => {
        console.error("Error fetching alert rules:", error);
      });
    getStarCount();
  }, []);
  const getStarCount = async () => {
    const response = await fetch(
      `https://api.github.com/repos/samber/awesome-prometheus-alerts`
    );
    const data = await response.json();
    setGithubStarCount(data.stargazers_count);
  };

  const value = useMemo(
    () => ({
      groups,
      setGroups,
      githubStarCount,
    }),
    [groups, githubStarCount]
  );

  return (
    <GroupServicesContext.Provider value={value}>
      {children}
    </GroupServicesContext.Provider>
  );
};

const useGroupServices = () => {
  const context = useContext(GroupServicesContext);
  if (!context) {
    throw new Error(
      "useGroupServices must be used within a GroupServicesProvider"
    );
  }
  return context;
};

export { GroupServicesProvider, useGroupServices };
