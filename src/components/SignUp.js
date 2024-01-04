import React, {useState, useEffect} from 'react';
import CRUDComponent from '../services/CrudComponent';
import getCurrentFormattedDate from '../util/getDate';
import {validateUsernameAndPassword, validateEmail, passwordAndConmfirmPasswordMatched, duplicateValidator } from './../util/formValidation';
import SuccessfulRegistrationAlert from './SuccessfulRegistration'
import FormInputBox from './FormInputBox';

export default function SignUp(props){   
    
    console.log("SignUp.js running")

    const crud = CRUDComponent();
    const [usersEmailList,setUsersEmailList] = useState([]);
    const [usersUsernameList,setUsersUsernameList] = useState([]);
    const [successfulMessage,setSuccessfulMessage] = useState(false);

    const toggleSuccessfulMessage = () => {
        setSuccessfulMessage(prev => !prev);
    }

    useEffect(() => {

        console.log("UseEffect Has Been used")

        const getAllEmail = async () => {

            const allUsers = await crud.fetchData();
    
            const allEmail = allUsers.map(user => user.email);
    
            setUsersEmailList(allEmail);
        }

        const getAllUsername = async () => {

            const allUsers = await crud.fetchData();
    
            const allUsername = allUsers.map(user => user.username);
            
    
            setUsersUsernameList(allUsername);
            
        }

        getAllUsername();
        getAllEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //handle the form submission
    const handleSubmit = (e) => {

        e.preventDefault();

        /* Validations returns boolean */
    
        // Validate username // 
        const username = validateUsernameAndPassword(props?.formData.username, 'Username', 'errorUsername',props?.setErrorMessages);
    
        // Validate password
        const password = validateUsernameAndPassword(props.formData.password, 'Password', 'errorPassword', props?.setErrorMessages);

         //Check if passwords matched
        const passwordMatched = passwordAndConmfirmPasswordMatched(props.formData.password,props.formData.confirmpassword,'errorConfirmPassword',props?.setErrorMessages);
        
        //Validate Email
        const email = validateEmail(props.formData.email,'errorEmail',props.errorMessages,props.setErrorMessages);

        //Check for email duplicate 
        const emailIsNotDuplicated = duplicateValidator(props.formData.email,usersEmailList,"Email","errorEmail",props.errorMessages,props.setErrorMessages)

        //Check for username duplicate 
        const usernameIsNotDuplicated = duplicateValidator(props.formData.username,usersUsernameList,"Username","errorUsername",props.errorMessages,props.setErrorMessages);

        //Check if all inputs are valid then add to firestore database
        if(username && password && email && passwordMatched && emailIsNotDuplicated && usernameIsNotDuplicated){

            //add data to database
            crud.addData(props.formData,getCurrentFormattedDate(),setUsersUsernameList,setUsersEmailList,setSuccessfulMessage);

            props.resetFormRelatedState();

            console.log("succesfully added")
            return;
        }

        console.log("failed to add")
        return; 
        
    }

    const arrFormDataKeys  = Object.keys(props.formData);
    const arrErrorMessagesKeys  = Object.keys(props.errorMessages);
    const arrShowLabels = Object.values(props.showLabels);
    const inputTypeInOrder = ['text', 'password', 'password', 'text'];
    let arrFormInputBox = [];
    
    //use for loop to integrate all the the properties of the FormInputComponent
    for (let i = 0; i < arrFormDataKeys.length; i++) {
        arrFormInputBox.push(
            <FormInputBox 
                key={arrFormDataKeys[i]}
                handleInputChange={props.handleInputChange}
                value={props.formData[arrFormDataKeys[i]]}
                showLabel={arrShowLabels[i]}
                errorMessage={props.errorMessages[arrErrorMessagesKeys[i]]}
                name={arrFormDataKeys[i]}
                placeholder={arrFormDataKeys[i].charAt(0).toUpperCase() + arrFormDataKeys[i].slice(1)}
                type={ inputTypeInOrder[i] === 'text' ? 'text' : 'password' }
                forSignUp={true}
            />
        )
    }
    
    return(
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 ">
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col justify-center bg-stone-900 px-[10%] pb-24 pt-16 rounded-md font-poppins h-screen w-screen sm:max-w-md sm:h-auto">
                <h2 className='text-center mb-5 text-3xl font-medium sm:text-4xl text-redtheme'>Sign up</h2>

                {/* Display the Input Box */}
                {arrFormInputBox}

                <button type='submit' name='signin' id='signin' className=' bg-slate-200 h-[50px] transition-all duration-500 ease-out mb-8 text-black rounded active:bg-redtheme hover:bg-redtheme'>Submit</button>
                <p className='text-sm sm:text-base'>Already have an account ? <button onClick={props.toggleLoginAndSignUpForm} type='button' className='border-b-[1px] border-redtheme text-redtheme bg-transparent outline-none border-0'>Signin now</button></p>
            </form>
            
            {successfulMessage && <SuccessfulRegistrationAlert 
            toggleSuccessfulMessage={toggleSuccessfulMessage} 
            toggleLoginAndSignUpForm={props.toggleLoginAndSignUpForm}/>}
        </div>
    )
}