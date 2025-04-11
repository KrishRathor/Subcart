import React, { useState } from 'react';
import StoreDashboardHeader from '../components/store/Header';
import SidebarMenu from '../components/store/Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';

export const StorePage: React.FC = () => {
  const storeDetails = { name: 'My Demo Store', url: 'my-demo-store.lvh.me:5173' };
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleMenuSelect = (itemId: string) => {
    console.log("Selected section:", itemId);
    setActiveSection(itemId);
  };

  return (
    <div className="bg-gray-950 min-h-screen text-gray-300 flex flex-col">
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col flex-grow">

        <StoreDashboardHeader
          storeName={storeDetails.name}
          storeUrl={storeDetails.url}
        />
        <div className="md:hidden mt-4 mb-2"> 
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-controls="mobile-sidebar"
              aria-expanded={isSidebarOpen}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <span className="ml-2 text-sm font-medium">Menu</span>
            </button>
        </div>

        <div className="grid grid-cols-1 mt-4 md:grid-cols-12 gap-6 lg:gap-8 flex-grow">
          <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:sticky md:top-6 md:col-span-3 lg:col-span-2 md:translate-x-0 md:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <SidebarMenu
              activeItem={activeSection}
              onSelectItem={handleMenuSelect}
              isMobileOpen={isSidebarOpen} 
              onCloseMobile={() => setIsSidebarOpen(false)}
            />
          </aside>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/60 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            ></div>
          )}
          <main className="md:col-span-9 lg:col-span-10">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700/60 h-full min-h-[400px]">
               {activeSection === 'overview' && (
                 <div>
                   <h2 className="text-xl font-semibold text-gray-100 mb-4">Dashboard Overview</h2>
                   <p className="text-gray-400">Displaying overview content...</p>
                 </div>
               )}
               {!['overview'].includes(activeSection) && (
                 <div>
                   <h2 className="text-xl font-semibold text-gray-100 mb-4 capitalize">{activeSection}</h2>
                   <p className="text-gray-400">Content for the {activeSection} section goes here...</p>
                 </div>
               )}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};
