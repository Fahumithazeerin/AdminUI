import React from "react";
import "./admin-ui.css";
import { connect } from "react-redux";
import { deleteSelectedUser, deleteSelectedUserMainCheckBox, fetchData } from "../redux/action/action-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface Data {
   id: number;
   name: string;
   email: string;
   role: string;
}

interface AdminStateProps {
    apiData: [],
    isLoding: boolean
}

interface AdminDispatchProps {
    init: () => [];
    deleteUser: (userId: number) => [];
    deleteMaincheckboxSelectedUser: (userId: number) => [];
}

interface IOwnStateProps {
    checkBox: boolean,
    deleteCount: number,
    editStatus: boolean
}

const mapDispatchToProps = (dispatch: any) => ({
    init: () => dispatch(fetchData()),
    deleteUser: (userId: number) => dispatch(deleteSelectedUser(userId)),
    deleteMaincheckboxSelectedUser: (userId: number) => dispatch(deleteSelectedUserMainCheckBox(userId))
})

const mapStateToProps = (state: {isLoding: boolean; data: []}) : AdminStateProps => ({
    isLoding: state.isLoding,
    apiData: state.data,
})

type Iprops = AdminStateProps & AdminDispatchProps

class Admin extends React.Component<Iprops, IOwnStateProps> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            checkBox: false,
            deleteCount: 0,
            editStatus: false
        }
    }
  async componentDidMount(){
        await this.props.init();
         console.log(this.props.apiData);
    }
   

handleSelectAndDeSelectAll() { 
    const mainCheckbox = document.getElementById('main-checkbox') as HTMLInputElement;
    const subCheckbox = document.getElementsByClassName('sub-checkbox');
    const mainCheckboxState = mainCheckbox.checked;
    if(mainCheckboxState === true) {
        for(let i = 0; i < 10; i++) {
          const subCheckboxState = subCheckbox[i] as HTMLInputElement;
          subCheckboxState.checked = mainCheckboxState;
        }
    } else {
        const mainCheckboxState = false;
        for(let i = 0; i < 10; i++) {
            const subCheckboxState = subCheckbox[i] as HTMLInputElement;
            subCheckboxState.checked = mainCheckboxState;
        }
    }
}

handleDelete(userId: number) {
   this.props.deleteUser(userId);
}

handleDeleteForMainCheckbox() {
        for(let j = 0; j < 10; j++) {
           this.props.deleteMaincheckboxSelectedUser(this.state.deleteCount+1);
           this.setState({deleteCount: this.state.deleteCount+1})
        }
        const mainCheckbox = document.getElementById('main-checkbox') as HTMLInputElement;
        mainCheckbox.checked = false;
}

handleContent(userId: number) {
    if(!this.state.editStatus) {
       const input = document.getElementsByClassName('input');
       const length = userId * 4;
        for(let i = length-4 ; i < length; i++) {
         const readonly = input[i] as HTMLInputElement;
         readonly.readOnly = false;
    }
  }
}

    render() {
        return (
        
            <div className='admin-wrapper'>
                <div>
                <input type='search' className='search-box'></input>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th><input type='checkbox' id='main-checkbox' onClick={()=>this.handleSelectAndDeSelectAll()}></input></th>
                            <th>ID</th>
                            <th className='table-head-name'>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className='action'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.apiData? this.props.apiData.map((item: Data) => (
                            <tr key={item.id}>
                                <td><input type='checkbox' className='sub-checkbox'></input></td>
                                <td><input type='text' className='input' defaultValue={item.id}  readOnly></input></td>
                                <td><input type='text' className='input' defaultValue={item.name}   readOnly></input></td>
                                <td><input type='text' className='input' defaultValue={item.email}  readOnly></input></td>
                                <td><input type='text' className='input' defaultValue={item.role}   readOnly></input></td>
                                <td>
                                    <FontAwesomeIcon 
                                        icon={faPenToSquare} 
                                        className='editIcons' 
                                        onClick={()=>{
                                            this.handleContent(item.id)
                                           }
                                        }
                                    />
                                    <FontAwesomeIcon 
                                        icon={faTrashCan}
                                        className='icons' 
                                        onClick={()=>{this.handleDelete(item.id)}}
                                    />
                                </td>
                            </tr>
                        )): null}
                    </tbody>
                </table>
                <button onClick={()=>this.handleDeleteForMainCheckbox()}>Delete</button>
            </div>
        );
        
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);

