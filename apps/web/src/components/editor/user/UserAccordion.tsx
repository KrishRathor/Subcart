import React, { useState, createContext, useContext, useMemo } from 'react';
import { useNode } from "@craftjs/core";
import type { CSSProperties } from 'react';
import { SettingsInput } from '../SettingsInput';

interface AccordionContextProps {
    openNodeId: string | null;
    setOpenNodeId: (nodeId: string | null) => void;
}

const AccordionContext = createContext<AccordionContextProps | null>(null);
export const useAccordionContext = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("useAccordionContext must be used within UserAccordion");
    }
    return context;
};

interface UserAccordionProps {
    gap?: number;
    marginTop?: number;
    marginBottom?: number;
    children?: React.ReactNode;
}

export const UserAccordion = ({
    gap = 2,
    marginTop = 10,
    marginBottom = 10,
    children
}: UserAccordionProps) => {
    const { connectors: { connect, drag }, isSelected } = useNode((state) => ({
        isSelected: state.events.selected,
    }));
    const [openNodeId, setOpenNodeIdInternal] = useState<string | null>(null);

    const contextValue = useMemo(() => ({
        openNodeId,
        setOpenNodeId: (nodeId: string | null) => {
            setOpenNodeIdInternal(currentOpenId => (currentOpenId === nodeId ? null : nodeId));
        }
    }), [openNodeId]);

    const style: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: `${gap}px`,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        width: '100%',
        border: isSelected ? '2px dashed #6D28D9' : 'none',
        padding: isSelected ? '3px' : '5px', // Adjust padding slightly when selected
        boxSizing: 'border-box',
    };

    return (
        <AccordionContext.Provider value={contextValue}>
            <div
                ref={(ref: HTMLDivElement | null) => { ref && connect(drag(ref)) }}
                style={style}
            >
                {children}
                {React.Children.count(children) === 0 && (
                     <p className="text-xs text-center text-gray-600 pointer-events-none py-4">
                        Drop Accordion Items here
                     </p>
                 )}
            </div>
        </AccordionContext.Provider>
    );
};

const UserAccordionSettings = () => {
     const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props as UserAccordionProps }));
     return (
         <div className="space-y-3 p-4">
             <SettingsInput label="Gap Between Items (px)" type="number" min="0" value={props.gap ?? 2} onChange={(value) => setProp((props: UserAccordionProps) => props.gap = parseInt(value || '0', 10))} />
             <SettingsInput label="Margin Top (px)" type="number" value={props.marginTop ?? 10} onChange={(value) => setProp((props: UserAccordionProps) => props.marginTop = parseInt(value || '0', 10))} />
             <SettingsInput label="Margin Bottom (px)" type="number" value={props.marginBottom ?? 10} onChange={(value) => setProp((props: UserAccordionProps) => props.marginBottom = parseInt(value || '0', 10))} />
         </div>
     );
}

UserAccordion.craft = {
    props: {
        gap: 2,
        marginTop: 10,
        marginBottom: 10,
    } as UserAccordionProps,
    related: {
        settings: UserAccordionSettings
    },
    rules: {
        canMoveIn: (incoming: any) => incoming.data.displayName === 'AccordionItem',
    },
};
