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

const MovieComponent = (props) => {
    const { id, posterURL, title} = props
    const state = {
        "title": title,
        "url": posterURL
    }
    return (
        <MovieContainer>
            <Link to={`/sessoes/${id}`} state={state}><img src={posterURL} alt="poster" /></Link>
        </MovieContainer>
    );
};

export default MovieComponent;