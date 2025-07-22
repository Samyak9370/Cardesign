import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarModelViewer from './components/CarModelViewer';
import CarCard from './components/CarCard';
import { carData } from './data/carData';

function App() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.fade-in').forEach(elem => {
            gsap.fromTo(elem, 
                { autoAlpha: 0, y: 50 }, 
                { 
                    autoAlpha: 1, 
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }, []);

    return (
        <>
            <CarModelViewer />
            
            <div className="relative z-10">
                {/* Header */}
                <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-center">
                    <h1 className="text-3xl font-black tracking-wider text-white">PRESTIGE</h1>
                    <nav className="hidden md:flex space-x-8 text-lg font-medium">
                        <a href="#" className="hover:text-indigo-400 transition-colors">Models</a>
                        <a href="#" className="hover:text-indigo-400 transition-colors">Electric</a>
                        <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="h-screen flex flex-col justify-center items-start p-8 md:p-20 content-section">
                    <div className="max-w-md">
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight fade-in">
                            Engineering the Future of Motion.
                        </h2>
                        <p className="mt-6 text-xl text-gray-300 fade-in">
                            Experience unparalleled performance and cutting-edge design. Your journey starts here.
                        </p>
                    </div>
                </section>

                {/* Featured Models Section */}
                <section className="py-20 px-8 md:px-20 content-section">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white fade-in">Featured Models</h2>
                        <p className="mt-4 text-lg text-gray-400 fade-in">Discover our curated collection of high-performance vehicles.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {carData.map(car => (
                            <div className="fade-in" key={car.id}>
                                <CarCard car={car} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center py-10 text-gray-500 content-section">
                    <p>&copy; {new Date().getFullYear()} Prestige Motors. All Rights Reserved.</p>
                    <p>A demonstration of React, GSAP, and Three.js.</p>
                </footer>
            </div>
        </>
    );
}

export default App;