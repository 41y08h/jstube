'use client'
import Layout from '@/components/Layout'
import axios, { AxiosError } from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {
  Button,
  InputBase,
  LinearProgress,
  linearProgressClasses,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'
import VideoPlayer from '@/components/VideoPlayer'
import { grey, red } from '@mui/material/colors'
import IVideo from '@/interfaces/Video'
import Authenticated from '../../components/Authenticated/Authenticated'

export default function Upload() {
  const [file, setFile] = useState<File>()
  const [fileURL, setFileURL] = useState<string>()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const theme = useTheme()

  const videoUpload = useMutation<
    IVideo,
    AxiosError<{ message: string }>,
    FormData
  >({
    mutationFn: formData =>
      axios
        .post('/api/videos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: progressEvent =>
            setUploadProgress(
              Math.round((progressEvent.loaded / progressEvent.total!) * 100)
            ),
        })
        .then(res => res.data),
    onSuccess: () => router.push('/'),
    onError: err => toast.error(err.response?.data.message),
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file!)
    formData.append('title', title)
    formData.append('description', description)
    videoUpload.mutate(formData)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024)
      if (fileSizeInMB > 50) {
        toast.error('File size exceeds 50MB')
        return
      }
      setFile(selectedFile)
      setUploadProgress(0)
      setFileURL(URL.createObjectURL(selectedFile))
    } else {
      toast.error('Please select a valid file')
    }
  }

  return (
    <Authenticated>
      <Layout>
        <Head>
          <title>Upload - JsTube</title>
        </Head>
        <div className='px-18 py-6'>
          <Typography variant='h5' sx={{ fontWeight: 700 }}>
            Upload a video
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className='flex w-full my-4 sm:space-x-6 sm:flex-row flex-col-reverse'>
              <div className='w-full sm:mt-0 mt-4'>
                <Paper className='aspect-ratio'>
                  {!file ? (
                    <label className='flex flex-col items-center justify-center tracking-wide cursor-pointer relative'>
                      <span
                        className='material-symbols-outlined mb-3'
                        style={{ fontSize: '3rem' }}
                      >
                        upload_file
                      </span>
                      <Typography variant='body1'>
                        Select a video file
                      </Typography>
                      <Typography
                        variant='caption'
                        className='absolute bottom-0 left-0 py-1 px-2'
                        color='secondary'
                      >
                        Please only select mp4 files not exceeding 50MB in size
                      </Typography>
                      <input
                        required
                        type='file'
                        accept='.mp4'
                        className='hidden'
                        onChange={onFileChange}
                      />
                    </label>
                  ) : (
                    <VideoPlayer src={fileURL} />
                  )}
                </Paper>
                {Boolean(uploadProgress) && (
                  <div className='mt-4'>
                    <LinearProgress
                      variant='determinate'
                      className='rounded-md'
                      sx={{
                        height: 12,
                        [`& .${linearProgressClasses.bar}`]: {
                          backgroundColor: red[500],
                          borderRadius: '8px',
                        },
                      }}
                      value={uploadProgress}
                    />
                  </div>
                )}
              </div>
              <div className='w-full'>
                <div className='flex flex-col space-y-4 h-full'>
                  <InputBase
                    placeholder='Title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    className='outline-0 px-1'
                    sx={{
                      fontSize: theme.typography.h5.fontSize,
                      fontWeight: 900,
                    }}
                  />
                  <Paper
                    elevation={0}
                    className='h-full'
                    sx={{
                      backgroundColor: grey[200],
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      width: '100%',
                    }}
                  >
                    <InputBase
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder='Describe your video'
                      multiline
                      sx={{
                        width: '100%',
                        height: '100%',
                        fontSize: theme.typography.body2.fontSize,
                        '& textarea': {
                          height: '100% !important',
                        },
                      }}
                    />
                  </Paper>
                </div>
              </div>
            </div>
            <div className='flex justify-end'>
              <Button
                disableElevation
                disabled={
                  videoUpload.isPending ||
                  uploadProgress === 100 ||
                  !file ||
                  !title ||
                  !description
                }
                variant='contained'
                color='primary'
                type='submit'
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  backgroundColor: red[500],
                }}
              >
                Upload
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    </Authenticated>
  )
}
