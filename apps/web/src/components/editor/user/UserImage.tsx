import React, { CSSProperties } from 'react';
import { useNode } from "@craftjs/core";
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

interface UserImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  alignment?: 'left' | 'center' | 'right';
  margin?: number;
}

export const UserImage = ({
  src = "https://via.placeholder.com/150", 
  alt = "Placeholder Image",
  width = '100%', 
  height = 'auto',
  objectFit = 'cover',
  alignment = 'left',
  margin = 5,
}: UserImageProps) => {

  const { connectors: { connect, drag } } = useNode();

  let alignmentClasses = 'justify-start'; 
  if (alignment === 'center') {
    alignmentClasses = 'justify-center';
  } else if (alignment === 'right') {
    alignmentClasses = 'justify-end';
  }

  const sizeStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        ref && connect(drag(ref))
      }}
      className={`flex ${alignmentClasses}`} 
      style={{ ...sizeStyle, margin: `${margin}px` }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          display: 'block',
          width: '100%',  
          height: '100%',
          objectFit: objectFit,
          cursor: 'move',
        }}
      >
      </img>
    </div>
  );
};

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
        label="Width (px or %)" 
        value={props.width ?? '100%'}
        onChange={(value) => setProp((props: UserImageProps) => props.width = value)}
      />
      <SettingsInput
        label="Height (px or %)"
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
