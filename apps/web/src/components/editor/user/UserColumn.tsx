import React from 'react';
import { Element, useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { SettingsInput } from '../SettingsInput';
import { SettingsSelect } from '../SettingsSelect';

type GridAlignment = 'start' | 'center' | 'end' | 'stretch';

interface UserColumnProps {
  columnCount?: number;
  gap?: number;
  minHeight?: string | number;
  width?: string | number;
  showEditorBorder?: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  alignItems?: GridAlignment;
  justifyItems?: GridAlignment;
  children?: React.ReactNode;
}

export const UserColumn = ({
  columnCount = 2,
  gap = 15,
  minHeight = 100,
  width = '100%',
  showEditorBorder = true,
  marginTop = 0,
  marginBottom = 2,
  marginLeft = 0,
  marginRight = 0,
  alignItems = 'center',
  justifyItems = 'stretch',
  children
}: UserColumnProps) => {

  const { connectors: { connect, drag }, isSelected } = useNode(state => ({
    isSelected: state.events.selected
  }));

  const parseDimension = (value: string | number | undefined): string => {
    if (value === undefined || value === null) return '';
    if (typeof value === 'number') return `${value}px`;
    return String(value);
  };

  const style: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${Math.max(1, columnCount)}, minmax(0, 1fr))`,
    gap: `${gap}px`,
    width: parseDimension(width),
    minHeight: parseDimension(minHeight),
    marginTop: `${marginTop}rem`,
    marginBottom: `${marginBottom}rem`,
    marginLeft: `${marginLeft}rem`,
    marginRight: `${marginRight}rem`,
    alignItems: alignItems,
    justifyItems: justifyItems,
    position: 'relative',
    boxSizing: 'border-box',
    border: showEditorBorder && isSelected ? '2px dashed var(--editor-highlight-color, #6D28D9)' : (showEditorBorder ? '1px dashed #4A5568' : 'none'),
    padding: showEditorBorder ? '2px' : '0px',
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => { ref && connect(drag(ref)) }}
      style={style}
      data-editor-component-name="UserColumn"
    >
      {children}
      {React.Children.count(children) === 0 && (
        <div
          style={{ gridColumn: `span ${Math.max(1, columnCount)} / span ${Math.max(1, columnCount)}` }}
          className="text-xs text-center text-gray-600 pointer-events-none py-10"
        >
          Column Layout (Drop content here)
        </div>
      )}
    </div>
  );
};


const UserColumnSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserColumnProps,
  }));
  const debounceTime = 300;

  return (
    <div className="space-y-3 p-4">
      <SettingsInput
        label="Columns" type="number" min={1} max={12} step={1}
        value={props.columnCount ?? 2}
        onChange={value => {
          const num = parseInt(String(value) || '1', 10);
          setProp((props: UserColumnProps) => props.columnCount = isNaN(num) ? 1 : Math.max(1, num), debounceTime);
        }}
      />
      <SettingsInput
        label="Gap (px)" type="number" min={0} step={1}
        value={props.gap ?? 15}
        onChange={value => {
          const num = parseInt(String(value) || '0', 10);
          setProp((props: UserColumnProps) => props.gap = isNaN(num) ? 0 : Math.max(0, num), debounceTime);
        }}
      />
      <SettingsInput
        label="Min Height (px, vh, auto)" type="text"
        value={props.minHeight ?? 100}
        onChange={value => {
          const finalValue = value === '' ? 100 : value;
          setProp((props: UserColumnProps) => props.minHeight = finalValue, debounceTime);
        }}
      />
      <SettingsInput
        label="Width (px, %)" type="text"
        value={props.width ?? '100%'}
        onChange={value => {
          const finalValue = value === '' ? '100%' : value;
          setProp((props: UserColumnProps) => props.width = finalValue, debounceTime);
        }}
      />

      <div className="pt-2 border-t border-gray-700/50">
        <SettingsSelect
          label='Align Items (Vertical)'
          value={props.alignItems || 'stretch'}
          options={[{ value: 'start', label: 'Start' }, { value: 'center', label: 'Center' }, { value: 'end', label: 'End' }, { value: 'stretch', label: 'Stretch' }]}
          onChange={value => setProp((props: UserColumnProps) => props.alignItems = value as GridAlignment, debounceTime)}
        />
      </div>
      <div className="pt-2">
        <SettingsSelect
          label='Justify Items (Horizontal)'
          value={props.justifyItems || 'stretch'}
          options={[{ value: 'start', label: 'Start' }, { value: 'center', label: 'Center' }, { value: 'end', label: 'End' }, { value: 'stretch', label: 'Stretch' }]}
          onChange={value => setProp((props: UserColumnProps) => props.justifyItems = value as GridAlignment, debounceTime)}
        />
      </div>


      <div className="pt-2 border-t border-gray-700/50">
        <label className="block text-xs font-medium text-gray-500 mb-1 mt-1">Margin (rem)</label>
        <div className="grid grid-cols-2 gap-2">
          <SettingsInput label="Top" type="number" step={0.1} min={0} value={props.marginTop ?? 0}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserColumnProps) => props.marginTop = isNaN(num) ? 0 : num, debounceTime);
            }}
          />
          <SettingsInput label="Bottom" type="number" step={0.1} min={0} value={props.marginBottom ?? 2}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserColumnProps) => props.marginBottom = isNaN(num) ? 0 : num, debounceTime);
            }}
          />
          <SettingsInput label="Left" type="number" step={0.1} min={0} value={props.marginLeft ?? 0}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserColumnProps) => props.marginLeft = isNaN(num) ? 0 : num, debounceTime);
            }}
          />
          <SettingsInput label="Right" type="number" step={0.1} min={0} value={props.marginRight ?? 0}
            onChange={value => {
              const num = parseFloat(String(value) || '0');
              setProp((props: UserColumnProps) => props.marginRight = isNaN(num) ? 0 : num, debounceTime);
            }}
          />
        </div>
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-400 mt-2">
          <input
            type="checkbox"
            checked={props.showEditorBorder ?? true}
            onChange={e => setProp((props: UserColumnProps) => props.showEditorBorder = e.target.checked, debounceTime)}
            className="mr-2 h-4 w-4 rounded text-purple-600 focus:ring-purple-500 bg-gray-800 border-gray-700"
          />
          Show Editor Border Aid
        </label>
      </div>
    </div>
  );
};

UserColumn.craft = {
  props: {
    columnCount: 2,
    gap: 15,
    minHeight: 100,
    width: '100%',
    showEditorBorder: true,
    marginTop: 0,
    marginBottom: 2,
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'center',
    justifyItems: 'stretch',
  } as UserColumnProps,
  related: {
    settings: UserColumnSettings
  },
};
