import React, {useEffect, useState} from "react";
import {
    ButtonGroup,
    Link,
    Box,
    Flex,
    Text,
    Button,
    Stack,
    ChakraProvider,
    Center,
} from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import SignIn from "../../../Button-login";
import SignUp from "../../../Button-signUp";


const NavbarContainer = ({children, ...props}) => {
    return(
        <ChakraProvider>
            <Flex
                as="nav"
                align={"center"}
                justify={"space-between"}
                wrap={"wrap"}
                w={"100%"}
                p={8}
                mb={8}
                bg={'blue.100'}
                color={['white', 'white', 'black']}
                {...props}
            >
                {children}
            </Flex>
        </ChakraProvider>
    )
}

const CloseIcon = () => (
    <svg width={12} height={12} viewBox="0 0 18 18">
        <path
            fill="currentColor"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg 
        width={'24px'}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>
);

const MenuLinks = ({isOpen}) => {

    const [tokenAja, setTokenAja] = useState(null)
    const pages = useLocation()

    const dapetToken = async () => {
        let dataToken = await localStorage.getItem('token')
        setTokenAja(dataToken)
    }

    useEffect(() => {
        dapetToken()
    }, [])

    const {setToken } = useToken();
    return (
        <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'column', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <NavLink to="/">
          <Button bgColor={pages.pathname == '/' ? 'white' : ''}  colorScheme="telegram" variant="ghost" width={{ base: '300px', sm:'500px',md:'full', lg:'full'  }} shadow={pages.pathname == '/' ?'lg':''}>
            Beranda
          </Button>
        </NavLink>
        <NavLink to="/">
          <Button bgColor={pages.pathname == '/articlenl' ? 'white' : ''} colorScheme="telegram" variant="ghost" width={{ base: '300px', sm:'500px',md:'full', lg:'full'  }} shadow={pages.pathname == '/articlenl' ?'lg':''}>
            Peminjaman Teleskop
          </Button>
        </NavLink>
        <NavLink to="/">
          <Button bgColor={pages.pathname == '/aboutusnl' ? 'white' : ''} colorScheme="telegram" variant="ghost" width={{ base: '300px', sm:'500px',md:'full', lg:'full'  }} shadow={pages.pathname == '/aboutusnl' ?'lg':''}>
            Jadwal Peminjaman
          </Button>
        </NavLink>

      </Stack>
    </Box>
    );
};

const NavbarNL = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <NavBarContainer>
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
            <SignIn></SignIn>
            <SignUp></SignUp>
        </NavBarContainer>
    )
};

export default NavbarNL;