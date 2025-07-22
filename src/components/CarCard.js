import React from 'react';

const CarCard = ({ car }) => {
    return (
        <div className="card-bg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src={car.img} alt={car.name} className="w-full h-56 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/1F2937/FFFFFF?text=Image+Error'; }} />
            <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{car.name}</h3>
                <p className="text-indigo-400 font-semibold">{car.year} - {car.type}</p>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-gray-400 text-sm">Starting at</p>
                        <p className="text-xl font-bold text-white">{car.price}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Power</p>
                        <p className="text-xl font-bold text-white">{car.hp}</p>
                    </div>
                </div>
                <button className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-500 transition-colors duration-300">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default CarCard;