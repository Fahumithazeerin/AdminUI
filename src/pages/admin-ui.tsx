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
    isLoding: boolean,
    totalPage: number
}

interface AdminDispatchProps {
    init: () => [];
    deleteUser: (userId: number) => [];
    deleteMaincheckboxSelectedUser: (userId: number) => [];
}

interface IOwnStateProps {
    checkBox: boolean,
    deleteCount: number,
    editStatus: boolean,
    currentUser: number,
    currentPage: number,
    listofUserCurrentPage: any,
    pageNumberStart: number,
    pageNumberEnd: number
}

const mapDispatchToProps = (dispatch: any) => ({
    init: () => dispatch(fetchData()),
    deleteUser: (userId: number) => dispatch(deleteSelectedUser(userId)),
    deleteMaincheckboxSelectedUser: (userId: number) => dispatch(deleteSelectedUserMainCheckBox(userId))
})

const mapStateToProps = (state: {isLoding: boolean; data: []; totalPage: number }) : AdminStateProps => ({
    isLoding: state.isLoding,
    apiData: state.data,
    totalPage: state.totalPage
})

type Iprops = AdminStateProps & AdminDispatchProps

class Admin extends React.Component<Iprops, IOwnStateProps> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            checkBox: false,
            deleteCount: 0,
            editStatus: false,
            currentUser: 0,
            currentPage: 0,
            listofUserCurrentPage: [],
            pageNumberStart: 1,
            pageNumberEnd: 3

        }
    }
    
    async componentDidMount(){
         await this.props.init();
    }


handleSelectAndDeSelectAll() { 
    const mainCheckbox = document.getElementById('main-checkbox') as HTMLInputElement;
    const subCheckbox = document.getElementsByClassName('sub-checkbox');
    const row = document.getElementsByClassName('row');
    const input = document.getElementsByClassName('input');
    const mainCheckboxState = mainCheckbox.checked;
    if(mainCheckboxState === true) {
        for(let i = 0; i < 10; i++) {
          const subCheckboxState = subCheckbox[i] as HTMLInputElement;
          subCheckboxState.checked = mainCheckboxState;
          const rows= row[i] as HTMLInputElement
          const inputs= input[i] as HTMLInputElement
          rows.style.backgroundColor = 'lightgrey'
          inputs.style.backgroundColor = 'lightgrey'
        }
    } else {
        const mainCheckboxState = false;
        for(let i = 0; i < 10; i++) {
            const subCheckboxState = subCheckbox[i] as HTMLInputElement;
            subCheckboxState.checked = mainCheckboxState;
            const rows= row[i] as HTMLInputElement
            const inputs= input[i] as HTMLInputElement
            rows.style.backgroundColor = 'transparent'
            inputs.style.backgroundColor = 'transparent'
        }
    }
}

handleDelete(userId: number) {
   this.props.deleteUser(userId);
}

handleDeleteForMainCheckbox() {
        for(let j = 0; j < 10; j++) {
           this.props.deleteMaincheckboxSelectedUser( this.state.deleteCount+1 );
           this.setState({ deleteCount: this.state.deleteCount+1 })
        }
        const mainCheckbox = document.getElementById('main-checkbox') as HTMLInputElement;
        mainCheckbox.checked = false;
}

handleContent(userId: number) {
    this.setState({ editStatus: false });
    const input = document.getElementsByClassName('input');
    const length = userId * 4;
    if(!this.state.editStatus) {
       this.setState({ editStatus: true, currentUser: userId })
       for(let i = length-4; i < length; i++) {
         const readonly = input[i] as HTMLInputElement;
         readonly.readOnly = false;
    } 
  } else{
    for(let i = length-4; i < length; i++) {
        const readonly = input[i] as HTMLInputElement;
        readonly.readOnly = true;
   } 
  }
}

cal(userId: number) {
    if(this.state.currentUser === userId) {
        return true;
    } else {
        return false;
    }
}

generateArrayofPages() {
    const pages : number[] = [];
    for(let i = 0; i < this.props.totalPage; i++) {
        pages[i] = i + 1
     }
     return pages;
}

