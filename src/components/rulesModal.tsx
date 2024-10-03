import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { getTotalRulesCount } from "../utility";
import { IExporter } from "./context/groupsServicesContext";
import RuleClipboard from "./ruleClipboard";
import ServiceIcon from "./serviceIcon";

interface ExporterRule {
  alert: string;
  expr: string;
  for: string;
  labels: {
    severity: string;
  };
  annotations: {
    summary: string;
    description: string;
  };
}

function RulesModal({
  selectedService,
  setSelectedService,
  modalOpen,
  setModalOpen,
  isLoading,
  serviceRules,
}: {
  selectedService: {
    serviceName: string;
    exporters: IExporter[];
  } | null;
  setSelectedService: any;
  modalOpen: boolean;
  setModalOpen: (data: boolean) => void;
  isLoading: boolean;
  serviceRules: any;
}) {
  if (!selectedService) {
    return null;
  }
  return (
    <Dialog
      open={modalOpen}
      onClose={() => {
        setSelectedService(null);
        setModalOpen(false);
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <DialogTitle
              as="div"
              className="leading-6 py-4 px-6 border border-slate-200"
            >
              <div className="flex flex-1 items-center  justify-between">
                <div className="flex items-center">
                  <ServiceIcon serviceName={selectedService.serviceName} />

                  <p className="text-slate-600 ml-2 font-bold text-sm">
                    {selectedService.serviceName}
                  </p>
                  <span className="inline-flex items-center rounded-md bg-gray-50 px-1    ring-1 ring-inset ring-gray-500/10 text-slate-400 font-bold text-2xs ml-2">
                    {getTotalRulesCount(selectedService.exporters)} RULES
                  </span>
                </div>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedService(null);
                  }}
                  className=""
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2501 0.75834C10.9251 0.43334 10.4001 0.43334 10.0751 0.75834L6.0001 4.82501L1.9251 0.750006C1.6001 0.425006 1.0751 0.425006 0.750098 0.750006C0.425098 1.07501 0.425098 1.60001 0.750098 1.92501L4.8251 6.00001L0.750098 10.075C0.425098 10.4 0.425098 10.925 0.750098 11.25C1.0751 11.575 1.6001 11.575 1.9251 11.25L6.0001 7.17501L10.0751 11.25C10.4001 11.575 10.9251 11.575 11.2501 11.25C11.5751 10.925 11.5751 10.4 11.2501 10.075L7.1751 6.00001L11.2501 1.92501C11.5668 1.60834 11.5668 1.07501 11.2501 0.75834Z"
                      fill="#94A3B8"
                    />
                  </svg>
                </button>
              </div>
            </DialogTitle>

            <div className="bg-white px-4 pb-4 pt-6 sm:p-6 sm:pb-4 overflow-y-scroll text-xs">
              {serviceRules && serviceRules.length > 0 && !isLoading ? (
                serviceRules.map((serviceGroup: any, groupIndex: number) => (
                  <div key={groupIndex} className="mb-6">
                    <h3 className="text-slate-600 font-semibold mb-2">
                      {serviceGroup.groups[0].name} Rules
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-1    ring-1 ring-inset ring-gray-500/10 text-slate-400 font-bold text-2xs ml-2">
                        {serviceGroup?.groups[0]?.rules?.length || ""} RULES
                      </span>
                    </h3>
                    {serviceGroup.groups.map(
                      (group: any, groupIndex: number) => (
                        <div key={groupIndex}>
                          {group.rules.map(
                            (rule: ExporterRule, ruleIndex: number) => (
                              <div key={ruleIndex} className="mb-6">
                                <div className="flex items-center flex-1 gap-4 mb-4">
                                  <div className="px-3 py-2 bg-slate-100 rounded-full text-slate-500 text-xs ">
                                    {ruleIndex + 1}
                                  </div>

                                  <div>
                                    <p className="text-slate-600 font-medium text-xs">
                                      {rule?.alert}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <RuleClipboard rule={rule} />
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )
                    )}
                  </div>
                ))
              ) : (
                <div className="h-screen">
                  <p className="text-slate-600 text-center h-full">
                    Rules still loading...
                  </p>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default RulesModal;
