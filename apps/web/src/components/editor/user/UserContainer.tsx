// src/components/editor/user/UserContainer.tsx
import React, { CSSProperties } from 'react';
import { Element, useNode, Canvas } from "@craftjs/core";
import { SettingsInput } from '../SettingsInput'; // Assuming these exist and are correct
import { SettingsSelect } from '../SettingsSelect'; // Assuming these exist and are correct

interface UserContainerProps {
    background?: string;
    padding?: number;
    margin?: number;
    flexDirection?: 'row' | 'col';
    justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    gap?: number;
}

export const UserContainer = ({ /* ...props... */ }: UserContainerProps) => {
    // console.log("--- Rendering UserContainer ---"); // Keep console logs for debugging
    const { connectors: { connect, drag } } = useNode();
    // ... style calculations ...

    return (
        <div
            ref={(ref: HTMLDivElement | null) => { ref && connect(drag(ref)) }}
        >
            <Canvas id="user-container-canvas" />
        </div>
    );
};

const UserContainerSettings = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props as UserContainerProps,
    }));
    // ... settings JSX using SettingsInput/SettingsSelect ...
    return (
        <div className="space-y-3 p-4">
            {/* Settings Controls */}
             <SettingsInput
                label="Background Color" type="color" value={props.background || '#ffffff00'}
                onChange={(value) => setProp((props: UserContainerProps) => props.background = value)}
             />
             <SettingsInput
                label="Padding (px)" type="number" value={props.padding ?? 10}
                onChange={(value) => setProp((props: UserContainerProps) => props.padding = parseInt(value || '0', 10))}
             />
             <SettingsInput
                label="Margin (px)" type="number" value={props.margin ?? 0}
                 onChange={(value) => setProp((props: UserContainerProps) => props.margin = parseInt(value || '0', 10))}
             />
              <SettingsInput
                 label="Gap (px)" type="number" value={props.gap ?? 0}
                 onChange={(value) => setProp((props: UserContainerProps) => props.gap = parseInt(value || '0', 10))}
             />
             <SettingsSelect
                 label="Direction" options={[{ value: 'col', label: 'Column' }, { value: 'row', label: 'Row' }]} value={props.flexDirection || 'col'}
                 onChange={(value) => setProp((props: UserContainerProps) => props.flexDirection = value as any)}
             />
             <SettingsSelect
                 label="Justify Content" options={[ { value: 'start', label: 'Start' }, { value: 'center', label: 'Center' }, /* ... more */ ]} value={props.justifyContent || 'start'}
                 onChange={(value) => setProp((props: UserContainerProps) => props.justifyContent = value as any)}
             />
             <SettingsSelect
                 label="Align Items" options={[ { value: 'start', label: 'Start' }, { value: 'center', label: 'Center' }, /* ... more */ ]} value={props.alignItems || 'start'}
                 onChange={(value) => setProp((props: UserContainerProps) => props.alignItems = value as any)}
             />
        </div>
    );
};


// Assign static properties
UserContainer.craft = {
    props: {
        background: 'transparent',
        padding: 10,
        margin: 0,
        flexDirection: 'col',
        justifyContent: 'start',
        alignItems: 'start',
        gap: 0,
    } as UserContainerProps,
    related: {
        settings: UserContainerSettings
    },
    // --- ADD THIS LINE ---
    displayName: "Container" // Explicitly set the name Craft.js should use
    // --- END ADD ---
};
