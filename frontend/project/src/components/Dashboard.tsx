import React from 'react';
import { Book, Calendar, Bell, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      name: 'Current Semester',
      value: '4th Semester',
      icon: Book,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Upcoming Exams',
      value: '3',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      id: 3,
      name: 'Pending Tasks',
      value: '5',
      icon: Bell,
      color: 'bg-yellow-500',
    },
    {
      id: 4,
      name: 'Fee Status',
      value: 'Paid',
      icon: CreditCard,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              'Submitted Mathematics Assignment',
              'Completed Database Quiz',
              'Updated Profile Information',
              'Paid Semester Fee',
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center py-2 border-b border-gray-200 last:border-0"
              >
                <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                <p className="text-sm text-gray-600">{activity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[
              { event: 'Database Systems Mid-term', date: 'March 15, 2024' },
              { event: 'Project Submission Deadline', date: 'March 20, 2024' },
              { event: 'Programming Workshop', date: 'March 25, 2024' },
              { event: 'Career Fair', date: 'April 1, 2024' },
            ].map((event, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
              >
                <p className="text-sm text-gray-600">{event.event}</p>
                <span className="text-xs text-gray-500">{event.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;