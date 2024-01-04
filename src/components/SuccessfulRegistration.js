import React from "react"


const SuccessfulRegistrationAlert = (props) =>{

    return (
        <div className="w-full h-full absolute top-0 left-0 bg-bg-opa70 flex justify-center items-center font-poppins text-black rounded px-5">
            <div className="px-10 py-16 text-center border-2 bg-white relative">
                <p className="p-5 w-24 h-24 rounded-full bg-green-500 mx-auto absolute top-0 left-2/4 -translate-x-2/4 -translate-y-2/4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </p>
                <h5 className="mb-8 text-3xl font-bold mt-8">Success</h5>
                <p className="mb-8">
                    Congratualation, your account has been successfully created.
                </p>
                <button onClick={() => {props.toggleLoginAndSignUpForm();props.toggleSuccessfulMessage()}} className="bg-green-500 py-3 px-12 rounded text-white">Continue</button>
            </div>
        </div>
    )
}

export default SuccessfulRegistrationAlert;