import React, { useState } from 'react';
import { Element, useEditor } from "@craftjs/core";
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Use solid icons for toggle

import { UserButton } from "./user/UserButton";
import { UserText } from "./user/UserText";
import { Container } from "./user/UserContainer";
import { UserImage } from "./user/UserImage";
import { UserColumn } from './user/UserColumn';

const categories = [
  {
    id: 'layout', name: 'Layout', tools: [
      { id: 'container', name: 'Container', component: <Element is={Container} canvas /> },
      { id: 'lay', name: 'Lay', component: <Element is={UserColumn} canvas /> }
    ]
  },
  {
    id: 'basic', name: 'Basic Elements', tools: [
      { id: 'button', name: 'Button', component: <Element is={UserButton} text="Click Me" /> },
      { id: 'text', name: 'Text', component: <Element is={UserText} text="Enter text" /> },
      { id: 'image', name: 'Image', component: <Element is={UserImage} /> },
    ]
  },
];

const ToolItem = ({ children, elementToCreate }: { children: React.ReactNode, elementToCreate: React.ReactElement }) => {
  const { connectors } = useEditor();
  return (
    <button
      ref={(ref: HTMLButtonElement | null) => { ref && connectors.create(ref, elementToCreate) }}
      className="block w-full p-2 text-left text-sm text-gray-300 bg-gray-700 hover:bg-purple-700 hover:text-white rounded cursor-grab transition-colors"
    >
      {children}
    </button>
  );
};


export const ToolBox = () => {
  const [openSection, setOpenSection] = useState<string | null>('basic');

  const toggleSection = (id: string) => {
    setOpenSection(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 h-full">
      <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider px-1">
        Components
      </h3>
      <div className="space-y-1">
        {categories.map((category) => {
          const isOpen = openSection === category.id;
          return (
            <div key={category.id} className="bg-gray-800/50 rounded">
              {/* Category Toggle Button */}
              <button
                onClick={() => toggleSection(category.id)}
                className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-medium text-gray-300 hover:bg-gray-700/50 rounded focus:outline-none"
              >
                <span>{category.name}</span>
                {isOpen ? (
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                )}
              </button>
              <div
                className={`pl-3 pr-1 pb-1 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100 pt-2' : 'max-h-0 opacity-0'
                  }`}
              >
                {isOpen && (
                  <div className="space-y-2">
                    {category.tools.map(tool => (
                      <ToolItem key={tool.id} elementToCreate={tool.component}>
                        {tool.name}
                      </ToolItem>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
