import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

function LoginWithFacebook(props){
    const responseFacebook = (response) => {
        console.log("response");
        props.methods.email(response.email);
        props.methods.faceID(response.id);
        props.methods.logMethod("facebook");
        props.methods.name(response.name);
        props.methods.submit();
    }

    const componentClicked = (e) => {
        console.log("com clicked.")
    }

    return(

        <FacebookLogin
            appId="614250152549427"
            autoLoad
            callback={responseFacebook}
            onClick={componentClicked}
            fields="name,email"
            render={renderProps => (
                <button type="btton" onClick={renderProps.onClick} className="btn btn-block bg-info text-white">
                    Login with <FontAwesomeIcon icon={faFacebook}/> ?
                </button>
            )}
        />
    )
}

export default LoginWithFacebook;