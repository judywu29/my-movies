import React, {Component} from 'react';

const buttonStyles = {
    lineHeight: "30px",
    padding: "0 10px",
    background: "orange",
    color: "white",
    border: "0",
    borderRadius: "0",
    cursor: "pointer"
}


class Title extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }

        // This binding is necessary to make `this` work in the callback
        // this.handleClick = this.handleClick.bind(this);
    }

    // handleClick() {
    //     this.setState(prevState => {
    //         return {counter: prevState.counter + 1}
    //     })
    // }

    // by public class fields syntax, you can use class fields to correctly bind callbacks:
    onClick = () => {
        this.setState(prevState =>
        {
            return { counter: prevState.counter + 1 }
        })
    }

    render() {
        return (
            <div>
                <button style ={buttonStyles} onClick={ this.onClick }> Upvote Movie</button>
                <h1>
                    <span>{this.state.counter}</span>
                    My Movies
                </h1>
            </div>
        )
    }
}

export default Title