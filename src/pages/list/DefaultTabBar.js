import React, { Component } from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';
const { ViewPropTypes } = ReactNative;

import { Images, variable } from '../../assets';
const { primary } = variable;

const {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
} = ReactNative;

class DefaultTabBar extends Component {
    constructor(props) {
        super(props);

        this.renderTab = this.renderTab.bind(this);
    }

    static propTypes = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: ViewPropTypes.style,
        renderTab: PropTypes.func,
        underlineStyle: ViewPropTypes.style,
    }

    static defaultProps = {
        activeTextColor: '#230E02',
        inactiveTextColor: '#666',
        backgroundColor: null,
    }

    renderTabOption(name, page) {
    }

    renderTab(name, page, isTabActive, onPressHandler) {
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'normal' : 'normal';
        const img = isTabActive ? <Image style={styles.img} source={Images.wd_icon_gd} /> : <Text></Text>;

        const DOM = (<TouchableOpacity
                        style={{flex: 1}}
                        key={name}
                        activeOpacity={.8}
                        onPress={() => onPressHandler(page)}
                    >
                        <View style={[styles.tab, this.props.tabStyle]}>
                            <Text style={[{color: textColor, fontWeight}, textStyle, ]}>
                                {name}
                            </Text>
                            {img}
                        </View>
                    </TouchableOpacity>);

        return DOM;
    }

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            height: 2,
            backgroundColor: primary,
            bottom: 0,
        };

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  containerWidth / numberOfTabs],
        });

        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                {
                    this.props.tabs.map((name, page) => {
                        const isTabActive = this.props.activeTab === page;
                        const renderTab = this.props.renderTab || this.renderTab;
                        
                        return renderTab(name, page, isTabActive, this.props.goToPage);
                    })
                }
                <Animated.View
                    style={[
                        tabUnderlineStyle,
                        {
                        transform: [
                            { translateX },
                        ]
                        },
                        this.props.underlineStyle,
                    ]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: 'transparent',
    },
    img: {
        width: 9,
        height: 6,
        marginLeft: 4
    }
});

export default DefaultTabBar;
