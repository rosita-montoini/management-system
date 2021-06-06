import { keys } from '../index.mjs';

export const regEmail = email => {
    return {
        from: 'Management System <managsystem07@gmail.com>',
        to: email, 
        subject: 'Congratulations! You are successfully registred on out site',
        html: `
            <h1>Wellcome to Management System Application</h1>
            <p>You have successfully created your account with email - ${email}</p>
            <hr />
            <a href="${keys.HOST_URL}">Management System</a>
        `
    }
};