import React from 'react';
import { DollarSign, CreditCard, Calendar, Bell } from 'lucide-react';

const FeeDetails = () => {
  const feeStructure = {
    tuitionFee: 5000,
    libraryFee: 200,
    laboratoryFee: 300,
    activityFee: 100,
    total: 5600,
  };

  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 2800,
      status: 'Paid',
      method: 'Credit Card',
    },
    {
      id: 2,
      date: '2024-02-15',
      amount: 2800,
      status: 'Pending',
      method: 'Bank Transfer',
    },
  ];

  const upcomingPayments = [
    {
      id: 1,
      dueDate: '2024-03-15',
      amount: 2800,
      description: 'Second Installment',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Fee Details</h1>

      {/* Fee Structure */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Fee Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tuition Fee</span>
              <span className="font-medium">${feeStructure.tuitionFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Library Fee</span>
              <span className="font-medium">${feeStructure.libraryFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Laboratory Fee</span>
              <span className="font-medium">${feeStructure.laboratoryFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Activity Fee</span>
              <span className="font-medium">${feeStructure.activityFee}</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>${feeStructure.total}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-3">Payment Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>First installment due: January 15, 2024</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>Second installment due: March 15, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Payment History</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      ${payment.amount}
                    </p>
                    <p className="text-sm text-gray-500">{payment.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{payment.date}</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payment.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Upcoming Payments
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingPayments.map((payment) => (
            <div key={payment.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-8 w-8 text-red-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      ${payment.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      {payment.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
                  <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeeDetails;