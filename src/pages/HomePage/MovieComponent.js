import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`

const MovieComponent = () => {
    return (
        <MovieContainer>
            <Link to="/sessoes/1" ><img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster"/></Link>
        </MovieContainer>
    );
};

export default MovieComponent;