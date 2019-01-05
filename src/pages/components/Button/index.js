import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';

const styles = {
    defauleStyle: {
        width: 310,
        height: 40,
        backgroundColor: "#F64939",
        color: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        position: 'relative',
        left: "50%",
        marginLeft: -155,
        borderRadius: 100,
    },
    textStyle: {
        color: "#FFF",
    }
}

class Button extends Component {
    constructor(props) {
        super(props)
    }

    handlePress = fn => {
        fn && fn();
    }

    render () {
        const {
            value,
            onPress,
            style,
            textColor
        } = this.props;
        console.log(style)
        return (
            <TouchableOpacity
                style={{
                    ...styles.defauleStyle,
                    ...style
                }}
                onPress={() => (this.handlePress(onPress))}
            >
                <Text
                    style={{
                        ...styles.textStyle,
                        color: textColor || "#fff",
                    }}
                >{ value }</Text>
            </TouchableOpacity>
        );
    }
}

export default Button;