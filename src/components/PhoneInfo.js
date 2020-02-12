import React, { Component, Fragment } from "react";

class PhoneInfo extends Component {
    // default props 값 지정(props.info === undefined 시)
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }

    state = {
        editing : false,
        name : '',
        phone : ''
    }

    handleRemove = () => {
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }

    // editing 값 반전 용도
    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({
            editing: !editing
        });
    }

    // input 입력으로 onChange 이벤트 발생 시, 해당 state 값 변경!
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name] : value
        });
    }

    // editing 값이 바뀔 때마다 처리 할 로직 작성
    componentDidUpdate(prevProps, prevState) {
        const {info, onUpdate} = this.props;
        // false -> true로 변경된 경우
        if(!prevState.editing && this.state.editing) {
            this.setState({
                name : info.name,
                phone : info.phone
            });
        }

        // true -> false로 변경된 경우
        if(prevState.editing && !this.state.editing) {
            onUpdate(info.id, {
                name : this.state.name,
                phone : this.state.phone
            });
        }
    }

    shouldComponentUpdate(nextProps, nextStat) {
        if(!this.state.editing && !nextProps.editing && nextProps.info === this.props.info) {
            return false;
        }

        return true;
    }

    render() {
        console.log('render PhoneInfo : ' + this.props.info.id);
        const style = {
            border: '1px solid white',
            padding: '8px',
            margin: '8px'
        };

        const { editing } = this.state;
        // 수정 화면
        if(editing) {
            return (
                <div style={style}>
                    <div>
                        <input
                            value={this.state.name}
                            name='name'
                            placeholder='이름'
                            onChange={ this.handleChange }
                        />
                    </div>
                    <div>
                        <input
                            value={ this.state.phone }
                            name='phone'
                            placeholder='전화번호'
                            onChange={ this.handleChange }
                        />
                    </div>
                    <button onClick={ this.handleToggleEdit }>적용</button>
                    <button onClick={ this.handleRemove }>삭제</button>
                </div>
            );
        }
        const {name, phone} = this.props.info;

        return (
            <div style={style}>
                <div><b>{ name }</b></div>
                <div>{ phone }</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;