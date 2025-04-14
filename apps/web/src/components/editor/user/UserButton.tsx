import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

type ButtonSize = 'small' | 'medium' | 'large';
type Alignment = 'left' | 'center' | 'right';

interface UserButtonProps {
  text?: string;
  alignment?: Alignment;
  background?: string; // Can accept CSS variables like var(--primary-color)
  color?: string;      // Can accept CSS variables like var(--text-on-primary)
  size?: ButtonSize;
  width?: string | number; // Allows 'auto', '100%', '300px' etc.
  height?: string | number;
  marginTop?: number; // Keep margins in px for simple spacing control
  marginBottom?: number;
}

export const UserButton = ({
  text = "Button Text",
  alignment = 'center',
  background = "var(--button-primary-bg, #6D28D9)",
  color = "var(--button-primary-color, #ffffff)",
  size = 'medium',
  width = 'auto',
  height = 'auto',
  marginTop = 5,
  marginBottom = 5,
}: UserButtonProps) => {

  const { connectors: { connect, drag }, isSelected } = useNode(state => ({
    isSelected: state.events.selected,
  }));

  let justifyContent = 'flex-start';
  if (alignment === 'center') {
    justifyContent = 'center';
  } else if (alignment === 'right') {
    justifyContent = 'flex-end';
  }

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: justifyContent,
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    width: '100%', // Wrapper takes full width to allow justify-*
    outline: isSelected ? '2px dashed var(--editor-highlight-color, #6D28D9)' : 'none',
    outlineOffset: '2px',
  };

  // --- Map semantic size to fluid REM units (using CSS vars conceptually) ---
  // Assumes variables like --button-padding-x-medium, --button-font-size-medium
  // might be defined in global CSS, provides fallbacks.
  const paddingVarX = `var(--button-padding-x-${size}, ${size === 'small' ? '1rem' : size === 'large' ? '1.5rem' : '1.25rem'})`;
  const paddingVarY = `var(--button-padding-y-${size}, ${size === 'small' ? '0.5rem' : size === 'large' ? '0.75rem' : '0.625rem'})`;
  const fontSizeVar = `var(--button-font-size-${size}, ${size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem'})`;
  // --- End Size Mapping ---

  const buttonStyle: CSSProperties = {
    paddingTop: paddingVarY,
    paddingBottom: paddingVarY,
    paddingLeft: paddingVarX,
    paddingRight: paddingVarX,
    backgroundColor: background,
    color: color,
    border: 'none',
    borderRadius: 'var(--button-border-radius, 6px)', // Use variable or fallback
    cursor: 'move',
    fontSize: fontSizeVar, // Use fluid unit
    lineHeight: '1.5', // Relative line height often works well
    width: typeof width === 'number' ? `${width}px` : width, // Allow fixed px or strings like 'auto', '100%'
    height: typeof height === 'number' ? `${height}px` : height,
    display: 'inline-block', // Let button size based on content + padding
    textAlign: 'center',
    transition: 'background-color 0.15s ease-in-out',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => { ref && connect(drag(ref)) }}
      style={wrapperStyle}
    >
      <button style={buttonStyle}>
        {text}
      </button>
    </div>
  );
};

const UserButtonSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as Required<UserButtonProps>,
  }));

  const debounceTime = 300;

  return (
    <div className="space-y-3 p-4">
      <SettingsInput
        label="Text"
        value={props.text} // Use default from props if defined
        onChange={value => setProp((props: UserButtonProps) => props.text = value, debounceTime)}
      />
      <SettingsSelect
        label="Size"
        value={props.size}
        options={[{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }]}
        onChange={value => setProp((props: UserButtonProps) => props.size = value as ButtonSize, debounceTime)}
      />
      <SettingsSelect
        label="Alignment (Block)"
        value={props.alignment}
        options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]}
        onChange={value => setProp((props: UserButtonProps) => props.alignment = value as Alignment, debounceTime)}
      />
      <SettingsInput
        label="Background"
        type="text" // Allow color or CSS variable
        value={props.background}
        onChange={value => setProp((props: UserButtonProps) => props.background = value, debounceTime)}
      />
      <SettingsInput
        label="Text Color"
        type="text" // Allow color or CSS variable
        value={props.color}
        onChange={value => setProp((props: UserButtonProps) => props.color = value, debounceTime)}
      />
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-700/50">
        <SettingsInput
          label="Width (px, %, auto)"
          type="text"
          value={props.width}
          onChange={value => {
            const finalValue = String(value).toLowerCase() === 'auto' || value === ''
              ? 'auto'
              : String(value); // Keep numbers or % as string for CSS
            setProp((props: UserButtonProps) => props.width = finalValue, debounceTime);
          }}
        />
        <SettingsInput
          label="Height (px, %, auto)"
          type="text"
          value={props.height}
          onChange={value => {
            const finalValue = String(value).toLowerCase() === 'auto' || value === ''
              ? 'auto'
              : String(value); // Keep numbers or % as string for CSS
            setProp((props: UserButtonProps) => props.height = finalValue, debounceTime);
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-700/50">
        <SettingsInput
          label="Margin Top (px)"
          type="number"
          value={props.marginTop}
          onChange={value => {
            const num = parseInt(value || '0', 10);
            setProp((props: UserButtonProps) => props.marginTop = isNaN(num) ? props.marginTop : num, debounceTime);
          }}
        />
        <SettingsInput
          label="Margin Bottom (px)"
          type="number"
          value={props.marginBottom}
          onChange={value => {
            const num = parseInt(value || '0', 10);
            setProp((props: UserButtonProps) => props.marginBottom = isNaN(num) ? props.marginBottom : num, debounceTime);
          }}
        />
      </div>
    </div>
  );
};

UserButton.craft = {
  props: {
    text: "Click Me",
    alignment: "center",
    background: "var(--button-primary-bg, #6D28D9)",
    color: "var(--button-primary-color, #ffffff)",
    size: 'medium',
    width: 'auto',
    height: 'auto',
    marginTop: 5,
    marginBottom: 5,
  } as UserButtonProps,
  related: {
    settings: UserButtonSettings
  },
};
