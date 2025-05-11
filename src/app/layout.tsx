import { Fragment } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {  Menu, Popover, PopoverButton, PopoverPanel, Transition, useClose } from '@headlessui/react';
import { useAuth } from '../contexts/AuthContext';
import Logo from "../assets/react.svg";
import SunIcon from "@heroicons/react/24/solid/SunIcon";
import { useTheme } from '../contexts/ThemeContext';
import { MoonIcon } from '@heroicons/react/24/outline';
const Layout = () => {
  const {theme, toggleTheme}  = useTheme();
  const { user, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  // Use the correct user information
  const userDisplayName = user?.username || "user";
  const userInitials = userDisplayName.substring(0, 2).toUpperCase();
  
  // Navigation links - customize as needed
  const navigationLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Access', path: '/admin/access', children: 
      [ 
        { name: 'Users', path: '/admin/users', description: 'Manage your system users' }, 
        { name: 'Roles', path: '/admin/roles', description: 'Manage user roles.' },
        { name: 'Resources', path: '/admin/resources', description: 'Manage system resources/features.' }
      ]
    },
  ];

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)] flex flex-col">
      {/* ================================================ */}
      {/* Header Navbar */}
      {/* ================================================ */}
      <header className="border-b border-[var(--hover-color)] p-4 sticky top-0 z-20 backdrop-blur-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            {/* Logo/Site Title */}
            <img
                  alt="Logo"
                  src={Logo}
                  height={48}
                  width={48}
                  className="mr-6"
                />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navigationLinks.map((link) => (
                 ((link?.children?.length ?? 0) > 0) 
                 ? <Popover>
                    {({ close}) => (<>
                    <PopoverButton className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${location.pathname.startsWith(link.path) || link.children?.some((child) => location.pathname.startsWith(child.path))
                          ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-500/30' 
                          : ' hover:text-[var(--hover-color )] hover:bg-[var(--hover-color)]'
                      }`}>
                      {link.name}
                    </PopoverButton>
                    <PopoverPanel
                      transition
                      anchor="bottom"
                      className="divide-y divide-white/5 rounded-xl bg-gray-950 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-10)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 z-21"
                    >
                      <div className="p-3">
                        {link?.children?.map((child) => (
                            <Link onClick={close} className="block rounded-lg py-2 px-3 transition hover:bg-white/5" to={child.path}>
                              <p className="font-semibold text-white">{child.name}</p>
                              <p className="text-white/50">{child.description}</p>
                            </Link>
                        ))}
                      </div>
                    </PopoverPanel>
                    </>)}
                  </Popover> 
                :  <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith(link.path)
                    ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-500/30' 
                    : ' hover:text-[var(--hover-color )] hover:bg-[var(--hover-color)]'
                }`}
              >
                {link.name}
              </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <button className='p-2 rounded border-0 hover:bg-[var(--hover-color)]' onClick={() => toggleTheme()}>
              {theme === 'dark' 
                ? <SunIcon width={30} height={30} /> 
                : <MoonIcon width={30} height={30} /> 
               } 
            </button>

            <Menu as="div" className="relative">
              <Menu.Button className="h-8 w-8 rounded-full text-[var(--background-color)] bg-[var(--text-color)] flex items-center justify-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-black">
                <span className="text-sm font-medium ">{userInitials}</span>
              </Menu.Button>
              
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-950 border border-white/10 shadow-lg focus:outline-none p-1 z-30">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${
                          active ? 'bg-white/10' : ''
                        } flex w-full rounded-md px-3 py-2 text-sm text-white`}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`${
                          active ? 'bg-white/10' : ''
                        } flex w-full rounded-md px-3 py-2 text-sm text-white`}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`${
                          active ? 'bg-white/10' : ''
                        } flex w-full rounded-md px-3 py-2 text-sm text-white`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mt-2 pt-2 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-500/30' 
                    : 'border border-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
      {/* ================================================ */}
      {/* Main Content */}
      {/* ================================================ */}
      <main className="container mx-auto p-4 flex-grow">
        {/* React Router Outlet - Child Route Components will render here */}
        <Outlet />
      </main>
      {/* ================================================ */}
      {/* Footer */}
      {/* ================================================ */}
      <footer className="mt-auto border-t border-white/10 p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <p>© 2025 Your Company. All rights reserved.</p>
            <nav className="flex gap-4">
              <Link to="/privacy" className="hover:text-white/60">Privacy</Link>
              <Link to="/terms" className="hover:text-white/60">Terms</Link>
              <Link to="/help" className="hover:text-white/60">Help</Link>
            </nav>
          </div>
          <p className="mt-2 md:mt-0">User: {userDisplayName} | Last login: Today at 15:32</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;