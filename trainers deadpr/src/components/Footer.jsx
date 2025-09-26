import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-effect border-t border-white/10 mt-auto py-8 px-4">
      <div className="container mx-auto text-center text-white/60">
        {/* <div className="flex justify-center items-center space-x-6 mb-4">
          <Link to="/register" className="hover:text-white transition-colors">Register as Instructor</Link>
          <Link to="/admin/login" className="hover:text-white transition-colors flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Admin Panel
          </Link>
        </div> */}
        <p>Copyright © {currentYear} FitConnect. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;