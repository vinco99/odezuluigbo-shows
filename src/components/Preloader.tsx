"use client";

import {useEffect, useRef, useState} from "react";
import * as THREE from "three";


export default function Preloader(){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [hidden, setHidden] = useState(false);


    useEffect(()=>{

        const alreadyLoaded = sessionStorage.getItem("odezuluigbo-loaded");


        if(alreadyLoaded){
            setHidden(true);
            return;
        }

        sessionStorage.setItem(
            "odezuluigbo-loaded",
            "true"
        );


        const canvas = canvasRef.current;


        if(canvas){

            const renderer = new THREE.WebGLRenderer({
                canvas,
                alpha:true,
                antialias:true
            });

            renderer.setSize(110,110);
            renderer.setPixelRatio(window.devicePixelRatio);


            const scene = new THREE.Scene();


            const camera = new THREE.PerspectiveCamera(
                50, 1, 0.1, 100
            );


            camera.position.z=3;


            const geometry = new THREE.TorusGeometry(
                .8, .18, 24, 80
            );


            const material = new THREE.MeshStandardMaterial({
                color:0xC9A84C,
                metalness:1,
                roughness:.15
            });


            const torus = new THREE.Mesh(
                geometry,
                material
            );

            scene.add(torus);


            const sphere = new THREE.Mesh(

                new THREE.SphereGeometry(
                    .22, 32, 32
                ),

                new THREE.MeshStandardMaterial({
                    color:0xE8C96E,
                    metalness:1,
                    roughness:.1
                })
            );

            scene.add(sphere);

            scene.add(new THREE.AmbientLight(
                0xffffff, .5
            ));


            const light = new THREE.DirectionalLight(
                0xffd700, 2.5
            );

            light.position.set(
                3, 3, 3
            );

            scene.add(light);


            let animation:number;

            function animate(){

                animation = requestAnimationFrame(animate);
                torus.rotation.x += .015;
                torus.rotation.y += .02;

                renderer.render(
                    scene,
                    camera
                );
            }

            animate();

            document.body.style.overflow="hidden";


            const timer = setTimeout(()=>{
                cancelAnimationFrame(animation);

                sessionStorage.setItem(
                    "odezuluigbo-loaded",
                    "true"
                );

                setHidden(true);
                document.body.style.overflow="auto";
            },3500);


            return()=>{
                clearTimeout(timer);
                cancelAnimationFrame(animation);
                document.body.style.overflow="auto";
            };


        }
    },[]);



    if(hidden)
    return null;


    return(
        <div id="preloader"
        className="preloader"
        >
            <div className="pl-inner">

                <canvas ref={canvasRef} id="pl-canvas"/>

                <div>
                    <span className="pl-brand">
                        ODEZULUIGBO
                    </span>

                    <span className="pl-tag">
                        Ka ọ si dị na Ala Igbo
                    </span>

                    <div className="pl-bar">
                        <div className="pl-fill"></div>
                    </div>
                </div>

            </div>

        </div>
    )

}