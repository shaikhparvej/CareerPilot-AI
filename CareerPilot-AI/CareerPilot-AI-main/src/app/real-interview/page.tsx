"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star, Users, Video } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function RealInterviewPage() {
  const [interviewMode, setInterviewMode] = useState<'join' | 'create' | null>(null);
  const [roomId, setRoomId] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/dashboard"
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Real-Time Interview Practice
          </h1>
        </motion.div>

        {/* Main Content */}
        {!interviewMode ? (
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Create Interview Room */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setInterviewMode('create')}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create Interview Room
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Host a live interview session with video, audio, and screen sharing capabilities.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <Star className="w-4 h-4" />
                <span>Perfect for conducting interviews</span>
              </div>
            </motion.div>

            {/* Join Interview Room */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setInterviewMode('join')}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Join Interview Room
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join an existing interview session using a room ID provided by the interviewer.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <Clock className="w-4 h-4" />
                <span>Real-time collaboration</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {interviewMode === 'create' ? 'Create Interview Room' : 'Join Interview Room'}
            </h2>

            {interviewMode === 'create' ? (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Creating a new interview room...
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Room ID:</strong> ROOM-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-2">
                    Share this ID with participants to join your interview session.
                  </p>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Start Interview Session
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter Room ID
                  </label>
                  <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="e.g., ROOM-ABC123"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                  disabled={!roomId.trim()}
                >
                  Join Interview Session
                </button>
              </div>
            )}

            <button
              onClick={() => setInterviewMode(null)}
              className="w-full mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-2"
            >
              Back to Options
            </button>
          </motion.div>
        )}

        {/* Features List */}
        <motion.div
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Interview Features
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">HD Video & Audio</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">Screen Sharing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">Real-time Chat</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">Session Recording</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
