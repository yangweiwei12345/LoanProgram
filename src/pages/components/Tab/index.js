import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

const styles = {
    wrapper: {
        height: 50,
        paddingLeft: 25,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#FFF",
    },
    leftBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",     
    },
    leftText: {
        width: 60,
        color: "#230E02",
        fontSize: 16,
    },
    textInput: {
        width: 200,
        height: 50,
        fontSize: 16,
    },
    rightBox: {
        flexDirection: "row",
        flex: 1,
        height: 50,
    }
}

class Tab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rightBoxRight: this.props.rightFlag
        }
    }

    render () {
        const {
            leftText,
            placeholder,
            style,
            HTMLTemplate
        } = this.props;
        const {
            rightBoxRight
        } = this.state;
        return (
            <View
                style={{
                    ...styles.wrapper,
                    ...style
                }}
            >
                <View
                    style={ styles.leftBox }
                >
                    <Text
                        style={ styles.leftText }
                    >{ leftText }</Text>
                    <TextInput
                        style={ styles.textInput }
                        placeholder={ placeholder }
                        placeholderText="#949494"
                    />
                </View>
                {
                    rightBoxRight
                        ? <View
                            style={ styles.rightBox }
                        >
                            { HTMLTemplate && HTMLTemplate() }
                        </View>
                        : null
                }
            </View>
        );
    }
}

export default Tab;