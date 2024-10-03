import * as yaml from "js-yaml";

export const formatCount = (num: number) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

export const getTotalRulesCount = (exporters: any[]) => {
  return exporters.reduce((total, exporter) => {
    return total + (exporter.rules?.length || 0);
  }, 0);
};

export const fetchAllExporterRules = async (serviceName: string) => {
  const folderName = serviceName.toLowerCase().replace(/\s/g, "-");
  const response = await fetch(
    `https://api.github.com/repos/samber/awesome-prometheus-alerts/contents/dist/rules/${folderName}?ref=master`
  );
  const files = await response.json();

  const allRules = await Promise.all(
    files
      .filter((file: any) => file.name.endsWith(".yml"))
      .map(async (yamlFile: any) => {
        const rawYaml = await fetch(yamlFile.download_url);
        const yamlContent = await rawYaml.text();
        return yaml.load(yamlContent);
      })
  );

  return allRules;
};
