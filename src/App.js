import React,{useState, useEffect} from 'react';
import Main from './components/MainContent';
import Header from './components/MyHeader';
import Footer from './components/MyFooter';

function App() {

  const[input,setInput] = useState('')
  const api_key = '7446157d40b27fe109199706d36eada6';
  const[searchedMovieList,setSearchMovieList] = useState([]);



  const handleChange = (e) => {
      setInput(e.target.value)
  }

  useEffect(() => {
      
      const fetchSearchMovies = async () => {
          try {
              const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${api_key}&page=1`)
              const response2 = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${api_key}&page=2`)
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }

              const data = await response.json();
              const data2 = await response2.json();       
              setSearchMovieList([...data.results,...data2.results]);

          } catch (error) {
              console.error('Error fetching data:', error);
          }    
      }
      fetchSearchMovies();
  },[input])

  return (
    <div className="bg-[#292727] font-inter overflow-hidden text-white min-h-screen">
      <Header handleChange={handleChange}/>
      <Main 
        input={input} 
        movies={searchedMovieList} 
        api_key={api_key}/>
      <Footer />

    </div>
  );
}

export default App;
