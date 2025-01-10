import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import Experience from './Experience.jsx';
import { debounce } from 'lodash';

// Component to manage camera settings dynamically
function DynamicCamera() {
    const { camera } = useThree(); // Access the Three.js camera
    const [scrollValue, setScrollValue] = useState(0); // Track scroll position

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = 500; // Adjust this value based on the desired scroll range
            const scrollPos = Math.min(window.scrollY, maxScroll);
            setScrollValue(scrollPos / maxScroll); // Normalize between 0 and 1
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Interpolation function
    const lerp = (start, end, t) => start + (end - start) * t;

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            const initialPosition = [-4, 2, 4];
            const targetPosition = [-0.5, 1, 4.5];

            // Interpolate camera position based on scrollValue
            camera.position.set(
                lerp(initialPosition[0], targetPosition[0], scrollValue),
                lerp(initialPosition[1], targetPosition[1], scrollValue),
                lerp(initialPosition[2], targetPosition[2], scrollValue)
            );

            // Camera focus for mobile
            camera.lookAt(0, 1, 0);
            camera.fov = 70; // Set FOV for mobile
        } else {
            const initialPosition = [-4, 1.5, 4];
            const targetPosition = [0, 1.5, 4];

            // Interpolate camera position based on scrollValue
            camera.position.set(
                lerp(initialPosition[0], targetPosition[0], scrollValue),
                lerp(initialPosition[1], targetPosition[1], scrollValue),
                lerp(initialPosition[2], targetPosition[2], scrollValue)
            );

            // Camera focus for desktop
            camera.lookAt(0, 0.1, 0);
            camera.fov = 45; // Set FOV for desktop
        }

        camera.updateProjectionMatrix(); // Update camera after changes
    }, [camera, scrollValue]);

    return null; // This component only manages the camera, no UI rendering
}

const root = ReactDOM.createRoot(document.querySelector('#root'));

// Lock the viewport height on mobile
const initialHeight = window.innerHeight;
document.documentElement.style.setProperty('--vh', `${initialHeight * 0.01}px`);

// Render the Canvas with dynamic camera management and locked height
root.render(
    <Canvas
        className="r3f"
        resize={{ debounce: 200 }} // Debounce canvas resizing
        camera={{ fov: 45, near: 0.1, far: 2000, position: [-4, 1.5, 4] }}
        style={{
            height: 'calc(var(--vh, 1vh) * 100)', // Use the locked height
        }}
    >
        <DynamicCamera />
        <Experience />
    </Canvas>
);
