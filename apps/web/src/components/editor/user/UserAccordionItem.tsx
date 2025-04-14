import React from 'react';
import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { useAccordionContext } from './UserAccordion';
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

type TextSize = 'small' | 'medium' | 'large';

interface UserAccordionItemProps {
  title?: string;
  titleBackground?: string;
  titleColor?: string;
  titleSize?: TextSize;
  titlePaddingX?: number;
  titlePaddingXMd?: number;
  titlePaddingXLg?: number;
  titlePaddingY?: number;
  titlePaddingYMd?: number;
  titlePaddingYLg?: number;
  contentBackground?: string;
  contentPadding?: number;
  contentPaddingMd?: number;
  contentPaddingLg?: number;
  children?: React.ReactNode;
}

export const UserAccordionItem = ({
  title = "Accordion Title",
  titleBackground = "var(--accordion-item-title-bg, #2D3748)",
  titleColor = "var(--accordion-item-title-color, #E2E8F0)",
  titleSize = 'medium',
  titlePaddingX = 16,
  titlePaddingXMd = 18,
  titlePaddingXLg = 20,
  titlePaddingY = 10,
  titlePaddingYMd = 12,
  titlePaddingYLg = 14,
  contentBackground = "var(--accordion-item-content-bg, #1A202C)",
  contentPadding = 15,
  contentPaddingMd = 18, // Store responsive values
  contentPaddingLg = 20, // Store responsive values
  children
}: UserAccordionItemProps) => {
  const { connectors: { connect, drag }, id, isSelected } = useNode(state => ({
    isSelected: state.events.selected,
    id: state.id
  }));
  const accordionContext = useAccordionContext();
  const isOpen = accordionContext?.openNodeId === id;

  const titleSizeMap: Record<TextSize, string> = {
    'small': '0.875rem',
    'medium': '1rem',
    'large': '1.125rem',
  };
  const titleFallbackSize = titleSizeMap[titleSize] || titleSizeMap['medium'];
  const titleFontSizeVar = `var(--accordion-title-${titleSize}-size, ${titleFallbackSize})`;

  const itemWrapperStyle: CSSProperties = {
    border: '1px solid var(--accordion-item-border-color, #4A5568)',
    borderRadius: '6px',
    overflow: 'hidden',
    background: contentBackground,
    outline: isSelected ? '2px dashed var(--editor-highlight-color, #6D28D9)' : 'none',
    outlineOffset: '2px',
    cursor: 'move',
  };

  const titleButtonStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: `${titlePaddingY}px`,
    paddingBottom: `${titlePaddingY}px`,
    paddingLeft: `${titlePaddingX}px`,
    paddingRight: `${titlePaddingX}px`,
    textAlign: 'left',
    background: titleBackground,
    color: titleColor,
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: titleFontSizeVar,
    lineHeight: 1.5,
  };

  const contentStyle: CSSProperties = {
    paddingTop: isOpen ? `${contentPadding}px` : '0px',
    paddingBottom: isOpen ? `${contentPadding}px` : '0px',
    paddingLeft: `${contentPadding}px`,
    paddingRight: `${contentPadding}px`,
    maxHeight: isOpen ? '1000px' : '0px',
    opacity: isOpen ? 1 : 0,
    overflow: 'hidden',
    transition: 'max-height 0.35s ease-in-out, opacity 0.3s ease-in-out, padding 0.35s ease-in-out',
    borderTop: isOpen ? `1px solid var(--accordion-item-border-color, #4A5568)` : 'none',
    background: contentBackground,
  };

  const iconStyle: CSSProperties = {
    width: '20px',
    height: '20px',
    transition: 'transform 0.3s ease-in-out',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    flexShrink: 0,
  }

  return (
    <div
      ref={ref => { ref && connect(drag(ref)) }}
      style={itemWrapperStyle}
      data-title-pad-x-md={titlePaddingXMd}
      data-title-pad-x-lg={titlePaddingXLg}
      data-title-pad-y-md={titlePaddingYMd}
      data-title-pad-y-lg={titlePaddingYLg}
      data-content-pad-md={contentPaddingMd}
      data-content-pad-lg={contentPaddingLg}
    >
      <button
        style={titleButtonStyle}
        onClick={() => accordionContext?.setOpenNodeId(id)}
      >
        <span style={{ marginRight: '8px' }}>{title}</span>
        <ChevronDownIcon style={iconStyle} />
      </button>
      <div style={contentStyle}>
        {children}
        {React.Children.count(children) === 0 && isOpen && (
          <p className="text-xs text-center text-gray-600 pointer-events-none py-4">Drop content inside item</p>
        )}
      </div>
    </div>
  );
};

