import React from 'react';

import '../styles/pages/page-404.css';
import error404Img from '../images/error-404.jpg';

function Page404() {
    return (
        <div className="page-404">
            <h2>
                Erro 404: Oops! Não foi possível encontrar a página desejada <br />
                ou ela não existe.
            </h2>
            <img src={error404Img} alt="Erro 404 imagem"/>
        </div>
    );
    
}

export default Page404;
