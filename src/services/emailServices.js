import axios from 'axios';

const sendReport = async ({ name, email, body }) => {

    try {
        const res = await axios.post('http://localhost:8080/api/email/send', {
            name,
            email,
            body,
        });

        console.log(res.data);
        return res.data;

    } catch (error) {
        const errorMessage = error.response?.data || error.message;
        alert(errorMessage);
        console.error(error);
    }
}

export { sendReport };
