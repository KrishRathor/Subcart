// src/components/editor/user/UserImage.tsx
import React, { CSSProperties } from 'react';
import { useNode } from "@craftjs/core";
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

// Define props for the image component
interface UserImageProps {
  src?: string;
  alt?: string;
  width?: number | string; // Allow number (px) or string (e.g., '100%')
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  alignment?: 'left' | 'center' | 'right';
  margin?: number;
}

// The Image component
export const UserImage = ({
  src = "https://via.placeholder.com/150", // Default placeholder
  alt = "Placeholder Image",
  width = '100%', // Default to full width of container
  height = 'auto', // Default to auto height
  objectFit = 'cover',
  alignment = 'left',
  margin = 5,
}: UserImageProps) => {

  const { connectors: { connect, drag } } = useNode();

  // Calculate margin classes based on alignment
  let alignmentClasses = 'justify-start'; // Default left
  if (alignment === 'center') {
    alignmentClasses = 'justify-center';
  } else if (alignment === 'right') {
    alignmentClasses = 'justify-end';
  }

  // Prepare width/height styles (handle number vs string)
  const sizeStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    // Wrapper div handles alignment and connects to Craft.js
    <div
      ref={(ref: HTMLDivElement | null) => {
        ref && connect(drag(ref))
      }}
      className={`flex ${alignmentClasses}`} // Use inline-block for margin auto to work
      style={{ ...sizeStyle, margin: `${margin}px` }} // Apply size and margin
    >
      <img
        src={src}
        alt={alt}
        style={{
          display: 'block', // Prevent extra space below image
          width: '100%',    // Image fills the wrapper width
          height: '100%',   // Image fills the wrapper height
          objectFit: objectFit,
          cursor: 'move',
        }}
      />
    </div>
  );
};

// Settings UI for the UserImage
const UserImageSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserImageProps,
  }));

  return (
    <div className="space-y-3 p-4">
      <SettingsInput
        label="Image URL"
        value={props.src || ''}
        onChange={(value) => setProp((props: UserImageProps) => props.src = value)}
      />
      <SettingsInput
        label="Alt Text"
        value={props.alt || ''}
        onChange={(value) => setProp((props: UserImageProps) => props.alt = value)}
      />
      <SettingsInput
        label="Width (px or %)" // Allow units like %, auto
        value={props.width ?? '100%'}
        onChange={(value) => setProp((props: UserImageProps) => props.width = value)}
      />
      <SettingsInput
        label="Height (px or %)" // Allow units like px, %, auto
        value={props.height ?? 'auto'}
        onChange={(value) => setProp((props: UserImageProps) => props.height = value)}
      />
      <SettingsSelect
        label="Object Fit"
        options={[
          { value: 'cover', label: 'Cover' }, { value: 'contain', label: 'Contain' },
          { value: 'fill', label: 'Fill' }, { value: 'none', label: 'None' }, { value: 'scale-down', label: 'Scale Down' }
        ]}
        value={props.objectFit || 'cover'}
        onChange={(value) => setProp((props: UserImageProps) => props.objectFit = value as any)}
      />
      <SettingsSelect
        label="Alignment"
        options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]}
        value={props.alignment || 'left'}
        onChange={(value) => setProp((props: UserImageProps) => props.alignment = value as any)}
      />
      <SettingsInput
        label="Margin (px)"
        type="number"
        value={props.margin ?? 5}
        onChange={(value) => setProp((props: UserImageProps) => props.margin = parseInt(value || '0', 10))}
      />
    </div>
  );
};

// Assign static properties
UserImage.craft = {
  props: {
    src: "https://placehold.co/200x200",
    alt: "Placeholder Image",
    width: '50%',
    height: 'auto',
    objectFit: 'cover',
    alignment: 'left',
    margin: 5,
  } as UserImageProps,
  related: {
    settings: UserImageSettings
  },
};
