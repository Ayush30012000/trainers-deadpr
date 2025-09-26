import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, UserPlus } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-effect border-b border-white/10 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold gradient-text"></span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Find Trainers
            </Link>
            {/* <Link to="/register" className="text-white/80 hover:text-white transition-colors">
              Become a Trainer
            </Link> */}
          </nav>
          <div className="relative group">
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 px-4 py-2 rounded flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Join
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>

            {/* Dropdown - hidden until hover */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10 hidden group-hover:block">
              <Link
                to="/userRegistration"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Join as User
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Join as Trainer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;