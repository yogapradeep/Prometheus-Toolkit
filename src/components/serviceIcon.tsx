import { SimpleIcon } from "simple-icons";
import * as SimpleIcons from "simple-icons";

function ServiceIcon({
  serviceName,
  customColorCode,
}: {
  serviceName: string;
  customColorCode?: string;
}) {
  const iconName = serviceName.toLowerCase().split(" ")[0];
  const icon: SimpleIcon = (SimpleIcons as any)[
    `si${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`
  ];

  if (icon) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill={`#${customColorCode ?? icon.hex}`}
        className="inline-block w-6 h-6"
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
}

export default ServiceIcon;
