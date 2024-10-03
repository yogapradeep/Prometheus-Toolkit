import { useState } from "react";

interface IGroupRule {
  alert: string;
  expr: string;
  for: string;
  annotations?: {
    summary?: string;
    description?: string;
  };
  labels?: Record<string, string>;
}

const RuleClipboard = ({ rule }: { rule: IGroupRule }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const ruleText = Object.entries(rule)
      .map(([key, value]) => `${key}: ${JSON.stringify(value, null, 2)}`)
      .join("\n");

    navigator.clipboard.writeText(ruleText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative mb-6 font-jetbrains">
      <div className="flex flex-1 items-center gap-4 mb-4"></div>
      <div className="flex gap-1 bg-slate-50 ml-12 px-3 py-6 rounded-md">
        <div>
          {Object.entries(rule).map(([key, value]) => (
            <div key={key}>
              <p className="mb-1">
                <span className="text-green-500">{key}</span> :{" "}
                <span className="text-slate-600">
                  {typeof value === "object"
                    ? Object.entries(value).map(([subKey, subValue]) => (
                        <span key={subKey} className="">
                          <br />
                          <span className="text-green-500 pl-4">
                            {subKey}
                          </span>{" "}
                          : {JSON.stringify(subValue, null, 2)}
                          <br />
                        </span>
                      ))
                    : JSON.stringify(value, null, 2)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`top-2 right-0 absolute flex items-center gap-2 ${
          copied ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"
        } mt-2 p-1 pl-2 rounded`}
        onClick={handleCopy}
      >
        <svg
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 9H1.5V2.5C1.5 2.225 1.275 2 1 2C0.725 2 0.5 2.225 0.5 2.5V9C0.5 9.55 0.95 10 1.5 10H6.5C6.775 10 7 9.775 7 9.5C7 9.225 6.775 9 6.5 9ZM9 7V1C9 0.45 8.55 0 8 0H3.5C2.95 0 2.5 0.45 2.5 1V7C2.5 7.55 2.95 8 3.5 8H8C8.55 8 9 7.55 9 7ZM8 7H3.5V1H8V7Z"
            fill={`${copied ? "#22C55E" : "#64748B"}`}
          />
        </svg>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default RuleClipboard;
