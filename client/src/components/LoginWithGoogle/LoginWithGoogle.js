import React from 'react';
import axios from '../../axios';

import GoogleLogin from "react-google-login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


function LoginWithGoogle(props){

    const responseGoogle = (response) => {
        let name, email, loginMethod, googleID;
        if(!response.profileObj.name || !response.profileObj.email || !response.profileObj.googleId ){
            props.methods.setError("Not all data fetched, please try again.");
        } else {
            axios
            .post('teacher/login', { 
                loginMethod: "google", 
                email: response.profileObj.email, 
                googleID: response.profileObj.googleId, 
                name: response.profileObj.name 
            })
            .then((result) => {
              localStorage.setItem('teacherToken', result.data.token);
              props.history.push('/teacher');
            })
            .catch((err) => {
              console.log(err);
              props.methods.setError('invalid credentials');
            });
        }
        // console.log(response.googleId);
        // console.log(response.profileObj.googleId);
        // console.log(response.profileObj.name);
        // console.log(response.name);
    }
    
    
    return(
        <GoogleLogin
            clientId="390877866960-void1lahpj20sbakpdkl3r612mrg7eb5.apps.googleusercontent.com"
            autoLoad={false}
            render={renderProps => (
                <button type="button" onClick={renderProps.onClick} className="btn btn-block bg-danger text-white">
                    Login with <FontAwesomeIcon icon={faGoogle}/>
                </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default LoginWithGoogle;