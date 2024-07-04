// template.tsx
import React, { useEffect } from 'react';

// Import CSS globally
import './globals.css';

// Import helix conditionally
let helix: any;
if (typeof window !== 'undefined') {
    helix = require('ldrs').helix;
    helix.register();
}

const Template = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="animate-zoomin">
            {children}
        </div>
    );
}

export default Template;
