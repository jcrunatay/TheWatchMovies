import React from "react";

const FormInputBox = (props) =>{

    return(
        <>
            <div className={`bg-transparent  border-b-2 border-yellowtheme relative flex flex-col h-[50px] justify-end items-center ${!props.forSignUp && 'mb-8'}`}>
                <label 
                htmlFor={props.name} 
                className={`text-redtheme font-medium text-xs absolute left-0 transition-all duration-500 ease-out  ${props.showLabel ? 'pointer-events-auto opacity-100 top-1' : 'pointer-events-none opacity-0 top-2/4' }`}>{props.placeholder}</label>
                <input 
                    type={props.type}
                    onChange={props.handleInputChange} 
                    name={props.name} 
                    id={props.name}  
                    className="mb-1 outline-none border-0 w-full bg-transparent text-white text-sm sm:text-base" 
                    placeholder={props.placeholder} 
                    value={props.value}
                    required
                />
            </div>
            { props.forSignUp && <p className={`py-1 mb-2 text-xs text-red-500 font-light min-h-[26px] ${props.errorMessage? "opacity-100" : "opacity-0"}`}>{`${props.errorMessage?? props.errorMessage}`}</p>}
        </>
    )

}


export default FormInputBox;