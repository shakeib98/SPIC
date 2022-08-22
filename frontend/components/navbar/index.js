import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
  Heading,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import useEagerConnect from '../../hooks/useEagerConnect'
import Account from '../Account'
import Network from '../Network'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const triedToEagerConnect = useEagerConnect()
  const router = useRouter()

  useEffect(() => {
    if(colorMode === 'light'){
      toggleColorMode()
    }
  },[])

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box cursor={"pointer"}>
            <Image
              width="170"
              height="170"
              
              src={require('../../public/images/logo-white.png')}
              onClick={() => router.push('/dashboard')}
            />
            {/* <Heading ml={3} cursor={"pointer"} onClick={() => router.push('/')} >SPIC</Heading> */}
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}
              <Network />
              <Account triedToEagerConnect={triedToEagerConnect} />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
