import { useNode } from "@craftjs/core";
import { SettingsInput } from "../SettingsInput"; 
import { SettingsSelect } from "../SettingsSelect";

interface UserButtonProps {
  text?: string;
  alignment?: 'left' | 'center' | 'right';
  background?: string;
  color?: string;
  paddingX?: number;
  paddingY?: number;
  margin?: number; 
}

export const UserButton = ({
  text = "Button Text",
  alignment = 'left',
  background = "#6D28D9",
  color = "#ffffff",
  paddingX = 15,
  paddingY = 10,
  margin = 5,
}: UserButtonProps) => {

  const { connectors: { connect, drag } } = useNode();

  let alignmentClasses = 'justify-start';
  if (alignment === 'center') {
    alignmentClasses = 'justify-center';
  } else if (alignment === 'right') {
    alignmentClasses = 'justify-end';
  }

  console.log(alignmentClasses);

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        ref && connect(drag(ref))
      }}
      className={`flex ${alignmentClasses}`}
      style={{ margin: `${margin}px` }}
    >
      <button
        style={{
          padding: `${paddingY}px ${paddingX}px`,
          backgroundColor: background,
          color: color,
          border: 'none',
          borderRadius: '5px',
          cursor: 'move',
          fontSize: '14px',
          display: 'block'
        }}
      >
        {text}
      </button>
    </div>
  );
};

const UserButtonSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserButtonProps,
  }));

  return (
    <div className="space-y-3 p-4">
      <SettingsInput
        label="Button Text"
        value={props.text || ''}
        onChange={(value) => setProp((props: UserButtonProps) => props.text = value)}
      />
      <SettingsSelect
        label="Alignment"
        options={[
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]}
        value={props.alignment || 'left'}
        onChange={(value) => setProp((props: UserButtonProps) => props.alignment = value as any)}
      />
      <SettingsInput
        label="Background Color"
        type="color" // Basic color picker
        value={props.background || '#6D28D9'}
        onChange={(value) => setProp((props: UserButtonProps) => props.background = value)}
      />
      <SettingsInput
        label="Text Color"
        type="color"
        value={props.color || '#ffffff'}
        onChange={(value) => setProp((props: UserButtonProps) => props.color = value)}
      />
      <SettingsInput
        label="Padding X (px)"
        type="number"
        value={props.paddingX ?? 15} // Use ?? for default number
        onChange={(value) => setProp((props: UserButtonProps) => props.paddingX = parseInt(value, 10))}
      />
      <SettingsInput
        label="Padding Y (px)"
        type="number"
        value={props.paddingY ?? 10}
        onChange={(value) => setProp((props: UserButtonProps) => props.paddingY = parseInt(value, 10))}
      />
      <SettingsInput
        label="Margin (px)"
        type="number"
        value={props.margin ?? 5}
        onChange={(value) => setProp((props: UserButtonProps) => props.margin = parseInt(value, 10))}
      />
    </div>
  );
};

UserButton.craft = {
  props: {
    text: "Click Me",
    alignment: "left",
    background: "#6D28D9",
    color: "#ffffff",
    paddingX: 15,
    paddingY: 10,
    margin: 5,
  } as UserButtonProps,
  related: {
    settings: UserButtonSettings
  },
};
