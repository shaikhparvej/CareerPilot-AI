'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  Code, 
  MessageSquare, 
  TrendingUp, 
  Award,
  Calendar,
  Target,
  CheckCircle,
  BarChart3
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: 'Career Pilot User',
    level: 'Intermediate',
    completedTasks: 12,
    totalTasks: 20,
    streak: 7
  });

  const [stats, setStats] = useState({
    interviewsCompleted: 8,
    codesWritten: 25,
    skillsLearned: 6,
    certificatesEarned: 3
  });

  const recentActivities = [
    { id: 1, title: 'Completed Mock Interview', type: 'interview', time: '2 hours ago' },
    { id: 2, title: 'Solved JavaScript Challenge', type: 'code', time: '4 hours ago' },
    { id: 3, title: 'Finished React Course', type: 'learning', time: '1 day ago' },
    { id: 4, title: 'Updated Profile', type: 'profile', time: '2 days ago' }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Complete Python Assessment', dueDate: 'Tomorrow', priority: 'high' },
    { id: 2, title: 'Practice System Design', dueDate: 'Dec 15', priority: 'medium' },
    { id: 3, title: 'Review Data Structures', dueDate: 'Dec 20', priority: 'low' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-blue-200">
                Ready to advance your career today?
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{user.streak} day streak!</div>
              <div className="text-blue-200">Keep it up!</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Interviews Completed</p>
                <p className="text-3xl font-bold text-white">{stats.interviewsCompleted}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Codes Written</p>
                <p className="text-3xl font-bold text-white">{stats.codesWritten}</p>
              </div>
              <Code className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Skills Learned</p>
                <p className="text-3xl font-bold text-white">{stats.skillsLearned}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-200 text-sm">Certificates</p>
                <p className="text-3xl font-bold text-white">{stats.certificatesEarned}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Progress and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">📊 Learning Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-200">Overall Progress</span>
                  <span className="text-white font-bold">{Math.round((user.completedTasks / user.totalTasks) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(user.completedTasks / user.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-blue-200">
                {user.completedTasks} of {user.totalTasks} tasks completed
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">🚀 Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/mock-interview" className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 text-center transition-colors">
                <MessageSquare className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-medium">Mock Interview</div>
              </Link>
              <Link href="/online-ide" className="bg-green-600 hover:bg-green-700 rounded-lg p-4 text-center transition-colors">
                <Code className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-medium">Code Practice</div>
              </Link>
              <Link href="/learn" className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 text-center transition-colors">
                <BookOpen className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-medium">Learn</div>
              </Link>
              <Link href="/careerplanning" className="bg-yellow-600 hover:bg-yellow-700 rounded-lg p-4 text-center transition-colors">
                <Target className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-medium">Career Plan</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity and Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">📈 Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{activity.title}</div>
                    <div className="text-blue-200 text-sm">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">📅 Upcoming Tasks</h3>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-400' :
                    task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{task.title}</div>
                    <div className="text-blue-200 text-sm">Due: {task.dueDate}</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}