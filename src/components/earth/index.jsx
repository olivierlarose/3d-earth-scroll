'use client';
import { Canvas, useLoader } from '@react-three/fiber'
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { motion } from 'framer-motion-3d';
import Lenis from '@studio-freight/lenis'

export default function earth() {

    const scene = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scene,
        offset: ['start end', 'end start']
    })
    
    /* Used for smooth rotation if you don't want a global smooth scroll */
    // const smoothRotation = useSpring(scrollYProgress, {
    // damping: 20
    // });

    const [color, normal, aoMap] = useLoader(TextureLoader, [
        '/assets/color.jpg',
        '/assets/normal.png',
        '/assets/occlusion.jpg'
    ])

    return (
        <Canvas ref={scene}>
            <ambientLight intensity={0.1} />
            <directionalLight intensity={3.5} position={[1, 0, -.25]} />
            <motion.mesh scale={2.5} rotation-y={scrollYProgress}>
                <sphereGeometry args={[1, 64, 64]}/>
                <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap}/>
            </motion.mesh>
        </Canvas>
    )
}
