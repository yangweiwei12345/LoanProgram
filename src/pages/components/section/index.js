import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { PX2DP_H, PX2DP_W } from '../../../utils';
import { Images, variable } from '../../../assets';

export default class Section extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={hotStyles.hot_item}>
                <View style={hotStyles.hot_item_tit}>
                    <Image style={hotStyles.hot_item_tit_img} source={Images.card_c_icon} />
                    <Text style={hotStyles.hot_item_tit_txt}>融360</Text>
                </View>
                <View style={hotStyles.hot_item_body}>
                    <View style={hotStyles.hot_item_left}>
                        <Text style={hotStyles.hot_item_left_money}>1000 - 5000</Text>
                        <Text style={hotStyles.hot_item_left_txt}>额度范围（元）</Text>
                    </View>
                    <View style={hotStyles.hot_item_center}></View>
                    <View style={hotStyles.hot_item_right}>
                        <View style={hotStyles.hot_item_right_txt}>
                            <Text style={hotStyles.hot_item_right_tit}>融360放款速度：2小时</Text>
                            <Text style={hotStyles.hot_item_right_tit}>参考月费率：0.83-2.33%</Text>
                            <Text style={hotStyles.hot_item_right_tit}>贷款期限：15天</Text>
                        </View>
                        <Image style={hotStyles.hot_item_right_btn} source={Images.home_apply_bt} />
                    </View>
                </View>
            </View>
        );
    }
}

const hotStyles = StyleSheet.create({
    hot_item: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        marginBottom: 20
    },
    hot_item_tit: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    hot_item_tit_img: {
        width: PX2DP_W(22),
        height: PX2DP_W(22)
    },
    hot_item_tit_txt: {
        fontSize: 15,
        color: '#230E02',
        marginLeft: 10
    },
    hot_item_body: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    hot_item_left: {

    },
    hot_item_center: {
        width: 2,
        height: 24,
        backgroundColor: '#eee',
        marginLeft: 10,
        marginRight: 10
    },
    hot_item_left_money: {
        fontSize: 18,
        color: '#230E02',
        fontWeight: 'bold'
    },
    hot_item_left_txt: {
        fontSize: 11,
        color: '#949494',
        marginTop: 10
    },
    hot_item_right: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    hot_item_right_txt: {
    },
    hot_item_right_tit: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6
    },
    hot_item_right_btn: {
        width: PX2DP_W(60),
        height: PX2DP_W(60)
    }
});