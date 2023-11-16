import React, { useEffect, useState, useCallback } from 'react';
import MultiItemCarousel from "./MultiItemCarousel";
import Modal from "./Modal";
import SearchMovies from './SearchMovies';

export default function Main(props){
    
    // State to hold the current screen size
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    /* Set state to saved fetch movies */
    const image_base_url = 'https://image.tmdb.org/t/p/w500';

    //track both the page and movies of Explore Movies 
    const exploreMovies_API = 'https://api.themoviedb.org/3/discover/movie?api_key=';
    const [exlporeMovieList,setExploreMovieList] = useState([]); 

    //use this for all classes of movies so if i scroll until page 2 of explore movies  then there will be 2 pages of trending movies also...
    const [exploreMovieCurrentPage, setExploreMovieCurrentPage] = useState(1); // To track the explore movies current page

    //track both the page and movies of Trending Movies 
    const trendingMovies_API = 'https://api.themoviedb.org/3/trending/all/week?api_key=';
    const [trendingMovieList,setTrendingMovieList] = useState([]); 

    //track both the page and movies of Top Rated Movies 
    const topRatedMovies_API = 'https://api.themoviedb.org/3/movie/top_rated?api_key=';
    const[topRatedMovieList,setTopRatedMovieList] = useState([]);

    //track both the page and movies of Top Rated Movies 
    const actionMovies_API = 'https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=';
    const[actionMovieList,setActionMovieList] = useState([]);

    //track both the page and movies of Top Rated Movies 
    const comedyMovies_API = 'https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=';
    const[comedyMovieList,setComedyMovieList] = useState([]);

    //check if current movie
    const[currentMovie,setCurrentMovie] = useState({});

    //variable to use for opening and closing modal
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //boolean to check if trailer plays or not
    const [trailerIsPlaying,setTrailerIsPlaying] = useState(false);


    //state to save the movie id that is like
    const[likedMoviesId,setLikeMoviesId] = useState([]) 


    useEffect(() => {
        // Retrieve array from localStorage when component mounts
        const storedArray = localStorage.getItem('likedMoviesId');
        
        if (storedArray) {
          // Parse the retrieved JSON string into an array
            const parsedArray = JSON.parse(storedArray);
            setLikeMoviesId(parsedArray);
        }
    }, []);
    

    const saveMovieIdToLocalStorage = (movieId) =>{

        if(likedMoviesId.includes(movieId)) {
            const updateItems = likedMoviesId.filter( itemID => itemID !== movieId)
            setLikeMoviesId(updateItems);
            return;
        };
        
        // Create a new array by spreading the existing array and adding the new item
        const updatedArray = [...likedMoviesId, movieId];

        // Update localStorage with the updated array
        localStorage.setItem('likedMoviesId', JSON.stringify(updatedArray));

        // Update state with the new array
        setLikeMoviesId(updatedArray);

    }

    //function to play
    const playTrailer = () =>{
        setTrailerIsPlaying(prev => !prev);
    }

    //function to open modal
    const openModal = () => {
        setModalIsOpen(prevState => !prevState);
    };

    //function to close modal
    const closeModal = () => {
        setModalIsOpen(prevState => !prevState);
        setCurrentMovie({});
        setTrailerIsPlaying(false);
    };

    
    //function to fetch movies by Id
    const fetchMoviesById = useCallback( async (movieId = 2) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${props.api_key}&append_to_response=videos`);
            
            if(!response.ok){
                throw new Error("Network response was not ok")
            }

            const data = await response.json()
            setCurrentMovie(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    },[props.api_key]);

    useEffect(() => {
            fetchMoviesById();
    },[fetchMoviesById])
    

    useEffect(() => {

        const fetchMovies = async (setMovieList,currentPage,api) =>{
            /* Fetch movies */
            try {
                const response = await fetch(`${api}${props.api_key}&page=${currentPage}`)
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                const newMovies = data.results;
                // Update the movies state with the new results

                if(currentPage === 1){
                    setMovieList(newMovies)
                }else{
                    setMovieList((prevMovies) => [...prevMovies, ...newMovies]);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
    
        }
        fetchMovies(setExploreMovieList,exploreMovieCurrentPage,exploreMovies_API);
        fetchMovies(setTrendingMovieList,exploreMovieCurrentPage,trendingMovies_API);
        fetchMovies(setTopRatedMovieList,exploreMovieCurrentPage,topRatedMovies_API);
        fetchMovies(setActionMovieList,exploreMovieCurrentPage,actionMovies_API);
        fetchMovies(setComedyMovieList,exploreMovieCurrentPage,comedyMovies_API);
    }, [exploreMovieCurrentPage,props.api_key]);

    let slidesToScrollAndShow = '';
    
    if(screenSize >= 1536){
        slidesToScrollAndShow = 6;
    }else if(screenSize >= 1280){
        slidesToScrollAndShow = 5;
    }else if(screenSize >= 1024){
        slidesToScrollAndShow = 4;
    } else if(screenSize >= 768 ){
        slidesToScrollAndShow = 3;
    }else if (screenSize < 768 ){
        slidesToScrollAndShow = 2;
    } 

    // Handle loading more movies when the user is close to the end
    const handleOnSwipe = (currentSlide) => {
        //add slidesToScroll to the currentSlide to keep track of items being scrolled 
        //deduct slidesToScroll on the movieList.length to trigger fetch function before reaching the last slide 

        const lastMovieIndex = exlporeMovieList.length - slidesToScrollAndShow; 
        if ((currentSlide + slidesToScrollAndShow) >= lastMovieIndex) {
            //Fetch the next page when user is close to the end

            if(exploreMovieCurrentPage === 2){
                //limit only user to 40 movies per movie class
                return;
            }

            setExploreMovieCurrentPage(exploreMovieCurrentPage + 1);
            

        }
    };

    // Event listener callback function
    function handleResize() {
        setScreenSize(window.innerWidth);
        // Update state or perform actions based on the screen size
    }

    useEffect(() => {
        // Add the resize event listener when the component mounts
        window.addEventListener('resize', handleResize);
    
        // Clean up by removing the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return(
        <div>
            

            {props.input !== "" && 
                <div>
                    <SearchMovies 
                    movies={props.movies}
                    image_base_url={image_base_url}
                    input={props.input}
                    openModal={openModal}
                    fetchMoviesById={fetchMoviesById}
                    playTrailer={playTrailer}
                    /> 
                </div>
            }

            {props.input === "" && 
            <div className='min-h-screen'>
                <MultiItemCarousel 
                    handleOnSwipe={handleOnSwipe} 
                    slidesToScrollAndShow ={slidesToScrollAndShow} 
                    image_base_url={image_base_url} 
                    movies={exlporeMovieList}  
                    movieClass="Explore Movies"
                    openModal={openModal}
                    fetchMoviesById={fetchMoviesById}
                    playTrailer={playTrailer}
                    saveMovieIdToLocalStorage={saveMovieIdToLocalStorage}
                    likedMoviesId={likedMoviesId}
                />
                <MultiItemCarousel 
                    handleOnSwipe={handleOnSwipe} 
                    slidesToScrollAndShow ={slidesToScrollAndShow} 
                    image_base_url={image_base_url} 
                    movies={trendingMovieList}  
                    movieClass="Trending Now"
                    openModal={openModal}
                    fetchMoviesById={fetchMoviesById}
                    playTrailer={playTrailer}
                    saveMovieIdToLocalStorage={saveMovieIdToLocalStorage}
                    likedMoviesId={likedMoviesId}
                />
                <MultiItemCarousel 
                    handleOnSwipe={handleOnSwipe} 
                    slidesToScrollAndShow ={slidesToScrollAndShow} 
                    image_base_url={image_base_url} 
                    movies={topRatedMovieList}  
                    movieClass="Top Rated"
                    openModal={openModal}
                    fetchMoviesById={fetchMoviesById}
                    playTrailer={playTrailer}
                    saveMovieIdToLocalStorage={saveMovieIdToLocalStorage}
                    likedMoviesId={likedMoviesId}
                />
                <MultiItemCarousel 
                    handleOnSwipe={handleOnSwipe} 
                    slidesToScrollAndShow ={slidesToScrollAndShow} 
                    image_base_url={image_base_url} 
                    movies={actionMovieList}  
                    movieClass="Action Movies"
                    openModal={openModal}
                    fetchMoviesById={fetchMoviesById}
                    playTrailer={playTrailer}
                    saveMovieIdToLocalStorage={saveMovieIdToLocalStorage}
                    likedMoviesId={likedMoviesId}
                />
                <MultiItemCarousel 
                    handleOnSwipe={handleOnSwipe} 
                    slidesToScrollAndShow ={slidesToScrollAndShow} 
                    image_base_url={image_base_url} 
                    movies={comedyMovieList}  
                    movieClass="Comedy"
                    openModal={openModal}
                    fetchMoviesById={fetchMoviesById}
                    playTrailer={playTrailer}
                    saveMovieIdToLocalStorage={saveMovieIdToLocalStorage}
                    likedMoviesId={likedMoviesId}
                /> 
            </div>
        }     

        <Modal 
            currentSelectedMovie={currentMovie}
            image_base_url={image_base_url}
            closeModal={closeModal}
            modalIsOpen={modalIsOpen}
            api_key={props.api_key}
            movieId={currentMovie.id}
            videos={currentMovie.videos?.results}
            screenSize={screenSize}
            isTrailerPlaying={trailerIsPlaying}
            />    
            
        </div>
    )
}