import React from 'react';
import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { SettingsInput } from '../SettingsInput';

interface UserSectionProps {
  background?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginTop?: number;
  marginBottom?: number;
  children?: React.ReactNode;
}

export const UserSection = ({
  background = 'transparent',
  paddingTop = 20,
  paddingBottom = 20,
  paddingLeft = 0,
  paddingRight = 0,
  marginTop = 0,
  marginBottom = 0,
  children
}: UserSectionProps) => {

  const { connectors: { connect, drag }, isSelected } = useNode((state) => ({
    isSelected: state.events.selected,
  }));

  const sectionStyle: CSSProperties = {
    background: background,
    paddingTop: `${paddingTop}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
    paddingRight: `${paddingRight}px`,
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    width: '100%',
    minHeight: '40px',
    position: 'relative',
    boxSizing: 'border-box',
  };

  if (isSelected) {
    sectionStyle.border = '2px dashed #6D28D9';
  }

  return (
    <section
      ref={(ref: HTMLElement | null) => { ref && connect(drag(ref)) }}
      style={sectionStyle}
    >
      {children}
      {React.Children.count(children) === 0 && (
        <p className="text-xs text-center text-gray-600 pointer-events-none py-4">Drop content here</p>
      )}
    </section>
  );
};

const UserSectionSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserSectionProps,
  }));

  return (
    <div className="space-y-3 p-4">
      <SettingsInput
        label="Background Color"
        type="color"
        value={props.background || '#ffffff00'}
        onChange={(value) => setProp((props: UserSectionProps) => props.background = value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <SettingsInput
          label="Padding Top (px)"
          type="number"
          min={0}
          value={props.paddingTop ?? 20}
          onChange={(value) => setProp((props: UserSectionProps) => props.paddingTop = parseInt(value || '0', 10))}
        />
        <SettingsInput
          label="Padding Bottom (px)"
          type="number"
          min={0}
          value={props.paddingBottom ?? 20}
          onChange={(value) => setProp((props: UserSectionProps) => props.paddingBottom = parseInt(value || '0', 10))}
        />
        <SettingsInput
          label="Padding Left (px)"
          type="number"
          min={0}
          value={props.paddingLeft ?? 0}
          onChange={(value) => setProp((props: UserSectionProps) => props.paddingLeft = parseInt(value || '0', 10))}
        />
        <SettingsInput
          label="Padding Right (px)"
          type="number"
          min={0}
          value={props.paddingRight ?? 0}
          onChange={(value) => setProp((props: UserSectionProps) => props.paddingRight = parseInt(value || '0', 10))}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <SettingsInput
          label="Margin Top (px)" type="number"
          value={props.marginTop ?? 0}
          onChange={(value) => setProp((props: UserSectionProps) => props.marginTop = parseInt(value || '0', 10))}
        />
        <SettingsInput
          label="Margin Bottom (px)" type="number"
          value={props.marginBottom ?? 0}
          onChange={(value) => setProp((props: UserSectionProps) => props.marginBottom = parseInt(value || '0', 10))}
        />
      </div>
    </div>
  );
};

UserSection.craft = {
  props: {
    background: 'transparent',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
  } as UserSectionProps,
  related: {
    settings: UserSectionSettings
  },
};
