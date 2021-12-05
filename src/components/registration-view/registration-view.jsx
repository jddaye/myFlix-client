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
    return (
        <form>

            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>

            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>

            <button type="submit" onClick={handleSubmit}>Submit</button>

        </form>
    )
}