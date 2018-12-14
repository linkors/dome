import React from 'react';
import Storage from '../utils/Storage';
import { XCircle } from 'react-feather';
 
export default class CommentModal extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            comment: Storage.getDraftComment()
        }
    }

    onChange(e) {
        this.setState({
            comment : e.target.value
        })
    }

    render() {
        const { onSend, onClose, isShown, user } = this.props;
        const style = {display: (isShown ? 'block' : 'none')};
        return (
            <div style={style} className="CommentModal__container">
                <header className="CommentModal__header">
                    <h2>Send Message to {user.name}</h2>
                    <XCircle color="white" onClick={onClose}/>
                </header>
                <form className="CommentModal__form">
                    <textarea onChange={this.onChange} className="CommentModal__textarea"></textarea>
                    <button onClick={onSend} className="CommentModal__send">Send</button>
                </form>
              
            </div>
        );
    }
} 