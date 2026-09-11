'use client'

import {useEffect} from 'react';

const OZ_LOGO = "/images/logo.webp";

export default function LogoInjector () {
    useEffect(() => {
        const imgs = document.querySelectorAll<HTMLImageElement>(
            '.logo-mark, #hero-logo-watermark img'
        );
        imgs.forEach((img) => {
            img.src = OZ_LOGO;
        });
    }, []);

    return null;
}