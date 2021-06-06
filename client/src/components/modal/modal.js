import React from "react";
import { Modal, Box } from "@material-ui/core";

export const TaskFormModal = (props) => {
    const { showModal, handleClose, children, className } = props;
    return (
        <Box>
            <Modal
                className={className}
                open={showModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    {children}
                </div>
            </Modal>
        </Box>
    );
}
