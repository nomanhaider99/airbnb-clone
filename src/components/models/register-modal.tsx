'use client'
import React, { useCallback, useState } from 'react'
import axios from "axios"
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"
import useRegisterModal from '../hooks/useRegisterModal'
import Modal from './modal'
import Heading from '../ui/Heading'
import Input from '../ui/input'
import toast from 'react-hot-toast'
import Button from '../ui/button'
import { signIn } from 'next-auth/react'
import useLoginModal from '../hooks/useLoginModal'


const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });
    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [ loginModal, registerModal ])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data).then(() => {
            registerModal.onClose();
            toast.success("User created Succesfully!");
            loginModal.onOpen();
        }).catch((error) => {
            console.log(error);
            toast.error('Something went wrong!');
        }).finally(() => {
            setIsLoading(false);
        });
        
    }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to Airbnb'
                subTitle='Create an account!'
             />
             <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn("google")}
            />
            <Button 
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex justify-center flex-row items-center gap-2'>
                    <div>Already have an account?</div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>Login</div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal