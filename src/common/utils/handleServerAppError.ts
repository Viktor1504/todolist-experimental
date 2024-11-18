import {setAppError, setAppStatus} from '../../app/appSlice'
import {BaseResponse} from '../types/types';
import {AppDispatch} from '../../app/store';

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}
