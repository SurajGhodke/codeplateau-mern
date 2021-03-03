import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <span className="text-muted">
        &copy; {new Date().getFullYear()} Made With ❤️ by
        <span className="text-white"> SURAJ</span>.
      </span>
    </div>
  );
};

export default Footer;
