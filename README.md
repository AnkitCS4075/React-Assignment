# React Assignment

A React-based web application featuring a counter with animated background, user data form with persistence, and rich text editor visualization.

## Features

- **Counter Component**
  - Increment, decrement, and reset functionality
  - Animated background that changes height and color based on count
  - Smooth animations using React Spring

- **User Data Form**
  - Input fields for name, address, email, and phone
  - Auto-generated user ID
  - Local storage persistence
  - Unsaved changes warning
  - Form validation

- **Rich Text Editor**
  - Visualization of user data
  - Formatting options (bold, italic, underline, lists)
  - Read-only display of user profile data

## Technologies Used

- React with TypeScript
- Chakra UI for styling
- React Spring for animations
- React Router for routing
- Redux Toolkit for state management
- React Quill for rich text editing

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `/src/components` - React components
- `/src/store` - Redux store configuration and slices
- `/src/store/slices` - Redux slices for counter and user data

## Usage

1. Use the counter buttons to increment, decrement, or reset the count
2. Fill in the user data form and save to persist data
3. View the formatted user data in the rich text editor
4. Changes to the form will prompt a warning when leaving the page

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
