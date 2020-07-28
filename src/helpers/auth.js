import {auth} from "../services/firebase";

export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password){
    return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}

export function signout(){
    auth().signOut().then(function() {
        return true // Indicate we successfully signed out
    }).catch(function(error){
        console.log(error)
        return false
    })
}