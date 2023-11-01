import React from "react";
import axios from "axios";
import { useState } from 'react';

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Stack,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Text,
    Heading,
    Image,
    Box,
    ButtonGroup,
    useToast,
    FormHelperText,
    FormErrorMessage,
    Tooltip
  } from "@chakra-ui/react";

  function SignUp (props) {

    const [signupForm, setsignUp] = useState({
        name: '',
        email: '',
        password: '',
    })
    const succestToast = useToast({
        status: 'success',
        tittle: 'Success Sign Up',
        position: 'top',
        description: "You'll be directed to your profile soon",
        duration: 5000,
    })

    const errorToast = useToast({
        status: 'error',
        title: 'Sign Up Failed',
        posisition: 'top',
        description: "Sorry, we coudln't find your account. Make sure you already have account",
        duration: 5000,
        isClosable: true
    })

    const servererorToast = useToast({
        status: 'error',
        title: 'Sign Up Failed',
        posisition: 'top',
        description: "Sorry, we coudln't find your account. Make sure you already have account",
        duration: 5000,
        isClosable: true
    })

    function signMeUp (event){
        setTouch(false)
        axios({
            method: "POST",
            url: "/signup",
            data: {
                name: signupForm.name,
                email: signupForm.email,
                password: signupForm.password,
            }
        })
        // .then((response) => {
        //     successToast({})
        //     setTimeout(() window.location.replace("/"), 2000)
        // }).catch((error) => {
        //     if (error.response){
        //         if (error.response.status === 401){
        //             errorToast({})
        //         }
        //         else {
        //             servererorToast({})
        //         }
        //         console.log(error.response)
        //         console.log(error.response.status)
        //         console.log(error.response.headers)
        //     }
        // })
        setsignUp(({
            name: '',
            email: '',
            password: '',
        }))
    }
    const [touched, setTouch] = useState(false)
    function handleChange(event) {
        const {value, name} = event.target
        setsignUp(prevNote => ({
            ...prevNote,
            [name]: value,
        })
        )
        setTouch(true)
    }
    function valid(name) {
        return /^[A-Za-z\s]*$/.test(name)
    }
    const validName = valid(signupForm.name) && signupForm.name.length > 3
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <ButtonGroup gap='2'>
                <Button
                    onClick={onOpen}
                    shadow={"lg"}
                    colorScheme="facebook"
                    variant='solid'
                >
                    Sign Up
                </Button>
            </ButtonGroup>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent
                    p={5}
                >
                <ModalHeader>
                    <Heading fontSize={'2x1'} color={'blue.700'}>
                        Create Account
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form>
                        <FormControl isRequired pb={'3'} isInvalid={touched && !validName}>
                            <FormLabel id="name">
                                Fullname
                            </FormLabel>
                            <Input 
                                name="name"
                                onChange={handleChange}
                                placeholder="Fullname"
                                value={signupForm.name}
                            />
                            {validName ? (
                                <FormHelperText>

                                </FormHelperText>
                            ) : (
                                <FormErrorMessage> please enter a valid name </FormErrorMessage>
                            )}
                        </FormControl>
                    
                        <FormControl id="email" isRequired pb={3} isInvalid={touched}>
                            <FormLabel> Email </FormLabel>
                            <Input 
                                type={'email'}
                                name="email"
                                onChange={handleChange}
                                value={signupForm.email}
                                placeholder="Email"  
                            />
                        </FormControl>
                   
                        <FormControl id="password" isRequired pb={3} isInvalid={touched}>
                            <FormLabel> Password </FormLabel>
                            <Input 
                                type={'password'}
                                name="password"
                                onChange={handleChange}
                                value={signupForm.password}
                                placeholder="Password"  
                            />
                        </FormControl>

                        <Stack spacing={3}
                            w={'full'}
                            maxW={'md'}
                            pt={4}>
                                <Tooltip label='Please fill required field correctly' hasArrow placement='top'>
                                    <Button
                                        isDisabled
                                        colorScheme='blue' >
                                            Sign Up
                                    </Button>
                                </Tooltip>

                                :
                                <Button
                                    type="submit"
                                    colorScheme='blue' 
                                    onClick={signMeUp}
                                >
                                    Sign Up
                                </Button>
                        </Stack>
                    </form>
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SignUp;