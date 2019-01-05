import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
} from 'react-native';

import Button from '../components/Button';

const styles = {
    wrapper: {
        flex: 1,
        backgroundColor: "#F8F8F8"
    },
    titleBox: {
        backgroundColor: "#fff",
        height: 50,
        paddingLeft: 18,
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: 'row',
    },
    phoneNum: {
        color: "red"
    },
    textInput: {
        height: 180,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#FFF"
    }
};

class FeedBackPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textInputValue: ""
        }
    }

    static navigationOptions = {
        title: '反馈中心',
    };

    textInputChange = (value) => {
        let val = value && value.trim();
        this.setState({
            textInputValue: val
        })
    }

    submit = () => {
        let {
            textInputValue
        } = this.state;
        console.log(textInputValue)
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View
                    style={ styles.titleBox }
                >
                    <Text>如有疑问， 请拨打客服热线:</Text>
                    <Text
                        style={ styles.phoneNum }
                    >400-xxx-xxx</Text>
                </View>
                <TextInput
                    style={ styles.textInput }
                    placeholder="请填写您的意见或建议..."
                    multiline={ true }
                    onChangeText={ this.textInputChange }
                />
                <Button
                    value="提交"
                    onPress={ this.submit }
                    style={{
                        marginTop: 38,
                    }}
                />
            </View>
        );
    }
}

export default FeedBackPage;