pagination(pages: number) {
   let lastPageNumber = pages * 2;
    if (this.props.totalPage > 3 ) {
        if(this.state.pageNumberEnd % 3 === 0 && this.state.pageNumberEnd < this.props.totalPage ) {
            this.setState({ pageNumberStart: pages })
            if(lastPageNumber >= this.props.totalPage) {
                this.setState({ pageNumberEnd: this.props.totalPage })
            } else{
                this.setState({ pageNumberEnd: lastPageNumber }) 
            }
        }
    } 
}

goToTheInitialThreePage() {
   this.setState({ pageNumberStart: 1, pageNumberEnd: 3, currentPage: 0 })
}

goToTheLastThreePage() {
   this.setState({ pageNumberStart: this.props.totalPage - 2, pageNumberEnd: this.props.totalPage, currentPage: this.props.totalPage - 1})
}

goToThePreviousTwoPagesBeforeFirstPage() {
    if(this.state.pageNumberStart === 1) {
        return;
    }
  this.setState({ pageNumberEnd: this.state.pageNumberStart })
  this.setState({ pageNumberStart: this.state.pageNumberStart - 2 })
}

goToTheNextTwoPagesAfterLastPage() {
    if(this.state.pageNumberEnd === this.props.totalPage) {
        return;
    }

    let page = this.state.pageNumberEnd + 2;
    if(page >= this.props.totalPage) {
      page = this.props.totalPage
    }

    this.setState({ pageNumberStart: this.state.pageNumberEnd,pageNumberEnd: page })
}

showFrontThreeDots() {
    if( this.state.pageNumberStart >= 3 ) {
        return true
    } else {
        return false
    }
}

showEndThreeDots() {
    if( this.state.pageNumberEnd === this.props.totalPage ) {
        return false
    } else {
        return true
    }
}

decide(pages: number) {
    if (pages % 3 === 0) {
        this.pagination(pages);
    } 
    this.setState({ currentPage: pages-1 });
}
   
render() {
        return (
           <>
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
                        {this.props.apiData.filter((item: Data) => item.id >= (this.state.currentPage*10)+1 && item.id <= (this.state.currentPage+1)*10).map((item: Data) => (
                            <tr key={item.id} className="row">
                                <td><input type='checkbox' className='sub-checkbox'></input></td>
                                <td><input type='text' className='input' defaultValue={item.id}  readOnly></input></td>
                                <td><input type='text' className='input' defaultValue={item.name}   readOnly></input></td>
                                <td><input type='text' className='input' defaultValue={item.email}  readOnly></input></td>
                                <td><input type='text' className='input' defaultValue={item.role}   readOnly></input></td>
                                <td>
                                    { !this.state.editStatus || !this.cal(item.id) ? <FontAwesomeIcon 
                                        icon={faPenToSquare} 
                                        className='editIcons' 
                                        onClick={()=>{
                                            this.handleContent(item.id)
                                           }
                                        }
                                    /> : <button onClick={()=>{ this.handleContent(item.id)}}>Save</button>
                                    }
                                    <FontAwesomeIcon 
                                        icon={faTrashCan}
                                        className='icons' 
                                        onClick={()=>{this.handleDelete(item.id)}}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={()=>this.handleDeleteForMainCheckbox()}>Delete</button>
            </div>
            <table>
                <tbody>
                  <tr>
                     <td><button onClick={()=> this.goToTheInitialThreePage()}>  {'<<'}</button></td>
                     <td><button onClick={()=> this.goToThePreviousTwoPagesBeforeFirstPage()}> {'<'}</button></td>
                     { this.showFrontThreeDots() && <td>...</td> }
                     {
                        this.generateArrayofPages()
                        .filter((page: number)=> page>= this.state.pageNumberStart && page<= this.state.pageNumberEnd)
                        .map((pages: number) => ( 
                          <td> 
                            <button onClick = {() => {this.decide(pages)} }>
                              {pages}
                            </button>
                          </td>
                        ))
                    }
                      { this.showEndThreeDots() && <td>...</td> }
                     <td><button onClick={()=> this.goToTheNextTwoPagesAfterLastPage()}>  {'>'}</button></td>
                     <td><button onClick={()=> this.goToTheLastThreePage()}> {'>>'}</button></td>
                  </tr>
                </tbody>
            </table>
            </>
            
        );
        
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);


