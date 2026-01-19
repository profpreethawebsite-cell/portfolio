'use client';

import Link from 'next/link';
import { Mail, MapPin, Linkedin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white dark:text-white mb-4">Dr. J. Preetha Roselyn</h3>
            <p className="text-sm text-gray-300 dark:text-gray-400">
              Professor, Department of Electrical and Electronics Engineering<br />
              SRM Institute of Science and Technology
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/grants" className="hover:text-white dark:hover:text-white transition-colors">
                  Grants
                </Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-white dark:hover:text-white transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white dark:text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a 
                  href="mailto:preethaj@srmist.edu.in" 
                  className="hover:text-white dark:hover:text-white transition-colors"
                >
                  preethaj@srmist.edu.in
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Linkedin size={16} />
                <a 
                  href="https://www.linkedin.com/in/preetha-roselyn-17911916/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  LinkedIn Profile <ExternalLink size={12} />
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <a 
                  href="https://www.srmist.edu.in/faculty/dr-j-preetha-roselyn/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  College Profile <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dr. J. Preetha Roselyn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
