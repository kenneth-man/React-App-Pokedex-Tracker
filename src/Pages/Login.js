import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context';
import ButtonStandard from '../Components/ButtonStandard';
import LinkStandard from '../Components/LinkStandard';
import Input from '../Components/Input';
import Page from '../Components/Page';
import Column from '../Components/Column';
import Loading from '../Components/Loading';
import BackgroundImage from '../Res/Images/background2.jpg';
import { ReactComponent as GoogleIcon } from '../Res/Icons/google3.svg';
import { ReactComponent as EmailIcon } from '../Res/Icons/paper-plane-o.svg';
import Logo from '../Res/Images/logo.png';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const { auth, loginWithGoogle, isLoading, setIsLoading } = useContext(Context);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const clearInputs = () => {
        setLoginEmail('');
        setLoginPassword('');
    }

    //login account with email and password
    const loginAccountOnSubmit = async eventObj => {
        eventObj.preventDefault();

        if(!loginEmail || !loginPassword){
            alert('Missing Login Input Value');
            clearInputs();
            return;
        }
        
        try {
            setIsLoading(true);

            //triggers 'onAuthStateChanged' to run in context and App.js
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

            setIsLoading(false);
        } catch(error){
            setLoginError({ code: error.code, message: error.message });
        }
    }

    useEffect(() => {
        if(loginError){
            alert(`Error Message: ${loginError.message}, Code: ${loginError.code}`);
            clearInputs();
            setIsLoading(false);
        }

        return setIsLoading(false);
    }, [loginError])

    return (
        <Page backgroundImg={BackgroundImage} extraClasses='bg-cover justify-evenly'>
            {
                isLoading ?
                <Loading extraClasses='text-white'/> :
                <Column extraClasses='space-y-14'>
                    <img src={Logo} alt='logo'/>

                    <Column extraClasses='p-8 rounded-3xl space-y-8 bg-white/30 border-solid border border-white/60'>
                        <h1 className='italic text-white'>Log In/Register using a pre-existing Google Account</h1>
                        <ButtonStandard func={loginWithGoogle} row={true}>
                            Log In with Google
                            &nbsp;
                            <GoogleIcon/>
                        </ButtonStandard>
                    </Column>

                    <h1 className='font-black italic text-white'>&ndash; &nbsp; OR &nbsp; &ndash;</h1>

                    <Column extraClasses='p-8 rounded-3xl space-y-8 bg-white/30 border-solid border border-white/60'>
                        <h1 className='italic text-white'>Log In using Email and Password</h1>
                        <form onSubmit={e => loginAccountOnSubmit(e)} className='flex flex-col items-center space-y-8'>
                            <Input 
                                type='text'
                                state={loginEmail}
                                setState={setLoginEmail}
                                placeHolder='Please type in your email address...'
                            />

                            <Input 
                                type='password'
                                state={loginPassword}
                                setState={setLoginPassword}
                                placeHolder='Please type in your password...'
                            />

                            <ButtonStandard type='submit' row={true}>
                                Log In with Email
                                &nbsp;
                                <EmailIcon/>
                            </ButtonStandard>
                        </form>
                    </Column>

                    <LinkStandard path='/Register' extraClasses='text-white'>Don't have an account? Create one here...</LinkStandard>
                </Column>
            }
        </Page>
    )
}

export default Login;