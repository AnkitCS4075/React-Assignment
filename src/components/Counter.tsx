import { Box, Button, HStack, Text, VStack, Center } from '@chakra-ui/react'
import { useSpring, animated } from 'react-spring'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { increment, decrement, reset } from '../store/slices/counterSlice'

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  // Calculate background height based on count
  const springs = useSpring({
    from: { height: '0%' },
    to: { height: `${Math.min(Math.abs(count) * 5, 100)}%` },
    config: {
      tension: 300,
      friction: 20,
    },
  })

  const AnimatedBox = animated(Box)

  return (
    <Box position="relative" overflow="hidden">
      <AnimatedBox
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg={count >= 0 ? 'green.100' : 'red.100'}
        style={springs}
        zIndex={0}
      />
      <Center p={4} position="relative" zIndex={1}>
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            {count}
          </Text>
          <HStack spacing={4}>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => dispatch(decrement())}
            >
              -
            </Button>
            <Button
              size="sm"
              colorScheme="gray"
              onClick={() => dispatch(reset())}
            >
              Reset
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => dispatch(increment())}
            >
              +
            </Button>
          </HStack>
        </VStack>
      </Center>
    </Box>
  )
}

export default Counter 