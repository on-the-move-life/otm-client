import React from 'react'

function NavigationClock({isSelected}) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="clock-03">
                <g id="elements">
                    <path id="Ellipse 261" d="M18.952 8.60657L21.4622 8.45376C19.6629 3.70477 14.497 0.999914 9.4604 2.34474C4.09599 3.77711 0.909631 9.26107 2.34347 14.5935C3.77731 19.926 9.28839 23.0876 14.6528 21.6553C18.6358 20.5917 21.4181 17.2946 22 13.4844" stroke={isSelected ? "#DDF988" : "#929292"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path id="Path" d="M12 8V12L14 14" stroke={isSelected ? "#DDF988" : "#929292"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </g>
        </svg>

    )
}

export default NavigationClock