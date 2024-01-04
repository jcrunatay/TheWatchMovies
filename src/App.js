import React,{useState, useEffect} from 'react';
import Main from './components/MainContent';
import Header from './components/MyHeader';
import Footer from './components/MyFooter';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {

  /****** FOR MOVIES ********/
  const[input,setInput] = useState('')
  const api_key = '7446157d40b27fe109199706d36eada6';
  const[searchedMovieList,setSearchMovieList] = useState([]);
  const[currentUser,setCurrentUser] = useState('')

  /****** FOR USERS ********/
  const [userLoggedIn,setUserLoggedIn] = useState(false);
  const [openSignOutMenu,setOpenSignOutMenu] = useState(false)
  const[openLoginForm,setOpenLoginForm] = useState(true)
  const[openSignUpForm,setOpenSignUpForm] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmpassword: '',
    email: ''
  });

  const [showLabels, setShowLabels] = useState({
      username: false,
      password: false,
      confirmpassword: false,
      email: false
  });
  
  const[loginErrorMesage,setLoginErrorMesage] = useState('');

  const [errorMessages,setErrorMessages] = useState({
    errorUsername: '',
    errorPassword: '',
    errorConfirmPassword: '',
    errorEmail: ''
  });

  const toggleLoginAndSignUpForm= () => {
    setOpenLoginForm(prev => !prev);
    setOpenSignUpForm(prev => !prev);
    //if they type something before changing to sign up .. make sure to reset form
    resetFormRelatedState();
  }



  const resetFormRelatedState = () =>{

    //reset form value/input
    setFormData({
      username: '',
      password: '',
      confirmpassword: '',
      email: '',
    });

    //reset the labels when input has no current value
    setShowLabels({
        username: false,
        password: false,
        confirmpassword: false,
        email: false
    });

    //reset the labels when input has no current value
    setErrorMessages({
        errorUsername: '',
        errorPassword: '',
        errorConfirmPassword: '',
        errorEmail: ''
    });

    setOpenSignOutMenu(false);

  }

  const handleInputChange = (e) => {
      const { name, value } = e.target;

      setFormData({
          ...formData,
          [name]: value,
      });

      if (value.length > 0) {
          setShowLabels({
          ...showLabels,
          [name]: true,
          });
      } else {
          setShowLabels({
          ...showLabels,
          [name]: false,
          });
      }
  };

  const toggleSession = () => {
    setUserLoggedIn(prev => !prev);
  }

  const toggleSignOutMenu = () => {
    setOpenSignOutMenu(prev => !prev);
  }

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
  <div className="bg-[#292727] font-inter overflow-hidden text-white min-h-screen relative">

    <Header 
      handleChange={handleChange} 
      userLoggedIn={userLoggedIn}
      toggleSignOutMenu={toggleSignOutMenu}
      toggleSession={toggleSession}
      openSignOutMenu={openSignOutMenu}
      currentUser={currentUser}
    />
      {
          userLoggedIn &&
          <>
            <Main 
              input={input} 
              movies={searchedMovieList} 
              api_key={api_key}/>
            <Footer />
          </>
      }

      {
        !userLoggedIn && openSignUpForm && <SignUp 
          formData={formData} 
          setFormData={setFormData}
          showLabels={showLabels} 
          handleInputChange={handleInputChange}
          errorMessages={errorMessages}
          setShowLabels={setShowLabels}
          setErrorMessages={setErrorMessages}
          resetFormRelatedState={resetFormRelatedState}
          toggleLoginAndSignUpForm={toggleLoginAndSignUpForm}
        />
      }

      {
        !userLoggedIn && openLoginForm && <Login 
          formData={formData}
          errorMessages={errorMessages}
          showLabels={showLabels} 
          handleInputChange={handleInputChange}
          toggleSession={toggleSession}
          loginErrorMesage={loginErrorMesage}
          setLoginErrorMesage={setLoginErrorMesage}
          setCurrentUser={setCurrentUser}
          resetFormRelatedState={resetFormRelatedState}
          toggleLoginAndSignUpForm={toggleLoginAndSignUpForm}
          />
      }

      
    </div>
  );
}

export default App;
