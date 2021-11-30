import React, {useState} from 'react';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = usePassword('');
    const [ birthday, setBirthday ] = useBirthday('');
    const [ email, setEmail ] = useEmail('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, birthday, email);

        props.onLoggedIn(username);
    };

}