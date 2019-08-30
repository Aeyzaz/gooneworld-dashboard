
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../firebase';
import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER
} from 'Constants/actionTypes';

import {
    loginUserSuccess,
    registerUserSuccess,
    calluserPhoto
} from './actions';

import { apiPath } from 'Constants/defaultValues'
const apiUrl_Goone = apiPath;

const loginUser = async(email,password,history) =>{
        let data = {email:email, password: password} // password is not changing, always 123456, why?
       await axios({
            method:'post',
            url: apiUrl_Goone+'/api/Users/login',
            data: data
        }).then((res)=>{
            console.log(res); // res.result i guess
            if(res && res.status=='200'){
                localStorage.setItem('user_id', res.data.userId);
                localStorage.setItem('user_email', email);
                localStorage.setItem('token', res.data.id);
                
                axios({
                    method: 'get',
                    url: 'https://api.gooneworld.com/api/Users/'+localStorage.getItem('user_id')+'?access_token='+localStorage.getItem('token')
                }).then((res)=>{
                    //localStorage.setItem('photouser', res.data.profilePhoto.link);
                    this.setState({
                        'photouser': res.data.profilePhoto.link
                    });
                    location.href='/app/dashboards/default';
                    //"5d5c15263ad7a07791b9ef04"
                });
            }
            //history.push('/'); upload this file
        })
        .catch((err)=>{
            console.log('Unauthorized User');
            console.error(err);

        });
}

function* loginWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        
        loginUser(email,password,history);
    } catch (error) {
        // catch throw
        console.log('login error : ', error)
    }
}

const registerWithEmailPasswordAsync = async (email, password, firstname, lastname) =>{
    await axios.post(apiUrl_Goone+'/api/Users',{
        email : email,
        password: password,
        firstname : firstname,
        lastname : lastname
    })
        .then((res)=>{
            console.log(res);
            location.href='/app/dashboards/default';
        })
        .catch((err)=>{
            console.log(err);
            console.log('Unable to Register');
        })
}; 


function* registerWithEmailPassword({ payload }) {
    const { email, password, firstname, lastname } = payload.user;
    const { history } = payload;
    console.log('register payload',payload.user);
    try {

        registerWithEmailPasswordAsync(email, password, firstname, lastname);
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}



const logoutAsync = async (history) => {
    await auth.signOut().then(authUser => authUser).catch(error => error);
    history.push('/')
}

function* logout({payload}) {
    const { history } = payload
    try {
        yield call(logoutAsync,history);
        localStorage.removeItem('user_id');
    } catch (error) {
    }
}

const userPhoto = (photo) => {
    /*await axios({
            method: 'get',
            url: 'https://api.gooneworld.com/api/Users/'+user_id+'?access_token='+token
        }).then((res)=>{
            console.log("photo data ",res);
            localStorage.setItem('photouser', res.data.profilePhoto.link);
            //"5d5c15263ad7a07791b9ef04"
        });*/
    localStorage.setItem('photouser', photo);
    
}

function* get_userPhoto({payload}){
    const { photo } = payload;
    try {
        userPhoto(photo);
    } catch (error) {
        // catch throw
        console.log('photo get error : ', error)
    }
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchGetPhotoUser() {
    yield takeEvery('GET_PHOTO', get_userPhoto);
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchGetPhotoUser)
    ]);
}