import React from 'react';
import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { SettingsInput } from '../SettingsInput';

interface UserSpacerProps {
  height?: number;
}

export const UserSpacer = ({
  height = 20,
}: UserSpacerProps) => {

  const { connectors: { connect, drag }, isSelected, isHovered } = useNode((state) => ({
    isSelected: state.events.selected,
    isHovered: state.events.hovered,
  }));

  const spacerStyle: CSSProperties = {
    height: `${height}px`,
    width: '100%',
    transition: 'background-color 0.15s ease-in-out',
    backgroundColor: isSelected || isHovered ? 'rgba(109, 40, 217, 0.1)' : 'transparent',
    border: isSelected || isHovered ? `1px dashed rgba(109, 40, 217, 0.5)` : '1px dashed transparent', // Show dashed line on hover/select
    cursor: 'move',
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => { ref && connect(drag(ref)) }}
      style={spacerStyle}
    >
    </div>
  );
};

const UserSpacerSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserSpacerProps,
  }));

  return (
    <div className="space-y-3 p-4">
      <SettingsInput
        label="Height (px)"
        type="number"
        min={1}
        value={props.height ?? 20}
        onChange={(value) => setProp((props: UserSpacerProps) => props.height = Math.max(1, parseInt(value || '1', 10)))}
      />
    </div>
  );
};

UserSpacer.craft = {
  props: {
    height: 20,
  } as UserSpacerProps,
  related: {
    settings: UserSpacerSettings
  },
};
