import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

Modal.setAppElement('#root');
export default function MyModal(props) {
    
    const [cast,setCast] = useState([]);
        
    const customStyles = {
        content:{
            maxWidth:'800px',
            height:'97vh',
            margin:'auto',
            padding: '0',
            left: '5%',
            right: '5%',
            backgroundColor:'#333333'
                    
        },
        overlay:{
            backgroundColor:'rgba(0,0,0,.70)',
        }
    };

    
    let slidesToScrollAndShow = 2;
    
    if (props.screenSize >= 640 ){
        slidesToScrollAndShow = 4;
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToScrollAndShow, 
        slidesToScroll: slidesToScrollAndShow, 
    };

    let genres = (props.currentSelectedMovie.genres ? props.currentSelectedMovie.genres.map(genre => ` ${genre.name} `) : "");
    let editGenres = (props.currentSelectedMovie.genres ? genres.map(genre => <button key={genre} className='mb-3 pointer-events-none border-0 outline-none bg-[#DA4167] px-5 py-3 mr-2 rounded-md'>{genre}</button> ) : "" )
    let year = (props.currentSelectedMovie.release_date ? new Date(props.currentSelectedMovie.release_date).getFullYear() : "");


    //use loop to get the video of a type:trailer and official:true
    let videoKey = "";
    if(props.videos){
        for (let i = 0; i < props.videos.length; i++) {
            const video = props.videos[i];
            if(video.type === "Trailer" ){
                videoKey = video.key;
                break;
            }
        }
    }

    useEffect(() => {
    
        const fetchCast = async () => {
                try {
                    
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${props.movieId}/credits?api_key=${props.api_key}`)
    
                    if(!response.ok){
                        throw new Error("Network response was not ok")
                    }
    
                    const data = await response.json();
                    setCast(data.cast)
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                }
        }
            if(props.movieId){
                fetchCast();
            }

    }, [props.api_key,props.movieId])


    //get only the first 10 cast
    const castImages = cast.map( actor => {
        return (<div key={actor} className='px-2'>
                    <img className='h-[10rem] w-full rounded-md' src={`${props.image_base_url}${actor.profile_path}`} alt={`${actor.original_name}`} />
                    <p className='text-center' > {actor.original_name} </p>
                    <p className='mb-3 text-center' >({actor.character})</p>
                </div>)
    })
    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={() => {props.closeModal()} }
            contentLabel="Movie Information Modal"
            style={customStyles}
            
        >
            <div className={`${props.screenSize < 640 ? 'h-2/6' : 'h-3/6'}`}> 
                {props.currentSelectedMovie.poster_path && <iframe
                    className='w-full h-full'
                    title="YouTube Video"
                    src={`https://www.youtube.com/embed/${videoKey}${props.isTrailerPlaying ? "?autoplay=1" : ""}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen 
                    
                ></iframe>}
            </div>
            <div className='h-3/6 flex flex-col text-sm font-inter text-white px-2 py-4 font-light'>
                <div>
                    <h2 className='text-lg  font-bold mb-3'>{props.currentSelectedMovie.title} <span className='text-sm font-light'>( {year} )</span></h2>
                    <p className='mb-3'>
                    <svg className='inline-block align-bottom  mr-1' width="25" height="25" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.2948 35.8841L14.0647 41.6347C13.8489 41.7693 13.599 41.8355 13.3465 41.8251C13.094 41.8146 12.8502 41.7279 12.6457 41.5758C12.4411 41.4237 12.2851 41.2131 12.1972 40.9704C12.1092 40.7277 12.0933 40.4638 12.1514 40.2119L14.6387 29.4406L6.44555 22.2254C6.25403 22.0566 6.11551 21.8335 6.04742 21.5843C5.97932 21.335 5.98468 21.0707 6.06282 20.8246C6.14096 20.5785 6.2884 20.3615 6.4866 20.201C6.68479 20.0404 6.9249 19.9435 7.17672 19.9224L17.9443 19.0177L22.1127 8.8064C22.2101 8.56754 22.3744 8.36353 22.5847 8.22005C22.795 8.07656 23.0421 8 23.2948 8C23.5476 8 23.7946 8.07656 24.005 8.22005C24.2153 8.36353 24.3796 8.56754 24.477 8.8064L28.6453 19.0177L39.413 19.9224C39.6646 19.9438 39.9045 20.041 40.1025 20.2016C40.3004 20.3623 40.4476 20.5792 40.5256 20.8253C40.6035 21.0714 40.6087 21.3356 40.5406 21.5847C40.4724 21.8338 40.3339 22.0567 40.1424 22.2254L31.951 29.4406L34.4383 40.2119C34.4964 40.4638 34.4805 40.7277 34.3925 40.9704C34.3046 41.2131 34.1485 41.4237 33.944 41.5758C33.7395 41.7279 33.4957 41.8146 33.2432 41.8251C32.9907 41.8355 32.7408 41.7693 32.525 41.6347L23.2948 35.8841Z" fill="#FFA534"/>
                    </svg>
                        <span>{(props.currentSelectedMovie.vote_average ? props.currentSelectedMovie.vote_average.toFixed(1) : "" )}</span>
                    </p>
                    <p className='mb-3 border-2 border-[#DA4167] p-3 rounded-md'>{props.currentSelectedMovie.overview}</p>
                </div>
                <div>
                    <p className='mb-3 text-center'>{editGenres}</p>
                </div>
                <div className='px-5'>
                    <Slider {...settings}>
                            {castImages}
                    </Slider>
                </div>
                
            </div>
            
        </Modal>
    );
}

