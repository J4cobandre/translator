import React from "react";
import { IconLanguage } from "@tabler/icons-react";

const LanguageSelector = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => (
  <span
    className="cursor-pointer rounded-full space-x-1 pl-2 bg-[#ffffff] flex items-center flex-row"
  >
    <IconLanguage size={20} color="#1d4378" />
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="bg-[#ffffff] flex flex-row rounded-full py-1 text-[#1d4378] outline-none"
      style={{
        maxHeight: "50px",  // Limit the height
        overflowY: "auto",    // Enable vertical scrolling
        width: "150px",       // Set a width to improve dropdown display
        appearance: "none",   // Remove default styling for consistency
        padding: "0.5rem",
      }}
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  </span>
);

export default LanguageSelector;
