import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { PX2DP_W, PX2DP_H } from '../../../utils';

const styles = {
    wrapper: {
        height: PX2DP_H(50),
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
        width: PX2DP_W(60),
        color: "#230E02",
        fontSize: 16,
    },
    textInput: {
        width: PX2DP_W(200),
        height: PX2DP_H(50),
        fontSize: 16,
        padding: 0,
    },
    textInputW: {
        flex: 1,
        paddingRight: 20,
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
            HTMLTemplate,
            onChange,
            keyboardType,
            maxLength,
            key,
            secureTextEntry,
            onBlur,
            editable,
            value,
            noClear,
            textInputStyle
        } = this.props;
        const {
            rightBoxRight
        } = this.state;
        const baseStyle = rightBoxRight ? styles.textInput : styles.textInputW;
        const textInputBaseStyle = {
            ...baseStyle
        }
        return (
            <View
                style={{
                    ...styles.wrapper,
                    ...style
                }}
                key={ key || "___" }
            >
                <View
                    style={ styles.leftBox }
                >
                    <Text
                        style={ styles.leftText }
                    >{ leftText }</Text>
                    <TextInput
                        style={{
                            ...textInputBaseStyle,
                            ...textInputStyle
                        }}
                        placeholder={ placeholder }
                        placeholderText="#949494"
                        underlineColorAndroid="transparent"
                        textAlignVertical='top'
                        clearButtonMode={ noClear ? "never" : "always" }
                        keyboardType={ keyboardType || "default" }
                        maxLength={ maxLength || 100000}
                        onChangeText={ (text) => { onChange && onChange(text) } }
                        secureTextEntry={ secureTextEntry || false }
                        onBlur={ () => { onBlur && onBlur() } }
                        editable={ JSON.stringify(editable) == "false" ? false : true }
                        defaultValue={ value || "" }
                    />
                </View>
                {
                    rightBoxRight
                        ? <View
                            style={styles.rightBox}
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