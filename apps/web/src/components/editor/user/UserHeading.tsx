import React from 'react';
import { useNode } from "@craftjs/core";
import type { CSSProperties, JSX } from 'react';
import ContentEditable from 'react-contenteditable';
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

interface UserHeadingProps {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  color?: string;
  fontWeight?: '400' | '500' | '600' | '700' | '800' | '900'; // Allow more weights
  marginTop?: number;
  marginBottom?: number;
}

export const UserHeading = ({
  text = "Heading Text",
  level = 2,
  textAlign = 'left',
  color = "#F3F4F6", // gray-100
  fontWeight, // Default determined by level if not overridden
  marginTop = 10,
  marginBottom = 5,
}: UserHeadingProps) => {
  const { connectors: { connect, drag }, actions: { setProp }, isSelected, isHovered } = useNode(state => ({
    isSelected: state.events.selected,
    isHovered: state.events.hovered
  }));
  const [editable, setEditable] = React.useState(false);

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const defaultFontWeight = () => {
    switch (level) {
      case 1: return '700'; // Bold
      case 2: return '600'; // Semi-bold
      case 3: return '600'; // Semi-bold
      default: return '500'; // Medium
    }
  };

  const style: CSSProperties = {
    textAlign: textAlign,
    color: color,
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    fontWeight: fontWeight || defaultFontWeight(),
    outline: isSelected || isHovered ? '2px dashed #6D28D9' : 'none',
    outlineOffset: '2px',
    cursor: 'move',
    WebkitUserSelect: editable ? 'text' : 'none',
    MozUserSelect: editable ? 'text' : 'none',
    msUserSelect: editable ? 'text' : 'none',
    userSelect: editable ? 'text' : 'none',
  };

  return (
    <div
      ref={ref => { ref && connect(drag(ref)) }}
      onDoubleClick={() => { if (isSelected) setEditable(true); }}
      style={{ padding: '1px 0' }} // Prevent outline clipping
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={() => { }}
        onBlur={(e: any) => {
          setEditable(false);
          setProp((props: UserHeadingProps) => props.text = e.target.textContent || '', 500);
        }}
        tagName={HeadingTag}
        style={style}
        className={!editable ? 'cursor-move' : ''}
      />
    </div>
  );
};

const UserHeadingSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserHeadingProps,
  }));

  return (
    <div className="space-y-3 p-4">
      <SettingsInput label="Text" value={props.text || ''} onChange={(value) => setProp((props: UserHeadingProps) => props.text = value)} />
      <SettingsSelect
        label="Level (H1-H6)" value={(props.level || 2).toString()}
        options={[1, 2, 3, 4, 5, 6].map(n => ({ value: n.toString(), label: `H${n}` }))}
        onChange={(value) => setProp((props: UserHeadingProps) => props.level = parseInt(value, 10) as any)}
      />
      <SettingsSelect
        label="Text Align" value={props.textAlign || 'left'}
        options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }, { value: 'justify', label: 'Justify' }]}
        onChange={(value) => setProp((props: UserHeadingProps) => props.textAlign = value as any)}
      />
      <SettingsSelect
        label="Font Weight" value={props.fontWeight || ''} // Default allows deriving from level
        options={[
          { value: '', label: 'Default for Level' },
          { value: '400', label: 'Normal (400)' }, { value: '500', label: 'Medium (500)' },
          { value: '600', label: 'Semi-Bold (600)' }, { value: '700', label: 'Bold (700)' },
          { value: '800', label: 'Extra-Bold (800)' }, { value: '900', label: 'Black (900)' }
        ]}
        onChange={(value) => setProp((props: UserHeadingProps) => props.fontWeight = value as any)}
      />
      <SettingsInput label="Color" type="color" value={props.color || '#F3F4F6'} onChange={(value) => setProp((props: UserHeadingProps) => props.color = value)} />
      <SettingsInput label="Margin Top (px)" type="number" min={0} value={props.marginTop ?? 10} onChange={(value) => setProp((props: UserHeadingProps) => props.marginTop = parseInt(value || '0', 10))} />
      <SettingsInput label="Margin Bottom (px)" type="number" min={0} value={props.marginBottom ?? 5} onChange={(value) => setProp((props: UserHeadingProps) => props.marginBottom = parseInt(value || '0', 10))} />
    </div>
  );
};

UserHeading.craft = {
  props: {
    text: "Type Your Heading",
    level: 2,
    textAlign: 'left',
    color: '#F3F4F6',
    fontWeight: undefined, // Start with default based on level
    marginTop: 10,
    marginBottom: 5,
  } as UserHeadingProps,
  related: { settings: UserHeadingSettings },
  displayName: "Heading"
};

