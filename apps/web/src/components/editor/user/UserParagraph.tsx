import React from 'react';
import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import ContentEditable from 'react-contenteditable';
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'; // Expanded sizes
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type FontWeight = '300' | '400' | '500' | '600';

interface UserParagraphProps {
  text?: string;
  textAlign?: TextAlign;
  textSize?: TextSize;
  fontWeight?: FontWeight;
  color?: string;
  lineHeight?: number;
  marginTop?: number;
  marginBottom?: number;
}

export const UserParagraph = ({
  text = "This is a paragraph. Double-click to edit.",
  textAlign = 'left',
  textSize = 'md', // Default to medium size
  fontWeight = '400',
  color = "var(--text-color-base, #D1D5DB)",
  lineHeight = 1.6,
  marginTop = 0,
  marginBottom = 10,
}: UserParagraphProps) => {

  const { connectors: { connect, drag }, actions: { setProp }, isSelected, isHovered } = useNode((state) => ({
    isSelected: state.events.selected,
    isHovered: state.events.hovered,
  }));

  const [editable, setEditable] = React.useState(false);

  const handleBlur = (evt: React.FocusEvent<HTMLParagraphElement>) => {
    setEditable(false);
    setProp((props: UserParagraphProps) => props.text = evt.target.textContent || '', 500);
  }

  const sizeMap: Record<TextSize, string> = {
    'xs': '0.75rem',  // 12px
    'sm': '0.875rem', // 14px
    'md': '1rem',     // 16px
    'lg': '1.125rem', // 18px
    'xl': '1.25rem',  // 20px
    '2xl': '1.5rem',  // 24px
  };
  const fallbackSize = sizeMap[textSize] || sizeMap['md'];
  const fontSizeVar = `var(--text-${textSize}-size, ${fallbackSize})`;

  const paragraphStyle: CSSProperties = {
    textAlign: textAlign,
    fontSize: fontSizeVar,
    fontWeight: fontWeight,
    color: color,
    lineHeight: lineHeight,
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    outline: isSelected || isHovered ? '2px dashed var(--editor-highlight-color, #6D28D9)' : 'none',
    outlineOffset: '2px',
    cursor: 'move',
    WebkitUserSelect: editable ? 'text' : 'none',
    MozUserSelect: editable ? 'text' : 'none',
    msUserSelect: editable ? 'text' : 'none',
    userSelect: editable ? 'text' : 'none',
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => { ref && connect(drag(ref)) }}
      onDoubleClick={() => { if (isSelected) setEditable(true); }}
      style={{ padding: '1px 0' }}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={() => { }}
        onBlur={handleBlur}
        tagName="p"
        style={paragraphStyle}
        className={!editable ? 'cursor-move' : ''}
      />
    </div>
  );
};

const UserParagraphSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserParagraphProps,
  }));

  return (
    <div className="space-y-3 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Text Content</label>
        <ContentEditable
          html={props.text || ''}
          disabled={false}
          onChange={(e) => setProp((props: UserParagraphProps) => props.text = e.target.value, 500)}
          tagName="div"
          className="w-full px-2.5 py-1.5 rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition min-h-[80px]"
        />
      </div>
      <SettingsSelect
        label="Size"
        options={[
          { value: 'xs', label: 'X-Small (xs)' },
          { value: 'sm', label: 'Small (sm)' },
          { value: 'md', label: 'Medium (md)' },
          { value: 'lg', label: 'Large (lg)' },
          { value: 'xl', label: 'X-Large (xl)' },
          { value: '2xl', label: '2X-Large (2xl)' }
        ]}
        value={props.textSize || 'md'}
        onChange={(value) => setProp((props: UserParagraphProps) => props.textSize = value as TextSize)}
      />
      <SettingsSelect
        label="Text Align"
        options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }, { value: 'justify', label: 'Justify' }]}
        value={props.textAlign || 'left'}
        onChange={(value) => setProp((props: UserParagraphProps) => props.textAlign = value as TextAlign)}
      />
      <SettingsSelect
        label="Font Weight"
        options={[{ value: '300', label: 'Light (300)' }, { value: '400', label: 'Normal (400)' }, { value: '500', label: 'Medium (500)' }, { value: '600', label: 'Semi-Bold (600)' }]}
        value={props.fontWeight || '400'}
        onChange={(value) => setProp((props: UserParagraphProps) => props.fontWeight = value as FontWeight)}
      />
      <SettingsInput
        label="Line Height" type="number" step={0.1} min={1}
        value={props.lineHeight ?? 1.6}
        onChange={(value) => setProp((props: UserParagraphProps) => props.lineHeight = parseFloat(value || '1.6'))}
      />
      <SettingsInput
        label="Color" type="text" value={props.color || ''}
        onChange={(value) => setProp((props: UserParagraphProps) => props.color = value)}
      />
      <SettingsInput
        label="Margin Top (px)" type="number" min={0} value={props.marginTop ?? 0}
        onChange={(value) => setProp((props: UserParagraphProps) => props.marginTop = parseInt(value || '0', 10))}
      />
      <SettingsInput
        label="Margin Bottom (px)" type="number" min={0} value={props.marginBottom ?? 10}
        onChange={(value) => setProp((props: UserParagraphProps) => props.marginBottom = parseInt(value || '0', 10))}
      />
    </div>
  );
}

UserParagraph.craft = {
  props: {
    text: "This is a paragraph. Start typing or edit properties in the settings panel.",
    textAlign: 'left',
    textSize: 'md',
    fontWeight: '400',
    color: "var(--text-color-base, #D1D5DB)",
    lineHeight: 1.6,
    marginTop: 0,
    marginBottom: 10,
  } as UserParagraphProps,
  related: {
    settings: UserParagraphSettings
  },
  displayName: "Paragraph"
};
