
import FormInputBox from "./FormInputBox"
import CRUDComponent from '../services/CrudComponent';


export default function Login(props){    
    const crud = CRUDComponent();


    const handleUserLogin  = async (e) => {
        
        e.preventDefault();
        crud.handleLogin(props.formData.username,props.formData.password,props.toggleSession,props.setLoginErrorMesage,props.setCurrentUser,props.resetFormRelatedState);

    }


    const arrFormDataKeys  = Object.keys(props.formData);
    const arrErrorMessagesKeys  = Object.keys(props.errorMessages);
    const arrShowLabels = Object.values(props.showLabels);
    const inputTypeInOrder = ['text', 'password'];
    let arrFormInputBox = [];

    //use for loop to integrate all the the properties of the FormInputComponent
    //Use the inputTypeInOrder length .. cause we need 2 input only for logging in  which is fopr username and password.
    for (let i = 0; i < inputTypeInOrder.length; i++) {
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
                forSignUp={false}
            />
        )
    }

    return(
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            <form onSubmit={handleUserLogin}  className="flex flex-col justify-center bg-stone-900 px-[10%] pb-24 pt-16 rounded-md font-poppins h-screen w-screen sm:max-w-md sm:h-auto">
                <h2 className='text-center mb-5 text-3xl font-medium sm:text-4xl text-redtheme'>Login</h2>
                {arrFormInputBox}
                <p className={`text-xs text-red-500 py-2 bg-red-100 text-center sm:text-sm ${props.loginErrorMesage !== '' ? 'block' : 'hidden'}`}>
                    ❌ {`${props?.loginErrorMesage}`}
                </p>
                <button type='submit' name='login' id='login' className=' bg-slate-200 h-[50px] transition-all duration-500 my-8 ease-out text-black rounded active:bg-redtheme hover:bg-redtheme'>Login</button>
                <p className='text-sm sm:text-base'>Not a member ? <button onClick={props.toggleLoginAndSignUpForm} type="button" className='border-b-[1px] border-redtheme text-redtheme bg-transparent outline-none border-0'>Signup now</button></p>

            </form>
        </div>
    )
}