import React, { useState } from 'react';
import { Element, useEditor } from "@craftjs/core";
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Use solid icons for toggle

import { UserButton } from "./user/UserButton";
import { UserText } from "./user/UserText";
import { Container } from "./user/UserContainer";
import { UserImage } from "./user/UserImage";
import { UserColumn } from './user/UserColumn';
import { UserBgImage } from './user/UserBgImage';
import { UserSection } from './user/UserSection';
import { UserGrid } from './user/UserGrid';
import { UserSpacer } from './user/UserSpace';
import { UserAccordion } from './user/UserAccordion';
import { UserAccordionItem } from './user/UserAccordionItem';
import { UserParagraph } from './user/UserParagraph';
import { UserHeading } from './user/UserHeading';
import { UserLink } from './user/UserLink';
import { UserNavbar } from './user/UserNavbar';
import { MinimalTest } from './user/MinimalTest';
import { renderMarkup } from "../../../src/utils/renderer.tsx";

const categories = [
  {
    id: 'layout', name: 'Layout', tools: [
      { id: 'lay', name: 'Columns', component: <Element is={UserColumn} canvas /> },
      { id: 'section', name: 'Section', component: <Element is={UserSection} canvas /> },
      { id: 'grid', name: 'Grid Layout', component: <Element is={UserGrid} canvas /> },
      { id: 'spacer', name: 'Spacer', component: <Element is={UserSpacer} /> },
      { id: 'bgimage', name: 'Background Image', component: <Element is={UserBgImage} canvas /> }
    ]
  },
  {
    id: 'basic', name: 'Basic Elements', tools: [
      { id: 'button', name: 'Button', component: <Element is={UserButton} text="Click Me" /> },
      { id: 'image', name: 'Image', component: <Element is={UserImage} /> },
      { id: 'paragraph', name: 'Paragraph', component: <Element is={UserParagraph} text="Type paragraph text here..." /> },
      { id: 'link', name: 'Link', component: <Element is={UserLink} text="Click Here" href="#" /> },
    ]
  },
  {
    id: 'interactive', name: 'Interactive', tools: [
      {
        id: 'accordion', name: 'Accordion',
        component: <Element is={UserAccordion} canvas >
          <Element is={UserAccordionItem} title="Item 1 - Click Title" canvas />
          <Element is={UserAccordionItem} title="Item 2 - Click Title" canvas />
        </Element>
      },
      {
        id: 'accordion-item', name: 'Accordion Item',
        component: <Element is={UserAccordionItem} canvas />
      },
      {
        id: 'navbar',
        name: 'Navbar',
        component: <Element is={UserNavbar} canvas />
      }
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
  const { query } = useEditor();
  const toggleSection = (id: string) => {
    setOpenSection(prev => (prev === id ? null : id));
  };

  const componentResolver = {
    Container,
    UserText,
    UserButton,
    UserImage,
    MinimalTest,
    'UserColumn': UserColumn,
    UserBgImage,
    UserSection,
    UserGrid,
    UserSpacer,
    UserAccordion,
    UserAccordionItem,
    UserHeading,
    UserParagraph,
    UserLink,
    UserNavbar
  }

  const handleSave = () => {
    console.log('cliekced');
    const jsonState = query.serialize();

    const generatedHtml = renderMarkup(jsonState);

    if (generatedHtml) {
      console.log("Generated HTML:\n", generatedHtml);
    } else {
      console.log('Failed to generate HTML.');
    }

    console.log(jsonState);
    navigator.clipboard.writeText(generatedHtml);

  }

  return (
    <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 h-full">
      <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider px-1">
        Components
      </h3>

      <div>
        <button onClick={handleSave} >SAve</button>
      </div>

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
