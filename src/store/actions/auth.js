import {LOGIN, LOGOUT} from './action_types/auth';
import {setAlert} from './notification';
import {startLoader, endLoader} from './spinner';
import history from '../../components/history';
import { DANGER } from '../../style/alert';


const login=(data)=>({
    type: LOGIN,
    payload: data
});

export const startLogin=(username, password)=>{
    return (dispatch)=>{
        dispatch(startLoader());
        fetch(`/login`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                crossdomain: true,
                body: JSON.stringify({username, password})
            }
        ).then(response=>{
            if(response.status===401){
                dispatch(endLoader());
                dispatch(setAlert('unauthorised', DANGER));
                history.replace('/');
            }else{
                return response;
            }
        })
        .then(response=>response.json())
        .then(response=>{
            dispatch(login(response));
        })
        .then(()=>{
            dispatch(endLoader());
            history.replace('/dashboard')
        })
        .catch((err)=>{
            dispatch(endLoader());
        });
    }
};


const logout=()=>({
    type:LOGOUT
});

export const startLogout=()=>{
    return(dispatch)=>{
        dispatch(logout());
    };
}

// 401 unauthorised