import { FaBars, FaHome } from 'react-icons/fa';
import { useGetMyProfileQuery } from '@/redux/features/user/userApi';
import defaultUserImage from '@/assets/default-user-img.jpg';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSidebar, selectIsSidebarOpen } from '@/redux/features/layout/layoutSlice';

const DashboardNavbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
  const { data: profileData } = useGetMyProfileQuery({});
  const { name, profileImage, role } = profileData?.data || {};

  return (
    <nav className={`bg-white shadow-md fixed top-0 ${isSidebarOpen ? 'left-72' : 'left-0'} right-0 h-20 z-20 rounded-bl-sm transition-all duration-300`}>
      <div className="h-full px-4 flex justify-between items-center">
        {/* Left side - Toggle button and Home */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FaBars className="text-gray-600 text-xl" />
          </button>
          
          <Link 
            to="/"
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#d5e6fb62]"
          >
            <FaHome className="text-gray-600 text-xl" />
            <span className="text-gray-700 font-medium hidden sm:block">Home</span>
          </Link>
        </div>

        {/* Right side - User profile */}
        <div className="relative ml-auto">
          <Link to={`/${role}/dashboard/profile`}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <span className="text-gray-700 font-medium hidden sm:block">
              Hi, {name || 'User'}
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={profileImage || defaultUserImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;