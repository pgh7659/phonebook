import React, { Component } from "react";
import PhoneInfo from "./PhoneInfo";

class PhoneInfoList extends Component {
    static defaultProps = {
        data: [],
        onRemove: () => console.log('onRemove function is not defined!'),
        onUpdate: () => console.log('onUpdate function is not defined!')
    }

    shouldComponentUpdate(nextProps, nextState) {
        // false인 경우 update 안함
        return nextProps.data !== this.props.data;
    }

    render() {
        const { data, onRemove, onUpdate } = this.props;
        console.log('PhoneInfoList :: onUpdate');
        const list = data.map(
            info => (
                <PhoneInfo
                    key={info.id}
                    info={info}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                />
            )
        );

        return (
            <div>
                {list}
            </div>
        )
    }
}

export default PhoneInfoList;