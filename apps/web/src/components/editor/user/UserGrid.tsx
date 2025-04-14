import React from 'react';
import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { SettingsInput } from '../SettingsInput';

interface UserGridProps {
    columnCount?: number;
    gap?: number;
    padding?: number;
    marginTop?: number;
    marginBottom?: number;
    background?: string;
    children?: React.ReactNode;
}

export const UserGrid = ({
    columnCount = 3,
    gap = 15,
    padding = 10,
    marginTop = 0,
    marginBottom = 0,
    background = 'transparent',
    children
}: UserGridProps) => {

    const { connectors: { connect, drag }, isSelected } = useNode((state) => ({
        isSelected: state.events.selected,
    }));

    const gridStyle: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.max(1, columnCount)}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        padding: `${padding}px`,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        background: background,
        width: '100%',
        minHeight: '60px',
        position: 'relative',
        boxSizing: 'border-box',
    };

    if (isSelected) {
        gridStyle.border = '2px dashed #6D28D9';
    }

    return (
        <div
            ref={(ref: HTMLDivElement | null) => { ref && connect(drag(ref)) }}
            style={gridStyle}
        >
            {children}
            {React.Children.count(children) === 0 && (
                <p className="text-xs text-center text-gray-600 pointer-events-none py-4 col-span-full">
                    Drop content or blocks here
                </p>
            )}
        </div>
    );
};

const UserGridSettings = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props as UserGridProps,
    }));

    return (
        <div className="space-y-3 p-4">
            <SettingsInput
                label="Columns" type="number" min={1} max={12}
                value={props.columnCount ?? 3}
                onChange={(value) => setProp((props: UserGridProps) => props.columnCount = Math.max(1, parseInt(value || '1', 10)))}
            />
            <SettingsInput
                label="Gap (px)" type="number" min={0}
                value={props.gap ?? 15}
                onChange={(value) => setProp((props: UserGridProps) => props.gap = parseInt(value || '0', 10))}
            />
             <SettingsInput
                label="Padding (px)" type="number" min={0}
                value={props.padding ?? 10}
                onChange={(value) => setProp((props: UserGridProps) => props.padding = parseInt(value || '0', 10))}
            />
            <SettingsInput
                label="Background Color" type="color"
                value={props.background || '#ffffff00'}
                onChange={(value) => setProp((props: UserGridProps) => props.background = value)}
            />
             <SettingsInput
                label="Margin Top (px)" type="number"
                value={props.marginTop ?? 0}
                onChange={(value) => setProp((props: UserGridProps) => props.marginTop = parseInt(value || '0', 10))}
            />
             <SettingsInput
                label="Margin Bottom (px)" type="number"
                value={props.marginBottom ?? 0}
                onChange={(value) => setProp((props: UserGridProps) => props.marginBottom = parseInt(value || '0', 10))}
            />
        </div>
    );
};

UserGrid.craft = {
    props: {
        columnCount: 3,
        gap: 15,
        padding: 10,
        marginTop: 0,
        marginBottom: 0,
        background: 'transparent',
    } as UserGridProps,
    related: {
        settings: UserGridSettings
    },
};
