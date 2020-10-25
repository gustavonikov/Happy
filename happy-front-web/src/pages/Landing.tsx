import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/pages/landing.css';

import logoImg from '../images/Logo.svg';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div id="landing-page">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy Logo"/>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <div className="location">
                    <strong>João Pessoa</strong>
                    <span>Paraíba</span>
                </div>

                <Link to="/show-orphanages" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    );
}

export default Landing;
