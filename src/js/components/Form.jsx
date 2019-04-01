import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle } from "../actions/index";

function mapDispatchToProps(dispatch){
    return {
        addArticle: article => dispatch(addArticle(article))
    }
}

class ConnectedForm extends Component{
    state = {
        title: ''
    }

    handleChange = (event)=>{
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        const {title} = this.state
        const id = uuidv1()
        this.props.addArticle({title, id})
        this.setState({title: ''})
    }

    render(){
        const { state } = this.state
        return(
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="title">Title</label>
                    <input
                        type='text'
                        className='form-control'
                        id='title'
                        value={state}
                    onChange={this.handleChange}
                    />
                </div>
                <button type='submit' className='btn btn-success btn-lg'>
                    SAVE
                </button>
            </form>
        )
    }


}

const Form = connect(null, mapDispatchToProps)(ConnectedForm)
export default Form