"use client";

import {useEffect, useRef} from "react";
import * as THREE from "three";
import {motion} from "framer-motion";


export default function Hero(){

    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(()=>{

        const canvas = canvasRef.current;

        if(!canvas) 
        return;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha:true,
            antialias:true
        });


        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio,2)
        );

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth /
            window.innerHeight,
            .1,
            1000
        );

        camera.position.set(
            0, 0, 18
        );


        // LIGHTS
        scene.add( new THREE.AmbientLight(
            0x111111, 1
        ));

        const goldLight = new THREE.PointLight(
            0xC9A84C, 4, 40
        );

        goldLight.position.set(
            5, 5, 5
        );
        scene.add(goldLight);

        const redLight = new THREE.PointLight(
            0xB22222, 2, 30
        );


        redLight.position.set(
            -8, -4, 3
        );
        scene.add(redLight);

        scene.add( new THREE.DirectionalLight(
            0xffffff, 1.5
        ));


        // MATERIALS
        const goldMaterial = new THREE.MeshStandardMaterial({
            color:0xC9A84C,
            metalness:1,
            roughness:.1,
            emissive:0x3d2800,
            emissiveIntensity:.3
        });

        const redMaterial = new THREE.MeshStandardMaterial({
            color:0xB22222,
            metalness:.8,
            roughness:.2
        });


        // TORUS KNOT
        const knotGeometry = new THREE.TorusKnotGeometry(
        2.5, .5, 180, 24, 2, 3
        );

        const knot = new THREE.Mesh(
            knotGeometry,
            goldMaterial
        );

        knot.position.set(
            5, 0, -2
        );
        scene.add(knot);


        // OCTAHEDRON
        const oct = new THREE.Mesh( 
            new THREE.OctahedronGeometry(
                1.6, 1
            ),
            goldMaterial
        );

        oct.position.set(
            -6, 2, -1
        );
        scene.add(oct);


        // RED SPHERE
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(
                .8, 32, 32
            ),
            redMaterial
        );

        sphere.position.set(
            -5, -3, 1
        );
        scene.add(sphere);


        // PARTICLES
        const count = 400;

        const positions = new Float32Array(count * 3);

        for(let i=0;i<count;i++){

            positions[i*3] = (Math.random()-.5)*60;

            positions[i*3+1] = (Math.random()-.5)*40;

            positions[i*3+2] = (Math.random()-.5)*30;
            
        }

        const particleGeometry = new THREE.BufferGeometry();

        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions, 3
            )
        );

        const particles = new THREE.Points(

            particleGeometry,

            new THREE.PointsMaterial({
                color: 0xC9A84C,
                size: .12
            })

        );
        scene.add(particles);

        let animation:number;

        const clock = new THREE.Clock();


        function animate(){

            animation = requestAnimationFrame(animate);

            const t = clock.getElapsedTime();

            knot.rotation.x = t*.25;
            knot.rotation.y = t*.4;

            oct.rotation.x = t*.5;
            oct.rotation.z = t*.3;

            sphere.rotation.y = t*.6;

            particles.rotation.y = t*.02;

            goldLight.position.x = Math.cos(t*.5)*8;


            renderer.render(
                scene,
                camera
            );

        }

        animate();



        function resize(){
            camera.aspect = window.innerWidth / window.innerHeight;

            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );
        }

        window.addEventListener(
            "resize",
            resize
        );


        return()=>{
            cancelAnimationFrame(animation);

            window.removeEventListener(
                "resize",
                resize
            );
            renderer.dispose();
        };

    },[]);





return(

<section
    id="hero"
>
    <canvas ref={canvasRef} id="hero-canvas" 

    />

    <div className="hero-overlay" />

    <div className="hero-content">
        <div className="hero-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px" }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>Africa's #1 Igbo Entertainment Platform
            </div>
        <h1 className="hero-title">
            <span className="t-line">ODEZULUIGBO</span>
            <span className="t-line accent">SHOWS</span>
        </h1>
        <p className="hero-tagline">Ka ọ si dị na Ala Igbo</p>
        <p className="hero-sub">Celebrating Igbo Culture · Talent · Beauty · Excellence</p>

        <div className="hero-btns">
            <a className="btn btn-gold">
                Explore Events
            </a>
            <a className="btn btn-outline">
                Vote Now
            </a>
        </div>
        <div className="hero-cd">
            <div className="cd-label">⏳ Next Event: AdaomaIgbonile Pageant — Nov 30, 2025</div>
            <div className="cd-timer">
                <div className="cd-unit"><span id="cd-days">00</span><small>Days</small></div>
                <div className="cd-sep">:</div>
                <div className="cd-unit"><span id="cd-hours">00</span><small>Hours</small></div>
                <div className="cd-sep">:</div>
                <div className="cd-unit"><span id="cd-mins">00</span><small>Mins</small></div>
                <div className="cd-sep">:</div>
                <div className="cd-unit"><span id="cd-secs">00</span><small>Secs</small></div>
            </div>
        </div>
    </div>
    <div className="scroll-hint">
        <div className="scroll-line"></div>
        <span>Scroll</span>
    </div>
        

</section>

)


}