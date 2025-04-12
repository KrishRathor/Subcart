// src/components/editor/user/MinimalTest.tsx
import React from 'react';
import { useNode } from '@craftjs/core';

export const MinimalTest = () => {
    const { connectors: { connect, drag } } = useNode();
    console.log("--- Rendering MinimalTest ---"); // Check console
    return (
        <div ref={ref => { ref && connect(drag(ref)) }} style={{ padding: '20px', border: '2px solid green', margin: '10px' }}>
            Minimal Test Component - It Works!
        </div>
    );
};

// Simplest possible craft config
MinimalTest.craft = {
   props: {},
   // No settings needed
};
