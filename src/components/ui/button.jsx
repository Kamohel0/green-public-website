import React from "react";

export const Button = ({ children, className = "", variant = "default", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium focus:outline-none";
  const variantStyles =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};
