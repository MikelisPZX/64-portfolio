import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
export default function Experience() {
    // Load both models
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
    const phone = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf');

    // State to store if it's mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [scrollValue, setScrollValue] = useState(0); // Track scroll position

    // Check for mobile resize
   

    useEffect(() => {
        const handleScroll = debounce(() => {
            const maxScroll = 500;
            const scrollPos = Math.min(window.scrollY, maxScroll);
            setScrollValue(scrollPos / maxScroll); // Normalize between 0 and 1
        }, 50); // Adjust the debounce delay as needed
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    // Scroll trigger logic
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

    // Define positions for mobile and desktop
    const primitivePosition = isMobile
        ? [-0.6, -0.5, lerp(-0.5, 1.5, scrollValue)] // Mobile position
        : [0, -1.2, lerp(0, 2, scrollValue)]; // Desktop position

    return (
        <>
            <Environment preset="city" />
            <color args={['#001b28']} attach="background" />

            {isMobile ? (
                // Mobile-specific PresentationControls
                <PresentationControls
    global
    rotation={[
        lerp(-0.02, 0, scrollValue),
        lerp(-0.1, 0, scrollValue),
        0,
    ]}
    polar={[
        lerp(-0.2, 0, scrollValue),
        lerp(0.1, 0, scrollValue),
    ]}
    azimuth={[
        lerp(-0.5, 0, scrollValue),
        lerp(0.5, 0, scrollValue),
    ]}
    config={{ mass: 1.5, tension: 300 }}
    snap={{ mass: 3, tension: 300 }}
    intensity={0.5}
>
    <Float rotationIntensity={lerp(0.2, 0, scrollValue)}>
        <rectAreaLight
            width={2.0}
            height={1.3}
            intensity={50}
            color={'#001b28'}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.5, -1]}
        />
        <primitive
            object={phone.scene}
            position={primitivePosition}
        >
            <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={lerp(1.17, 1.17, scrollValue)}
                position={[
                    lerp(0.05, 0, scrollValue),
                    lerp(1.47, 1.47, scrollValue),
                    lerp(-0.03, -0.03, scrollValue),
                ]}
            >
                <iframe
                    src="https://eksplodemedia.com/"

                />
            </Html>
        </primitive>
        <Text
            font="./Montserrat-SemiBold.woff"
            fontSize={0.5}
            position={[1.5, 0.75, 0.3]}
            rotation-y={-1.25}
            maxWidth={2}
            textAlign="center"
        >
            Miķelis Piziks
        </Text>
    </Float>
</PresentationControls>

            ) : (
                // Desktop-specific PresentationControls
                <PresentationControls
                    global
                    rotation={[
                        lerp(0.13, 0, scrollValue), // Interpolating rotation X
                        lerp(0.1, -0.07, scrollValue),  // Interpolating rotation Y
                        lerp(0, 0, scrollValue),    // Interpolating rotation Z
                    ]}
                    polar={[
                        lerp(-0.4, 0, scrollValue), // Interpolating polar min
                        lerp(0.2, 0, scrollValue),  // Interpolating polar max
                    ]}
                    azimuth={[
                        lerp(-1, 0, scrollValue),   // Interpolating azimuth min
                        lerp(0.75, 0, scrollValue), // Interpolating azimuth max
                    ]}
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 4, tension: 400 }}
                >
                    <Float rotationIntensity={lerp(0.4, 0.0, scrollValue)}>
                        <rectAreaLight
                            width={2.5}
                            height={1.65}
                            intensity={65}
                            color={'#8e619f'}
                            rotation={[0.1, Math.PI, 0]}
                            position={[0, 0.55, -1.15]}
                        />
                        <primitive
                            object={computer.scene}
                            position={primitivePosition}
                        >
                            <Html
                                transform
                                wrapperClass="htmlScreen"
                                distanceFactor={1.17}
                                position={isMobile ? [0.03, 1.47, -0.03] : [0, 1.54, -1.45]}
                                rotation-x={isMobile ? 0 : -0.256}
                                portal={document.body} // Render outside the canvas for better performance
                                >
                                    <iframe src="https://eksplodemedia.com/" />
                            </Html>

                        </primitive>
                        <Text
                            font="./Montserrat-SemiBold.woff"
                            fontSize={0.8} // Desktop-specific font size
                            position={[2, 0.75, 0.75]} // Desktop-specific position
                            rotation-y={-1.25}
                            maxWidth={2}
                            textAlign="center"
                        >
                            Miķelis Piziks
                        </Text>
                    </Float>
                </PresentationControls>
            )}

            <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
        </>
    );
}
