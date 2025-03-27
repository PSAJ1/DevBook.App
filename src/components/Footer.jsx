import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright &copy; {new Date().getFullYear()} - All right reserved by
          Dev Book Private Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
