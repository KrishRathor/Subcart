import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface StoreHeaderProps {
  storeName: string;
  storeUrl: string;
}

const StoreDashboardHeader: React.FC<StoreHeaderProps> = ({ storeName, storeUrl }) => {
  const formattedUrl = storeUrl.startsWith('http://') || storeUrl.startsWith('https://')
    ? storeUrl
    : `http://${storeUrl}`;

  return (
    <div className="bg-gray-900 rounded-md border-b border-gray-700/60 px-4 sm:px-6 lg:px-8 py-2 shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6">

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-x-2 mb-1">
              <span className="relative flex h-2.5 w-2.5" title="Live">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <h1 className="text-lg font-medium text-gray-100 truncate">
                Your store <span className="font-semibold text-purple-400">{storeName}</span> is live!
              </h1>
            </div>
            <p className="text-sm text-gray-400 truncate">
              Available at: {' '}
              <a
                href={formattedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 hover:underline underline-offset-2 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded"
                title={`Visit ${storeName}`}
              >
                {storeUrl}
              </a>
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href={formattedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition duration-150 ease-in-out" // Adjusted ring offset for bg-gray-900
            >
              Visit Store
              <ArrowTopRightOnSquareIcon className="ml-1.5 -mr-0.5 h-4 w-4" aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StoreDashboardHeader;
