import { Box, Container, Grid, GridItem, HStack, Button, useToast, Link, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom'
import { authService } from '../services/authService'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate()
  const toast = useToast()
  const location = useLocation()

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      navigate('/login')
    } catch (error) {
      toast({
        title: 'Error signing out',
        status: 'error',
        duration: 3000,
      })
    }
  }

  // Determine if we should use the split layout (for home page)
  const useSplitLayout = location.pathname === '/'

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Navigation Header */}
      <Box 
        bg="white" 
        py={4} 
        px={8} 
        boxShadow="sm"
        position="sticky"
        top={0}
        zIndex={10}
        borderBottom="1px"
        borderColor="gray.100"
      >
        <Container maxW="container.xl">
          <HStack justify="space-between">
            {/* Navigation Links */}
            <HStack spacing={6}>
              <Link
                as={RouterLink}
                to="/"
                fontSize="md"
                fontWeight={location.pathname === '/' ? 'bold' : 'medium'}
                color={location.pathname === '/' ? 'blue.500' : 'gray.600'}
                _hover={{ color: 'blue.500', transform: 'translateY(-1px)' }}
                transition="all 0.2s"
                display="flex"
                alignItems="center"
              >
                <Text>Home</Text>
              </Link>
              <Link
                as={RouterLink}
                to="/dashboard"
                fontSize="md"
                fontWeight={location.pathname === '/dashboard' ? 'bold' : 'medium'}
                color={location.pathname === '/dashboard' ? 'blue.500' : 'gray.600'}
                _hover={{ color: 'blue.500', transform: 'translateY(-1px)' }}
                transition="all 0.2s"
                display="flex"
                alignItems="center"
              >
                <Text>Dashboard</Text>
              </Link>
            </HStack>
            
            {/* Sign Out Button */}
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              _hover={{ transform: 'translateY(-1px)', boxShadow: 'sm' }}
              transition="all 0.2s"
            >
              Sign Out
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {useSplitLayout ? (
            // Split layout for home page
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {/* Left Column */}
              <GridItem>
                <Grid gap={6}>
                  {/* First two children (Counter and UserDataForm) go in the left column */}
                  {Array.isArray(children) && children.slice(0, 2).map((child, index) => (
                    <GridItem key={index}>
                      <Box 
                        bg="white" 
                        p={6} 
                        borderRadius="lg" 
                        boxShadow="base"
                        _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                        transition="all 0.2s"
                      >
                        {child}
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </GridItem>

              {/* Right Column */}
              <GridItem>
                <Box 
                  bg="white" 
                  p={6} 
                  borderRadius="lg" 
                  boxShadow="base" 
                  height="full"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                >
                  {/* Third child (RichTextEditor) goes in the right column */}
                  {Array.isArray(children) && children[2]}
                </Box>
              </GridItem>
            </Grid>
          ) : (
            // Regular layout for other pages
            <Box>
              {children}
            </Box>
          )}
        </MotionBox>
      </Container>
    </Box>
  )
}

export default Layout 