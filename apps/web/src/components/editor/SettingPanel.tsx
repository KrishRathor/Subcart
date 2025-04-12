import React from 'react';
import { useEditor } from "@craftjs/core";

export const SettingsPanel = () => {
    const { selectedNodeId, settingsComponent, nodeName } = useEditor((state, query) => {
        const selectedIds = state.events.selected;
        const currentNodeId = selectedIds.size > 0 ? Array.from(selectedIds)[0] : null;
        const node = currentNodeId ? state.nodes[currentNodeId] : null;
        return {
            selectedNodeId: currentNodeId,
            settingsComponent: node?.related?.settings,
            // Get display name or component name
            nodeName: node ? (node.data.custom.displayName || node.data.displayName || node.data.name) : null
        };
    });

    return (
        <div className="h-full bg-gray-900">
             <h3 className="text-sm font-semibold text-gray-400 mb-0 uppercase tracking-wider px-4 pt-4 pb-3 border-b border-gray-800">
                {/* Show selected component name or default */}
                {nodeName ? `${nodeName} Settings` : 'Settings'}
            </h3>
            <div className="pt-1"> {/* Adjusted padding/borders */}
                {selectedNodeId && settingsComponent ? (
                    React.createElement(settingsComponent)
                ) : (
                    <p className="text-sm text-gray-500 p-4 text-center mt-4">
                        Select a component on the canvas to edit its properties.
                    </p>
                )}
            </div>
        </div>
    );
};
