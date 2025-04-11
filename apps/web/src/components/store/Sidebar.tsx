import React from 'react';
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  UsersIcon,
  ChartBarIcon,
  MegaphoneIcon,
  CreditCardIcon,
  TruckIcon,
  PaintBrushIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface SidebarMenuProps {
  activeItem: string;
  onSelectItem: (itemId: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const menuItems: MenuItem[] = [
  { id: 'overview', name: 'Overview', icon: HomeIcon },
  { id: 'orders', name: 'Orders', icon: ShoppingCartIcon },
  { id: 'products', name: 'Products', icon: CubeIcon },
  { id: 'customers', name: 'Customers', icon: UsersIcon },
  { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
  { id: 'marketing', name: 'Marketing', icon: MegaphoneIcon },
  { id: 'payments', name: 'Payments', icon: CreditCardIcon },
  { id: 'shipping', name: 'Shipping', icon: TruckIcon },
  { id: 'customization', name: 'Customization', icon: PaintBrushIcon },
  { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  activeItem,
  onSelectItem,
  isMobileOpen, 
  onCloseMobile,
}) => {
  return (
    <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 h-full pt-10 md:pt-4 relative md:sticky md:top-6">
       {onCloseMobile && (
         <button
            type="button"
            onClick={onCloseMobile}
            className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden" // Hide on medium screens and up
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
       )}

      <h3 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider px-3">
        Manage Store
      </h3>
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                  onSelectItem(item.id);
                  if (onCloseMobile) {
                    onCloseMobile();
                  }
              }}
              className={`group flex w-full items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-purple-500 ${
                isActive
                  ? 'bg-gray-800/60 text-purple-400'
                  : 'text-gray-400 hover:bg-gray-800/40 hover:text-gray-100'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive
                    ? 'text-purple-400'
                    : 'text-gray-500 group-hover:text-gray-300'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarMenu;
