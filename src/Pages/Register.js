import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';
import Page from '../Components/Page';
import Loading from '../Components/Loading';
import Column from '../Components/Column';
import Input from '../Components/Input';
import ButtonStandard from '../Components/ButtonStandard';
import BackgroundImg from '../Res/Images/background1.jpg';
import { ReactComponent as EmailIcon } from '../Res/Icons/paper-plane-o.svg';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Register = () => {
    const { auth, isLoading, setIsLoading } = useContext(Context);
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
    const [registerError, setRegisterError] = useState('');
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    const navigate = useNavigate();

    const checkValidEmail = () => registerEmail.match(validEmailRegex) ? true : false;

    const checkValidPassword = () => registerPassword.length > 8 && registerPassword === registerPasswordConfirm ? true : false;

    const clearInputs = () => {
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterPasswordConfirm('');
    }

    const registerAccountOnSubmit = async eventObj => {
        eventObj.preventDefault();

        if(checkValidEmail && checkValidPassword){
            try {
                setIsLoading(true);
    
                await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    
                setIsLoading(false);
            } catch(error){
                setRegisterError({ code: error.code, message: error.message });
            }
        } 
    }

    useEffect(() => {
        if(registerError){
            clearInputs();
            alert(`Message: ${registerError.message}, code: ${registerError.code}`);
        }

        return setIsLoading(false);
    }, [registerError])

    useEffect(() => 
        onAuthStateChanged(auth, async user => {
            if(user){
                navigate('/');
            } 
        })
    , [])

    return (
        <Page backgroundImg={BackgroundImg} extraClasses='bg-cover justify-center'>
            {
                isLoading ?
                <Loading extraClasses='text-white'/> :
                <Column extraClasses='p-8 rounded-3xl space-y-10 bg-white/30 border-solid border border-white/60'>
                    <h1 className='italic text-white'>Create your account using email and password credentials</h1>
                    <h2 className='text-white'>Please make sure your email is valid and your password is 8 characters or longer</h2>
                    <form onSubmit={e => registerAccountOnSubmit(e)} className='flex flex-col items-center space-y-8'>
                        <Input 
                            type='text'
                            state={registerEmail}
                            setState={setRegisterEmail}
                            placeHolder='Please type in your EMAIL address...'
                        />

                        <Input 
                            type='password'
                            state={registerPassword}
                            setState={setRegisterPassword}
                            placeHolder='Please type in your PASSWORD...'
                        />

                        <Input 
                            type='password'
                            state={registerPasswordConfirm}
                            setState={setRegisterPasswordConfirm}
                            placeHolder='Please re-confirm your PASSWORD...'
                        />

                        <ButtonStandard type='submit' row={true}>
                            Create account!
                            &nbsp;
                            <EmailIcon/>
                        </ButtonStandard>
                    </form>
                </Column>
            }
        </Page>
    )
}

export default Register;