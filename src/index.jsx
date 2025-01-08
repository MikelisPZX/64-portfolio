import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'));

// Function to get camera settings based on device type
const getCameraSettings = () => {
    if (window.innerWidth <= 768) { // Mobile devices (you can adjust the breakpoint)
        return {
            fov: 80,
            near: 0.1,
            far: 2000,
            position: [-4, 1.5, 4],
        };
    } else {
        return {
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [-3, 1.5, 4],
        };
    }
};

// Render the Canvas with the appropriate settings
root.render(
    <Canvas
        className="r3f"
        camera={getCameraSettings()}
    >
        <Experience />
    </Canvas>
);
