import React from "react";

export default function Header(props){

    const avoidRefresh = (e) => {
        e.preventDefault()
    }

    return (
        <header className="flex">
            <div className=" w-full flex p-2 flex-col text-sm md:flex-row md:justify-between md:py-5 md:text-base lg:px-10 ">
                <img className="w-40 md:w-56 relative z-50" src="/movie_app/image/logo.png" alt="logo"/>
                <form onSubmit={avoidRefresh} className={`items-center md:w-6/12 max-w-md justify-between self-center m-5 w-full bg-searchBar-bg p-2 text-white rounded md:m-0 ${props.userLoggedIn ? 'flex' : 'hidden'}`}>
                    <input 
                        className="w-full text-white bg-transparent border-0 outline-none" 
                        type="text" 
                        name="mopvieTitle" 
                        placeholder="Seach movie title" 
                        required
                        onChange={props.handleChange}/>
                
                </form>
            </div>
            <div className={`w-10 h-10 self-center flex justify-center items-center relative ${props.userLoggedIn? '' : 'hidden'}`}>
                <svg onClick={props.toggleSignOutMenu} className={`cursor-pointer w-8 ${props.openSignOutMenu ? 'text-redtheme' : 'text-white'}`} fill="currentColor" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>dropdown</title> <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path> </g></svg>
                <div className={`absolute bottom-0 right-0 translate-y-full z-50 bg-zinc-900 me-1 rounded border-2 border-redtheme ${props.openSignOutMenu ? "" : "hidden"}`}>
                    <ul>
                        <li className="text-center p-5 border-b-2 border-white whitespace-nowrap">🟢 {props.currentUser}</li>
                        <li onClick={props.toggleSession} className="text-center p-5 whitespace-nowrap cursor-pointer hover:text-redtheme">Sign out</li>
                    </ul>
                </div>
            </div>
        </header>
    )
}