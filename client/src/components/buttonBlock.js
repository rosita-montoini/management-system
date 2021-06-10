import React, { useContext, useState } from 'react';
import { 
    Box,
    makeStyles,
    IconButton,
    Tooltip,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Paper,
} from '@material-ui/core';
import { useHttp } from '../hooks/useHttp';
import { AuthContext } from '../context/authContext';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { TaskFormModal } from './modal/modal';
import { CreateUpdateTask } from '../modules/pages/createUpdateTask';
import Draggable from 'react-draggable';

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

export const ButtonBlock = ({ taskById }) => {
    const styles = useStyles();
    const { token } = useContext(AuthContext);
    const { request } = useHttp();
    const id = taskById._id;
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    function PaperComponent(props) {
        return (
          <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
          </Draggable>
        );
      }

    const removeTaskById = async () => {
        try {
            await request('/task/remove', 'POST', {id}, {
                Authorization: `Bearer ${token}`
            }).then(window.location.replace('/'));
        } catch (err) {}
    };

    const handleOpen = () => {
        setShowModal(true);
    };
    
    const handleClose = () => {
        setShowModal(false);
    };

    return (
            <Box>
                <Box>
                <Tooltip title="Delete task">
                    <IconButton aria-label="upload" size="medium" color="primary" onClick={handleOpenDialog}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={open}
                    onClose={handleCloseDialog}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this task?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={removeTaskById} color="primary">
                            Delete
                        </Button>
                    </DialogActions>        
                </Dialog>
                    <Tooltip title="Edit task">
                        <IconButton aria-label="upload" size="medium"  color="primary" onClick={handleOpen}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <TaskFormModal
                    className={styles.modal}
                    showModal={showModal}
                    handleClose={handleClose}
                >
                    <CreateUpdateTask handleClose={handleClose} taskById={taskById}/>
                </TaskFormModal>
            </Box>
    );
};