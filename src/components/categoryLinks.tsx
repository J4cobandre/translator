import React from "react";
import {
  IconHeartbeat,
} from "@tabler/icons-react";

const categories = [
  { icon: IconHeartbeat, label: "NaoMedical" },
];

const CategoryLinks: React.FC = () => {
  return (
    <div className="mt-10 sm:mt-20">
      {categories.map(({icon:Icon, label }) => (
        <a
          key={label}
          className="m-1 py-2 px-3 inline-flex 
          items-center gap-x-2 text-sm font-medium 
          rounded-lg border border-gray-200 
          bg-white text-gray-800 shadow-sm hover:bg-gray-50
           disabled:opacity-50 disabled:pointer-events-none
            dark:bg-white dark:border-neutral-700
             dark:text-[#1d4378] dark:hover:bg-neutral-800"
          href="https://naomedical.com/"
          target="_blank"
        >
          <Icon size={18} />
          {label}
        </a>
      ))}
    </div>
  );
};

export default CategoryLinks;
