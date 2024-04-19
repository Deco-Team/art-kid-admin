import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/use-auth'
import { ICancelOrderProps, OrderModalProps } from '~/interface'
import { notifyError, notifyLoading, notifySuccess } from '~/toastify'

const CancelCourseModal = ({ open, handleClose, courseId }: OrderModalProps) => {
  const navigate = useNavigate()
  const { idToken } = useAuth()
  const style = {
    position: 'absolute',
    borderRadius: '5px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  }
  const defaultValues = {
    rejectReason: ''
  }
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<ICancelOrderProps>({
    defaultValues: defaultValues
  })
  const handleCancelButton = (courseId: string) => async (data: ICancelOrderProps) => {
    try {
      notifyLoading()
      await axios.patch(
        `https://art-kids-api.onrender.com/courses/admin/${courseId}/reject`,
        { rejectReason: data.rejectReason },
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${idToken}`
          }
        }
      )
      notifySuccess('Rejected successfully')
      navigate('/courses')
    } catch (error) {
      notifyError('Something went wrong')
    } finally {
      reset()
      handleClose()
    }
  }
  const handleBackButton = () => {
    handleClose()
  }
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <form onSubmit={handleSubmit(handleCancelButton(courseId))}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2' sx={{ marginBottom: '20px' }}>
              Are you sure to reject this course?
            </Typography>

            <TextField
              {...register('rejectReason', {
                required: 'Reason is required'
              })}
              name='rejectReason'
              label='Reject reason'
              multiline
              rows={4}
              error={Boolean(errors.rejectReason)}
              helperText={errors.rejectReason?.message as ReactNode}
              color='error'
              sx={{ width: '440px', paddingBottom: '24px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' onClick={handleBackButton} type='button' sx={{ marginRight: '16px' }}>
                Cancel
              </Button>
              <Button variant='outlined' type='submit' color='error'>
                Reject
              </Button>
            </div>
          </Box>
        </Fade>
      </form>
    </Modal>
  )
}

export default CancelCourseModal
