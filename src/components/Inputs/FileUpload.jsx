import React from "react";
import { IconPaperclip } from "@tabler/icons-react";

const FileUpload = ({ handleFileUpload }) => (
  <label htmlFor="file-upload" className="cursor-pointer">
    <IconPaperclip size={21} color="#1d4378"  />
    <input
      type="file"
      id="file-upload"
      onChange={handleFileUpload}
      className="hidden"
    />
  </label>
);

export default FileUpload;
