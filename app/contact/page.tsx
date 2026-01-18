'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from '@/components/SectionLayout';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Here you can add Firebase function to send email or store the message
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <SectionLayout 
      title="Contact" 
      subtitle="Get in touch for collaborations, inquiries, or research opportunities"
    >
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Get in Touch
            </h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              Feel free to reach out for research collaborations, academic inquiries,
              or any other professional matters. I look forward to hearing from you.
            </p>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Mail className="text-indigo-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                <p className="text-gray-600">Contact via form below</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start space-x-4"
            >
              <div className="p-3 bg-indigo-100 rounded-lg">
                <MapPin className="text-indigo-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                <p className="text-gray-600">
                  Department of Electrical and Electronics Engineering<br />
                  SRM Institute of Science and Technology<br />
                  Kattankulathur, Chengalpattu District<br />
                  Tamil Nadu, India
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-6 border-t border-gray-200"
          >
            <h4 className="font-semibold text-gray-900 mb-4">Office Hours</h4>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 5:00 PM<br />
              Saturday: By appointment only
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Send a Message
          </h3>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg"
            >
              Thank you for your message! I'll get back to you soon.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </SectionLayout>
  );
}
