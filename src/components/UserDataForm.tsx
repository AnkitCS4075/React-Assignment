import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { saveUserData, updateUserData, loadUserData } from '../store/slices/userDataSlice'
import type { UserData } from '../store/slices/userDataSlice'

const UserDataForm = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { data: userData, hasUnsavedChanges } = useSelector(
    (state: RootState) => state.userData
  )
  const [isInitialized, setIsInitialized] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    dispatch(loadUserData())
    setIsInitialized(true)
  }, [dispatch])

  useEffect(() => {
    if (isInitialized && !userData) {
      const initialData: UserData = {
        id: crypto.randomUUID(),
        name: '',
        address: '',
        email: '',
        phone: ''
      }
      dispatch(updateUserData(initialData))
    }
  }, [isInitialized, userData, dispatch])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
        localStorage.removeItem('userData')
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!userData?.name?.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!userData?.address?.trim()) {
      newErrors.address = 'Address is required'
    }
    if (!userData?.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!userData?.phone?.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^\d{10}$/.test(userData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userData && validateForm()) {
      try {
        dispatch(saveUserData(userData))
        toast({
          title: 'Data saved successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        console.error('Error saving data:', error)
        toast({
          title: 'Error saving data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields correctly',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    try {
      dispatch(updateUserData({ [name]: value }))
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    } catch (error) {
      console.error('Error updating form:', error)
      toast({
        title: 'Error updating form',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  if (!isInitialized) {
    return null
  }

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        User Data Form
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              size="md"
              name="name"
              value={userData?.name ?? ''}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.address}>
            <FormLabel>Address</FormLabel>
            <Input
              size="md"
              name="address"
              value={userData?.address ?? ''}
              onChange={handleChange}
              placeholder="Enter your address"
            />
            <FormErrorMessage>{errors.address}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              size="md"
              name="email"
              type="email"
              value={userData?.email ?? ''}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input
              size="md"
              name="phone"
              type="tel"
              value={userData?.phone ?? ''}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            isDisabled={!hasUnsavedChanges}
          >
            Save
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default UserDataForm 