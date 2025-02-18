import { Box, Text } from '@chakra-ui/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect, useState } from 'react'

const RichTextEditor = () => {
  const userData = useSelector((state: RootState) => state.userData.data)
  const [editorContent, setEditorContent] = useState<string>('')

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet'
  ]

  useEffect(() => {
    const content = userData
      ? `<h2>User Data</h2>
         <p><strong>Name:</strong> ${userData.name || 'Not provided'}</p>
         <p><strong>Address:</strong> ${userData.address || 'Not provided'}</p>
         <p><strong>Email:</strong> ${userData.email || 'Not provided'}</p>
         <p><strong>Phone:</strong> ${userData.phone || 'Not provided'}</p>`
      : '<p>No user data available. Please fill out and save the form.</p>'
    
    setEditorContent(content)
  }, [userData])

  const handleEditorChange = (content: string) => {
    setEditorContent(content)
  }

  return (
    <Box h="100%">
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Rich Text Editor
      </Text>
      <Box 
        className="rich-text-editor" 
        borderRadius="md"
        border="1px"
        borderColor="gray.200"
      >
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={editorContent}
          onChange={handleEditorChange}
        />
      </Box>
    </Box>
  )
}

export default RichTextEditor 