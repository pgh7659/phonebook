import React, {Component} from 'react';

class PhoneForm extends Component {
    state = {
        name : '',
        phone : ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        // reloading 방지
        e.preventDefault();

        // state 값을 onCreate를 통해 부모에게 전달
        this.props.onCreate(this.state);
        // state initialize
        this.setState({
            name: '',
            phone: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder='이름' value={ this.state.name } onChange={ this.handleChange } name='name' />
                <input placeholder='전화번호' value={ this.state.phone } onChange={ this.handleChange } name='phone' />
                {/* <div><p>{ this.state.name } { this.state.phone }</p></div> */}
                <button type='submit'>등록</button>
            </form>
        )
    }
}

export default PhoneForm;