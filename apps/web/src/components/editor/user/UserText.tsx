// src/components/editor/user/UserText.tsx
import React, { CSSProperties } from 'react';
import { useNode } from "@craftjs/core";
import ContentEditable from 'react-contenteditable' // Install: npm i react-contenteditable @types/react-contenteditable
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

// Define props for the text component
interface UserTextProps {
  text?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontSize?: number;
  fontWeight?: '400' | '500' | '600' | '700';
  color?: string;
  margin?: number;
}

// The Text component users interact with
export const UserText = ({
  text = "Enter text here",
  textAlign = 'left',
  fontSize = 16,
  fontWeight = '400',
  color = "#E5E7EB", // Light gray default
  margin = 5,
}: UserTextProps) => {

  const { connectors: { connect, drag }, actions: { setProp }, selected, hovered } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered,
  }));

  // State for inline editing
  const [editable, setEditable] = React.useState(false);

  // Double click to enable editing
  const handleDoubleClick = () => {
    if (selected) setEditable(true);
  }

  // Blur to disable editing (and update prop)
  const handleBlur = (evt: React.FocusEvent<HTMLDivElement>) => {
    setEditable(false);
    setProp((props: UserTextProps) => props.text = evt.target.textContent || '', 500);
  }

  // Apply dynamic styles based on props
  const textStyle: CSSProperties = {
    textAlign: textAlign,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    color: color,
    margin: `${margin}px`,
    // Add outline when selected or hovered for better UX
    outline: selected || hovered ? '2px dashed #6D28D9' : 'none',
    outlineOffset: selected || hovered ? '2px' : '0',
    cursor: 'move', // Indicate draggable
    WebkitUserSelect: editable ? 'text' : 'none', // Allow text selection only when editing
    MozUserSelect: editable ? 'text' : 'none',
    msUserSelect: editable ? 'text' : 'none',
    userSelect: editable ? 'text' : 'none',
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        ref && connect(drag(ref))
      }}
      onDoubleClick={handleDoubleClick}
      style={{ padding: '2px' }} // Add slight padding so outline isn't cut off
    >
      {/* ContentEditable allows direct text editing on the canvas */}
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) => {
          // No need to setProp on every keystroke for inline editing
          // We set it on blur instead
        }}
        onBlur={handleBlur}
        tagName="p" // Render as a paragraph tag
        style={textStyle}
        className={!editable ? 'cursor-move' : ''} // Ensure move cursor when not editing
      />
    </div>
  );
};

// Settings UI for UserText
const UserTextSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserTextProps,
  }));

  return (
    <div className="space-y-3 p-4">
      {/* Use ContentEditable in settings too for multiline text */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Text Content</label>
        <ContentEditable
          html={props.text || ''}
          disabled={false} // Always editable in settings
          onChange={(e) => setProp((props: UserTextProps) => props.text = e.target.value, 500)}
          tagName="div" // Use div in settings
          className="w-full px-2.5 py-1.5 rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition min-h-[60px]"
        />
      </div>
      <SettingsSelect
        label="Text Align"
        options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }, { value: 'justify', label: 'Justify' }]}
        value={props.textAlign || 'left'}
        onChange={(value) => setProp((props: UserTextProps) => props.textAlign = value as any)}
      />
      <SettingsInput
        label="Font Size (px)"
        type="number"
        value={props.fontSize ?? 16}
        onChange={(value) => setProp((props: UserTextProps) => props.fontSize = parseInt(value, 10))}
      />
      <SettingsSelect
        label="Font Weight"
        options={[{ value: '400', label: 'Normal' }, { value: '500', label: 'Medium' }, { value: '600', label: 'Semi-Bold' }, { value: '700', label: 'Bold' }]}
        value={props.fontWeight || '400'}
        onChange={(value) => setProp((props: UserTextProps) => props.fontWeight = value as any)}
      />
      <SettingsInput
        label="Text Color"
        type="color"
        value={props.color || '#E5E7EB'}
        onChange={(value) => setProp((props: UserTextProps) => props.color = value)}
      />
      <SettingsInput
        label="Margin (px)"
        type="number"
        value={props.margin ?? 5}
        onChange={(value) => setProp((props: UserTextProps) => props.margin = parseInt(value, 10))}
      />
    </div>
  );
}

// Assign static properties
UserText.craft = {
  props: {
    text: "Hi there",
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
    color: "#E5E7EB",
    margin: 5,
  } as UserTextProps,
  related: {
    settings: UserTextSettings
  },
};
