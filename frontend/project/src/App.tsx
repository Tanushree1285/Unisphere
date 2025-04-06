import React, { useState } from 'react';
import { 
  GraduationCap, 
  UserCircle, 
  ClipboardList, 
  Calendar,
  CreditCard,
  LogIn,
  Menu,
  X
} from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ExamMarks from './components/ExamMarks';
import TodoList from './components/TodoList';
import FeeDetails from './components/FeeDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  } 


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'marks':
        return <ExamMarks />;
      case 'todo':
        return <TodoList />;
      case 'fees':
        return <FeeDetails />;
      default:
        return <Dashboard />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'marks', label: 'Exam Marks', icon: ClipboardList },
    { id: 'todo', label: 'To-Do List', icon: Calendar },
    { id: 'fees', label: 'Fee Details', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-indigo-600 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <GraduationCap className="text-indigo-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">UniSphere</h1>
          </div>
          <nav>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-2 px-4 py-3 mb-2 rounded-lg transition-colors
                  ${activeTab === item.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => setIsLoggedIn(false)}
              className="w-full flex items-center space-x-2 px-4 py-3 mb-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogIn size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen p-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;