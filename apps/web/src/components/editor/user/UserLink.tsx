import React from 'react';
import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

interface UserLinkProps {
  text?: string;
  href?: string;
  target?: '_blank' | '_self';
  color?: string;
  fontWeight?: '300' | '400' | '500' | '600' | '700';
  fontSize?: number;
  underline?: 'always' | 'hover' | 'none';
  alignment?: 'left' | 'center' | 'right';
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export const UserLink = ({
  text = "Link Text",
  href = "#",
  target = '_self',
  color = "#93C5FD", // Light blue default (Tailwind blue-300)
  fontWeight = '400',
  fontSize = 16,
  underline = 'hover',
  alignment = 'left',
  marginTop = 5,
  marginBottom = 5,
  marginLeft = 0,
  marginRight = 0,
}: UserLinkProps) => {

  const { connectors: { connect, drag }, isSelected } = useNode((state) => ({
    isSelected: state.events.selected,
  }));

  let alignmentClasses = '';
  if (alignment === 'center') {
    alignmentClasses = 'mx-auto';
  } else if (alignment === 'right') {
    alignmentClasses = 'ml-auto mr-0'; // Push left
  } else {
    alignmentClasses = 'ml-0 mr-auto'; // Push right (default)
  }

  const linkStyle: CSSProperties = {
    color: color,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    textDecoration: underline === 'always' ? 'underline' : 'none',
    display: 'inline', // Links are typically inline
    cursor: 'pointer', // Use pointer for links in editor
    outline: isSelected ? '2px dashed #6D28D9' : 'none',
    outlineOffset: '2px',
  };

  const wrapperStyle: CSSProperties = {
    display: 'block', // Wrapper is block to respect alignment margins
    width: 'max-content', // Shrink wrap the inline link
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    marginLeft: alignment === 'center' || alignment === 'right' ? 'auto' : `${marginLeft}px`,
    marginRight: alignment === 'center' || alignment === 'left' ? 'auto' : `${marginRight}px`,
    cursor: 'move',
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => { ref && connect(drag(ref)) }}
      style={wrapperStyle}
      className={underline === 'hover' ? 'hover:underline' : ''} // Handle hover underline via Tailwind if possible, else needs state/CSS
    >
      <a
        href={href}
        target={target}
        style={linkStyle}
        onClick={(e) => e.preventDefault()} // Prevent navigation inside the editor
      >
        {text}
      </a>
    </div>
  );
};

const UserLinkSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserLinkProps,
  }));

  return (
    <div className="space-y-3 p-4">
      <SettingsInput label="Link Text" value={props.text || ''} onChange={(value) => setProp((props: UserLinkProps) => props.text = value)} />
      <SettingsInput label="URL (href)" value={props.href || ''} onChange={(value) => setProp((props: UserLinkProps) => props.href = value)} />
      <SettingsSelect label="Target" value={props.target || '_self'}
        options={[{ value: '_self', label: 'Same Tab' }, { value: '_blank', label: 'New Tab (_blank)' }]}
        onChange={(value) => setProp((props: UserLinkProps) => props.target = value as any)}
      />
      <SettingsInput label="Font Size (px)" type="number" min={8} value={props.fontSize ?? 16} onChange={(value) => setProp((props: UserLinkProps) => props.fontSize = parseInt(value || '16', 10))} />
      <SettingsSelect label="Font Weight" value={props.fontWeight || '400'}
        options={[{ value: '300', label: 'Light (300)' }, { value: '400', label: 'Normal (400)' }, { value: '500', label: 'Medium (500)' }, { value: '600', label: 'Semi-Bold (600)' }, { value: '700', label: 'Bold (700)' }]}
        onChange={(value) => setProp((props: UserLinkProps) => props.fontWeight = value as any)}
      />
      <SettingsInput label="Color" type="color" value={props.color || '#93C5FD'} onChange={(value) => setProp((props: UserLinkProps) => props.color = value)} />
      <SettingsSelect label="Underline" value={props.underline || 'hover'}
        options={[{ value: 'always', label: 'Always' }, { value: 'hover', label: 'On Hover' }, { value: 'none', label: 'None' }]}
        onChange={(value) => setProp((props: UserLinkProps) => props.underline = value as any)}
      />
      <SettingsSelect label="Alignment (Block)" value={props.alignment || 'left'}
        options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]}
        onChange={(value) => setProp((props: UserLinkProps) => props.alignment = value as any)}
      />
      <div className="grid grid-cols-2 gap-2">
        <SettingsInput label="Margin Top (px)" type="number" value={props.marginTop ?? 5} onChange={(value) => setProp((props: UserLinkProps) => props.marginTop = parseInt(value || '0', 10))} />
        <SettingsInput label="Margin Bottom (px)" type="number" value={props.marginBottom ?? 5} onChange={(value) => setProp((props: UserLinkProps) => props.marginBottom = parseInt(value || '0', 10))} />
        <SettingsInput label="Margin Left (px)" type="number" value={props.marginLeft ?? 0} onChange={(value) => setProp((props: UserLinkProps) => props.marginLeft = parseInt(value || '0', 10))} />
        <SettingsInput label="Margin Right (px)" type="number" value={props.marginRight ?? 0} onChange={(value) => setProp((props: UserLinkProps) => props.marginRight = parseInt(value || '0', 10))} />
      </div>
    </div>
  );
}

UserLink.craft = {
  props: {
    text: "Learn More",
    href: "#",
    target: '_self',
    color: "#93C5FD",
    fontWeight: '400',
    fontSize: 16,
    underline: 'hover',
    alignment: 'left',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
  } as UserLinkProps,
  related: {
    settings: UserLinkSettings
  },
};
