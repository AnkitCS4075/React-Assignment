import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Divider,
  Center,
  Link,
  FormErrorMessage,
  Heading,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await authService.signIn(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await authService.googleSignIn();
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)"
      py={20}
    >
      <Center>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          p={8}
          maxWidth="400px"
          borderWidth={1}
          borderRadius="xl"
          boxShadow="2xl"
          bg="white"
          w="90%"
        >
          <VStack spacing={6} align="stretch">
            <VStack spacing={2}>
              <Heading size="xl" color="blue.600" textAlign="center">
                Welcome Back
              </Heading>
              <Text color="gray.500" fontSize="md" textAlign="center">
                Sign in to continue to your account
              </Text>
            </VStack>
            
            <form onSubmit={handleEmailLogin}>
              <VStack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaEnvelope} color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      bg="gray.50"
                      _hover={{ bg: 'gray.100' }}
                      _focus={{ bg: 'white', borderColor: 'blue.400' }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaLock} color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      bg="gray.50"
                      _hover={{ bg: 'gray.100' }}
                      _focus={{ bg: 'white', borderColor: 'blue.400' }}
                    />
                    <InputRightElement>
                      <Icon
                        as={showPassword ? FaEyeSlash : FaEye}
                        color="gray.500"
                        cursor="pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  size="lg"
                  isLoading={isLoading}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <Divider />

            <Button
              leftIcon={<FaGoogle />}
              onClick={handleGoogleLogin}
              colorScheme="red"
              variant="outline"
              width="full"
              size="lg"
              isLoading={isLoading}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Sign in with Google
            </Button>

            <Text textAlign="center" color="gray.600">
              Don't have an account?{' '}
              <Link
                as={RouterLink}
                to="/signup"
                color="blue.500"
                fontWeight="semibold"
                _hover={{ textDecoration: 'underline' }}
              >
                Sign Up
              </Link>
            </Text>
          </VStack>
        </MotionBox>
      </Center>
    </Box>
  );
};

export default Login; 