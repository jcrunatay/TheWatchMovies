import React from 'react'
import Card from './Cards'


function SearchMovies(props) {
    const allSearchedMovies = props.movies.map(movie => {
        if(movie.backdrop_path == null || movie.poster_path == null){
            return "";
        }
        return  <Card 
                    key={movie.id}
                    id={movie.id}
                    image_base_url={props.image_base_url} 
                    poster={movie.poster_path} 
                    original_title={movie.original_title}
                    rating={movie.vote_average}
                    openModal={props.openModal}
                    fetchMoviesById={props.fetchMoviesById}
                    playTrailer={props.playTrailer}

                />
    })

    return (
        <div className='relative grid grid-cols-2 px-5 gap-x-3 gap-y-5 mt-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-y-20 lg:p-10 min-h-screen'>
            {allSearchedMovies.length === 0 ? 
            <div className='absolute top-0 left-0 w-full text-xl text-center'>Can not find movie with a title of {props.input}</div> 
            : 
            allSearchedMovies
            }
        </div>
    )
}

export default SearchMovies