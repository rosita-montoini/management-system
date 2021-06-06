import React from 'react';
import {
    CircularProgress,
    Box
} from "@material-ui/core";

export const Loader = () => {
    return (
        <Box display="flex" justifyContent="center">
            <CircularProgress/>
        </Box>
    );
};