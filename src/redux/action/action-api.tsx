export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const DELETE_SELECTED_USER = 'DELETE_SELECTED_USER';
export const DELETE_SELECTED_USER_MAINCHECKBOX ='DELETE_SELECTED_USER_MAINCHECKBOX';

export const fetchData = () => {
  return async(dispatch: any) => {
    dispatch(fetchDataRequest());
    await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(async response => {
        const data = await response.json();
        dispatch(fetchDataSuccess(data));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchDataFailure(errorMessage));
      });
  };
};

export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
    payload: true
  };
};

export const fetchDataSuccess = (data: []) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  };
};

export const fetchDataFailure = (error: any) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error
  };
};

export const deleteSelectedUser = (userId: number) => {
    return {
      type: DELETE_SELECTED_USER,
      payload: userId
    };
  };

  export const deleteSelectedUserMainCheckBox = (userId: number) => {
    return {
      type: DELETE_SELECTED_USER_MAINCHECKBOX,
      payload: userId
    };
  };
