import React, { useState } from 'react'
import loginIcon from '../assets/arrow.png';
import visibleIcon from '../assets/visible-password.png';
import invisibleIcon from '../assets/invisible-password.png';
import { useForm } from "react-hook-form";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useHistory } from 'react-router';
import { CustomModal } from './CustomModal';

export const SingUpForm = ({setVisibleLogin}) => {
    const [displayWarningModal,setDisplayWarningModal] = useState(false)
    const [errorMsg,setErrorMsg] =useState("");
    const [user, setUser] = useLocalStorage("user");
    const history = useHistory();
    const [visiblePassword, setVisiblePassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();//inputtaki değerleri okuma
    const onSubmit = (data) => {
        if(data.parolaCheck===data.parola){
            console.log("Basarili");
        }
        else{
            
            setDisplayWarningModal(true)
            setErrorMsg("Parolalar ayni degil")
        }

    }
        

    return (
        <>
        <CustomModal
            displayModal={displayWarningModal}
            onCancel={()=>setDisplayWarningModal(false)}
            type="warning"
        >{errorMsg}</CustomModal>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-element">
                <input
                    {...register("name", {
                        required: {
                            value: true,
                            message: 'Kullanıcı adı gereklidir',
                        },
                        minLength: {
                            value: 6,
                            message: "Kullanici adi 6 karakterden az olamaz",
                        },
                        maxLength: {
                            value: 10,
                            message: "Kullanici adi 10 karakterden fazla olamaz",
                        },
                    })}
                    placeholder='Kullanici Adi'
                    type="text"
                />
                <span>{errors?.name?.message}</span>
            </div>
            <div className='form-element'>
                <input
                    {...register("parola", {
                        required: { value: true, message: "Bu alan gereklidir" },

                    })}
                    placeholder='Parola'
                    type={visiblePassword ? 'text' : 'password'}
                />
                <span>{errors?.parola?.message}</span>

                {visiblePassword ? (
                    <img
                        onClick={() => setVisiblePassword(false)}
                        src={invisibleIcon}
                        alt="visible-password" />) : (<img onClick={() => setVisiblePassword(true)} src={visibleIcon} alt="visible-password" />)}
            </div>
            <div className='form-element'>
                <input
                    {...register("parolaCheck", {
                        required: { value: true, message: "Bu alan gereklidir" },

                    })}
                    placeholder='Parola'
                    type={visiblePassword ? 'text' : 'password'}
                />
                <span>{errors?.parolaCheck?.message}</span>

                {visiblePassword ? (
                    <img
                        onClick={() => setVisiblePassword(false)}
                        src={invisibleIcon}
                        alt="visible-password" />) : (<img onClick={() => setVisiblePassword(true)} src={visibleIcon} alt="visible-password" />)}
            </div>
            <div className='form-element form-element-submit'>
                <button><img src={loginIcon} alt="login-btn-icon" /></button>
            </div>
        </form>
        <div className='sign-up-info'>Üyeliğin var mı  giriş yap?</div>
        <div className='sign-up-btn-container'>
            <button onClick={() => setVisibleLogin(true)}>Giriş Yap</button>
        </div>
        </>
    )
}
