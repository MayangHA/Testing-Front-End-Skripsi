import React, { useEffect, useState} from "react";
import {
    Box,
    Text,
    Flex,
    Button,
    Stack,
    ChakraProvider,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Image,
    useToast,
    FormHelperText,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Form } from 'react-router-dom';
import axios from 'axios';

function SignIn () {

    const [loginForm, setloginForm] = useState({
        email: '',
        password: '',
    });

    const successToast = useToast({
        status: 'success',
        title: 'Success Login',
        position: 'top',
        description: "You'll be directed to your profile soon"
    })

    const errorToast = useToast({
        status: 'error',
        title: 'Login Failed',
        posisition: 'top',
        description: "Sorry, we coudln't find your account. Make sure you already have account",
        duration: 5000,
        isClosable: true
    })

    const servererorToast = useToast({
        status: 'error',
        title: 'Login Failed',
        posisition: 'top',
        description: "Sorry, we coudln't find your account. Make sure you already have account",
        duration: 5000,
        isClosable: true
    })

    const [touched, setTouched] = useState(false)

    function LogMeIn(event) {
        setTouched(false)
                axios({
                     method: 'POST',
                     headers: {
                        'Accept': "application/json",
                        "Content-Type": "application/json"
                    },
                    url: '/login',
                    data: {
                        email: loginForm.email,
                        password: loginForm.password,
                    },
                })
        .catch(error => {
            if (error.response){
                if (error.response.status === 401){
                    errorToast({})
                } else {
                    servererorToast({})
                }
                console.log(error.response);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });

        event.preventDefault();
            
    }

    function handleChange(event){
        const {value, name} = event.terget;

        setloginForm(prevNote => ({
            ...prevNote,
            [name]: value,
        }));
        setTouched(true)
    }

    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} colorScheme='facebook' variant={'link'}>
                Sign in 
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent p={5}>
                    <ModalHeader>
                        <Heading fontSize={'2x1'} color={'blue.700'}>
                            Login
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl id="email" pb='3'
                        isInvalid={touched}
                        isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                            name="email"
                            onChange={handleChange}
                            value={loginForm.email}
                            placeholder="Email address" 
                            />
                            {/* {validEmail ? ( */}
                                {/* <FormHelperText> */}

                                {/* </FormHelperText> */}
                            {/* ) : ( */}
                                {/* <FormErrorMessage> please enter a valid email </FormErrorMessage> */}
                            {/* )} */}
                        </FormControl>

                        <FormControl id="password" isInvalid={touched} isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input 
                                name="password"
                                onChange={handleChange}
                                value={loginForm.password}
                                type="password"
                                placeholder='Password'
                            />
                            {/* {!pwError ? ( */}
                                {/* <FormHelperText> */}

                                {/* </FormHelperText> */}
                            {/* ) : ( */}
                                {/* <FormErrorMessage> please enter a valid password </FormErrorMessage> */}
                            {/* )} */}
                        </FormControl>

                        <Stack
                            spacing={3}
                            maxW={'md'}
                            pt={5}
                        > 
                            <Button type='submit' colorScheme='blue' textAlign={'start'}>
                                Sign In
                            </Button>

                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}

export default SignIn;