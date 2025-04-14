import React from 'react';
import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

interface UserBgImageProps {
  bgImage?: string;
  backgroundSize?: 'cover' | 'contain' | 'auto';
  backgroundPosition?: string;
  minHeight?: string | number;
  width?: string | number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  children?: React.ReactNode;
}

export const UserBgImage = ({
  bgImage = 'https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1380',
  backgroundSize = 'cover',
  backgroundPosition = 'center center',
  minHeight = '100vh',
  width = '100%',
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  children
}: UserBgImageProps) => {
  const { connectors: { connect, drag }, isSelected } = useNode(state => ({
    isSelected: state.events.selected,
  }));

  const parseDimension = (value: string | number | undefined): string => {
    if (value === undefined || value === null) return '';
    if (typeof value === 'number') return `${value}px`;
    return String(value);
  };

  const style: CSSProperties = {
    backgroundImage: bgImage ? `url(${bgImage})` : 'none',
    backgroundSize: backgroundSize,
    backgroundPosition: backgroundPosition,
    backgroundRepeat: 'no-repeat',
    width: parseDimension(width),
    minHeight: parseDimension(minHeight),
    marginTop: `${marginTop}rem`,
    marginBottom: `${marginBottom}rem`,
    marginLeft: `${marginLeft}rem`,
    marginRight: `${marginRight}rem`,
    paddingTop: `${paddingTop}rem`,
    paddingBottom: `${paddingBottom}rem`,
    paddingLeft: `${paddingLeft}rem`,
    paddingRight: `${paddingRight}rem`,
    boxSizing: 'border-box',
    position: 'relative',
    outline: isSelected ? '2px dashed var(--editor-highlight-color, #6D28D9)' : 'none',
    outlineOffset: '-2px',
    cursor: 'move',
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => { ref && connect(drag(ref)) }}
      style={style}
    >
      {children}
      {React.Children.count(children) === 0 && (
        <p className="text-xs text-center text-gray-600 pointer-events-none py-10">
          Background Image Section (Drop content here)
        </p>
      )}
    </div>
  );
};

const UserBgImageSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserBgImageProps,
  }));
  const debounceTime = 300;

  return (
    <div className="space-y-3 p-4">
      <SettingsInput
        label="Background Image URL" type="text" value={props.bgImage || ''}
        onChange={value => setProp((props: UserBgImageProps) => props.bgImage = value, debounceTime)}
      />
      <div className="grid grid-cols-2 gap-2">
        <SettingsSelect label="Background Size" value={props.backgroundSize || 'cover'}
          options={[{ value: 'cover', label: 'Cover' }, { value: 'contain', label: 'Contain' }, { value: 'auto', label: 'Auto' }]}
          onChange={value => setProp((props: UserBgImageProps) => props.backgroundSize = value as any, debounceTime)}
        />
        <SettingsInput label="Background Position" type="text" value={props.backgroundPosition || 'center center'}
          onChange={value => setProp((props: UserBgImageProps) => props.backgroundPosition = value, debounceTime)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <SettingsInput label="Min Height (px, vh, %)" type="text" value={props.minHeight ?? '60vh'}
          onChange={value => {
            const finalValue = value === '' ? '60vh' : value;
            setProp((props: UserBgImageProps) => props.minHeight = finalValue, debounceTime);
          }}
        />
        <SettingsInput label="Width (px, %)" type="text" value={props.width ?? '100%'}
          onChange={value => {
            const finalValue = value === '' ? '100%' : value;
            setProp((props: UserBgImageProps) => props.width = finalValue, debounceTime);
          }}
        />
      </div>

      <div className="pt-2 border-t border-gray-700/50">
        <label className="block text-xs font-medium text-gray-500 mb-1 mt-1">Padding (rem)</label>
        <div className="grid grid-cols-2 gap-2">
          <SettingsInput label="Top" type="number" step={0.1} min={0} value={props.paddingTop ?? 4}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserBgImageProps) => props.paddingTop = isNaN(num) ? 4 : num, debounceTime);
            }}
          />
          <SettingsInput label="Bottom" type="number" step={0.1} min={0} value={props.paddingBottom ?? 4}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserBgImageProps) => props.paddingBottom = isNaN(num) ? 4 : num, debounceTime);
            }}
          />
          <SettingsInput label="Left" type="number" step={0.1} min={0} value={props.paddingLeft ?? 2}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserBgImageProps) => props.paddingLeft = isNaN(num) ? 2 : num, debounceTime);
            }}
          />
          <SettingsInput label="Right" type="number" step={0.1} min={0} value={props.paddingRight ?? 2}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserBgImageProps) => props.paddingRight = isNaN(num) ? 2 : num, debounceTime);
            }}
          />
        </div>
      </div>
      <div className="pt-2 border-t border-gray-700/50">
        <label className="block text-xs font-medium text-gray-500 mb-1 mt-1">Margin (rem)</label>
        <div className="grid grid-cols-2 gap-2">
          <SettingsInput label="Top" type="number" step={0.1} min={0} value={props.marginTop ?? 0}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserBgImageProps) => props.marginTop = isNaN(num) ? 0 : num, debounceTime);
            }}
          />
          <SettingsInput label="Bottom" type="number" step={0.1} min={0} value={props.marginBottom ?? 0}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserBgImageProps) => props.marginBottom = isNaN(num) ? 0 : num, debounceTime);
            }}
          />
          <SettingsInput label="Left" type="number" step={0.1} min={0} value={props.marginLeft ?? 0}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserBgImageProps) => props.marginLeft = isNaN(num) ? 0 : num, debounceTime);
            }}
          />
          <SettingsInput label="Right" type="number" step={0.1} min={0} value={props.marginRight ?? 0}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserBgImageProps) => props.marginRight = isNaN(num) ? 0 : num, debounceTime);
            }}
          />
        </div>
      </div>
    </div>
  );
};

UserBgImage.craft = {
  props: {
    bgImage: 'https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1380',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    minHeight: '100vh',
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  } as UserBgImageProps,
  related: {
    settings: UserBgImageSettings
  },
};
