import React from "react";

export default function Header(props){

    return (
        <header className="flex p-2 flex-col text-sm md:flex-row md:justify-between md:py-5 md:text-base lg:px-10">
            <img className="w-40 md:w-56" src="image/logo.png" alt="logo.png"/>
            <form className="flex items-center md:w-6/12 max-w-md justify-between self-center m-5 w-full bg-searchBar-bg p-2 text-white rounded md:m-0">
                <input 
                    className="w-full text-white bg-transparent border-0 outline-none" 
                    type="text" 
                    name="mopvieTitle" 
                    placeholder="Seach movie title" 
                    required
                    onChange={props.handleChange}/>
            </form>
        </header>
    )
}