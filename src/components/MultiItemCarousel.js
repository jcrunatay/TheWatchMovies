import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './../custom.css';
import Card from "./Cards";


export default function MultiItemCarousel(props){

    const NextButton = (props) => (
        <button
            className="absolute top-2/4 -right-3 -2 z-50 -translate-y-2/4 h-full bg-bg-opa70 slider-button"
            onClick={props.onClick}
        >
        <svg className="w-5 h-5 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <path d="M9.92896 4.85785L16.2929 11.2218C16.6834 11.6123 16.6834 12.2455 16.2929 12.636L9.92896 19" stroke="#DA4167" strokeLinecap="round"/> </g>
        </svg>
        </button>
    );
    
    const PrevButton = (props) => (
        <button
        className="absolute top-2/4 -left-3 z-50 -translate-y-2/4  h-full bg-bg-opa70 slider-button"  
        onClick={props.onClick}
        >
        <svg className="w-5 h-5 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <path d="M14.071 5L7.70708 11.364C7.31656 11.7545 7.31656 12.3877 7.70708 12.7782L14.071 19.1421" stroke="#DA4167" strokeLinecap="round"/> </g>
        </svg>
        </button>
    );  

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: props.slidesToScrollAndShow, 
        slidesToScroll: props.slidesToScrollAndShow, 
        nextArrow: <NextButton />, // Use the custom "Next" button component
        prevArrow: <PrevButton />, // Use the  
    };

    /* loop to all movies */  
    const allMoviesPoster = props.movies.map(movie => {
        return <Card image_base_url={props.image_base_url} 
                        poster={movie.poster_path}
                        id={movie.id}
                        key={movie.id}
                        rating={movie.vote_average}
                        openModal={props.openModal}
                        fetchMoviesById={props.fetchMoviesById}
                        playTrailer={props.playTrailer}
                        saveMovieIdToLocalStorage={props.saveMovieIdToLocalStorage}
                        likedMoviesId={props.likedMoviesId}
                        />
    });

    return (
    <div className="p-2 lg:px-10">
        <h2 className="font-semibold text-base my-2 ms-1 md:text-lg md:mt-10 xl:text-2xl xl:mt-12 xl:mb-2">{props.movieClass}</h2>
        <Slider className="slider-parent relative w-100 m-auto" {...settings} afterChange={props.handleOnSwipe}>
            {allMoviesPoster}
        </Slider>
        
    </div>
    );
};