const UserAccordionItemSettings = () => {
  const { actions: { setProp }, props } = useNode(node => ({ props: node.data.props as UserAccordionItemProps }));
  const debounceTime = 300;

  return (
    <div className="p-4 space-y-3">
      <SettingsInput
        label="Title"
        value={props.title || ''}
        onChange={value => setProp((props: UserAccordionItemProps) => props.title = value, debounceTime)}
      />
      <SettingsInput
        label="Title Background"
        type="text"
        value={props.titleBackground || ''}
        onChange={value => setProp((props: UserAccordionItemProps) => props.titleBackground = value, debounceTime)}
      />
      <SettingsInput
        label="Title Color"
        type="text"
        value={props.titleColor || ''}
        onChange={value => setProp((props: UserAccordionItemProps) => props.titleColor = value, debounceTime)}
      />
      <SettingsSelect
        label="Title Size"
        value={props.titleSize || 'medium'}
        options={[{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }]}
        onChange={value => setProp((props: UserAccordionItemProps) => props.titleSize = value as TextSize, debounceTime)}
      />

      <div className="pt-2 border-t border-gray-700/50">
        <label className="block text-xs font-medium text-gray-500 mb-1 mt-1">Title Padding X (px)</label>
        <div className="grid grid-cols-3 gap-1">
          <SettingsInput
            label="Base" type="number" min={0} value={props.titlePaddingX ?? 16}
            onChange={value => {
              const num = parseInt(String(value) || '0', 10);
              setProp((props: UserAccordionItemProps) => props.titlePaddingX = isNaN(num) ? 16 : num, debounceTime);
            }}
          />
          <SettingsInput
            label="Md" type="number" min={0} value={props.titlePaddingXMd ?? 18}
            onChange={value => {
              const num = parseInt(String(value) || '0', 10);
              setProp((props: UserAccordionItemProps) => props.titlePaddingXMd = isNaN(num) ? 18 : num, debounceTime);
            }}
          />
          <SettingsInput
            label="Lg" type="number" min={0} value={props.titlePaddingXLg ?? 20}
            onChange={value => {
              const num = parseInt(String(value) || '0', 10);
              setProp((props: UserAccordionItemProps) => props.titlePaddingXLg = isNaN(num) ? 20 : num, debounceTime);
            }}
          />
        </div>
      </div>
      <div className="pt-2">
        <label className="block text-xs font-medium text-gray-500 mb-1 mt-1">Title Padding Y (px)</label>
        <div className="grid grid-cols-3 gap-1">
          <SettingsInput
            label="Base" type="number" min={0} value={props.titlePaddingY ?? 10}
            onChange={value => {
              const num = parseInt(String(value) || '0', 10);
              setProp((props: UserAccordionItemProps) => props.titlePaddingY = isNaN(num) ? 10 : num, debounceTime);
            }}
          />
          <SettingsInput
            label="Md" type="number" min={0} value={props.titlePaddingYMd ?? 12}
            onChange={value => {
              const num = parseInt(String(value) || '0', 10);
              setProp((props: UserAccordionItemProps) => props.titlePaddingYMd = isNaN(num) ? 12 : num, debounceTime);
            }}
          />
          <SettingsInput
            label="Lg" type="number" min={0} value={props.titlePaddingYLg ?? 14}
            onChange={value => {
              const num = parseInt(String(value) || '0', 10);
              setProp((props: UserAccordionItemProps) => props.titlePaddingYLg = isNaN(num) ? 14 : num, debounceTime);
            }}
          />
        </div>
      </div>

      <SettingsInput
        label="Content Background" type="text"
        value={props.contentBackground || ''}
        onChange={value => setProp((props: UserAccordionItemProps) => props.contentBackground = value, debounceTime)}
      />
      <div className="pt-2 border-t border-gray-700/50">
        <label className="block text-xs font-medium text-gray-500 mb-1 mt-1">Content Padding (px)</label>
        <div className="grid grid-cols-3 gap-1">
          <SettingsInput
            label="Base" type="number" min={0} value={props.contentPadding ?? 15}
            onChange={value => {
              const num = parseInt(String(value) || '0', 10);
              setProp((props: UserAccordionItemProps) => props.contentPadding = isNaN(num) ? 15 : num, debounceTime);
            }}
          />
          <SettingsInput
            label="Md" type="number" min={0} value={props.contentPaddingMd ?? 18}
            onChange={value => {
              const num = parseInt(String(value) || '0', 10);
              setProp((props: UserAccordionItemProps) => props.contentPaddingMd = isNaN(num) ? 18 : num, debounceTime);
            }}
          />
          <SettingsInput
            label="Lg" type="number" min={0} value={props.contentPaddingLg ?? 20}
            onChange={value => {
              const num = parseInt(String(value) || '0', 10);
              setProp((props: UserAccordionItemProps) => props.contentPaddingLg = isNaN(num) ? 20 : num, debounceTime);
            }}
          />
        </div>
      </div>
    </div>
  );
};
UserAccordionItem.craft = {
  props: {
    title: "Accordion Title",
    titleBackground: "var(--accordion-item-title-bg, #2D3748)",
    titleColor: "var(--accordion-item-title-color, #E2E8F0)",
    titleSize: 'medium',
    titlePaddingX: 16,
    titlePaddingXMd: 18,
    titlePaddingXLg: 20,
    titlePaddingY: 10,
    titlePaddingYMd: 12,
    titlePaddingYLg: 14,
    contentBackground: "var(--accordion-item-content-bg, #1A202C)",
    contentPadding: 15,
    contentPaddingMd: 18,
    contentPaddingLg: 20,
  } as UserAccordionItemProps,
  related: {
    settings: UserAccordionItemSettings
  },
};
