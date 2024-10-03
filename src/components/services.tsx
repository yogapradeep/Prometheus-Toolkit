import { getTotalRulesCount } from "../utility";
import {
  IExporter,
  IRule,
  IService,
  useGroupServices,
} from "./context/groupsServicesContext";
import ServiceIcon from "./serviceIcon";

function Services({
  filterServices,
  setSelectedService,
  setModalOpen,
}: {
  filterServices: any;
  setSelectedService: any;
  setModalOpen: (data: boolean) => void;
}) {
  const { groups } = useGroupServices();
  return (
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
                    <ServiceIcon serviceName={service.name} />

                    <p className="text-slate-600 ml-2 font-bold text-sm">
                      {service.name}
                    </p>
                  </div>
                  <div className="mb-4 text-left h-18 overflow-hidden text-ellipsis ">
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-1    ring-1 ring-inset ring-gray-500/10 text-slate-400 font-bold text-2xs mr-1">
                      {getTotalRulesCount(service?.exporters)} RULES
                    </span>
                    <span className="text-ellipsis overflow-hidden">
                      {service?.exporters?.flatMap((exporter: IExporter) =>
                        exporter?.rules?.map((rule: IRule, index: number) => (
                          <span
                            key={index}
                            className="text-xs text-slate-400 font-medium"
                          >
                            {rule.name},{" "}
                          </span>
                        ))
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedService({
                        serviceName: service.name,
                        exporters: service.exporters,
                      });
                      setModalOpen(true);
                    }}
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
  );
}

export default Services;
