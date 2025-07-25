// TODO: refactor this to ts file

const sendReport = async ({ name, email, body }) => {

    try {
        const res = await fetch(`http://localhost:8080/api/email/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                body
            }),
        });

        if (!res.ok) throw new Error("Error sending email");

        const data = await res.text();
        return data;

    } catch (e) {
        alert(e);
        console.log(e);
    }
}

export { sendReport };
