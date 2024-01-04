//function to validate username and password
export const validateUsernameAndPassword = (input,inputFieldName,inputErrorName,setErrorMessages) =>{

    let errorMessage = "";
    let isValid = true;

    if (input.trim() === '') {
        errorMessage = `${inputFieldName} is required`;
        isValid = false;
    }else if (!/(?=.*[0-9])(?=.*[_!@#$%^&*])(?=.*[a-zA-Z])/.test(input)){
        errorMessage = `${inputFieldName} must contain at least one special character and one number`;
        isValid = false;

        if(input.length > 30){
            errorMessage = `${inputFieldName} must between 8 - 30 characters`;
            isValid = false;
        }

    }

    setErrorMessages(prev => ({
        ...prev,
        [inputErrorName] : errorMessage,
    }));

    return  isValid;
}

//function to validate email
export const validateEmail = (input,inputErrorName,errorMessages,setErrorMessages) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if(!regex.test(input)){
        setErrorMessages(prev => ({
            ...prev,
            [inputErrorName] : `Email address is invalid`,
        }));

        return !isValid;
    }else if(input.length > 60){
        setErrorMessages(prev => ({
            ...prev,
            [inputErrorName] : `Email address is invalid`,
        }));

        return !isValid;
    }else if(errorMessages[inputErrorName] === `Email address is invalid`){
        setErrorMessages(prev => ({
            ...prev,
            [inputErrorName] : '',
        }));
    }

    return isValid

}

 //function to check if passwords matched
export const passwordAndConmfirmPasswordMatched = (password,confirmpassword,inputErrorName,setErrorMessages) => {

    let isMatched = true;
    
    if( password !== confirmpassword ){
        setErrorMessages(prev => ({
            ...prev,
            [inputErrorName] : `Password didn't match`,
        }));
        
        return !isMatched;
    }
    setErrorMessages(prev => ({
        ...prev,
        [inputErrorName] : ``,
    }));

    return isMatched;
}

export const duplicateValidator = (newUserInfo, userInfoList,inputFieldName,inputErrorName,errorMessages,setErrorMessages) => {

    let isNotDuplicated = true;

    if(userInfoList.includes(newUserInfo)){
        setErrorMessages(prev => ({
            ...prev,
            [inputErrorName] : `${inputFieldName} is already used`
        }));

    isNotDuplicated = false;
    }else if(errorMessages[inputErrorName] === `${inputFieldName} is already used` ){
        
        setErrorMessages(prev => ({
            ...prev,
            [inputErrorName] : '',
        }));

    }
    
    return isNotDuplicated;
}



