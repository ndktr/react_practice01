import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const logIn = async (event, email, password) => {
    event.preventDefault();

    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('login success:', user);
        })
        .catch(error => {
            console.log('signInWithEmailAndPassword failed:', error);
        })
};

export const logOut = async event => {
    event.preventDefault();

    const auth = getAuth();

    await signOut(auth)
        .then(() => {
            console.log('logout success')
        })
        .catch(error => {
            console.log('signOut failed:', error);
        })
};
