import React, { Component } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

import { PX2DP_H, PX2DP_W } from '../../utils';
import { Images, variable } from '../../assets';
const { primary, gray } = variable;

export default class ListDetail extends Component {

    static navigationOptions = {
        headerTitle: '融360'
    };

    state = {
        detail: {}
    }

    componentDidMount() {
        const { navigation } = this.props;
        const loan_id = navigation.getParam('loan_id', '');
        if(!loan_id) {
            return;
        }
        this.getLoanDetail(loan_id);
    }

    // 请求详情
    getLoanDetail(id) {
        let me = this;
        let url = 'https://loan.hague.tech/api/loan/' + id;

        axios.get(url)
            .then(function (response) {
                if(response.status == 200) {
                    const { data } = response;
                    me.setState({
                        detail: data || {}
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { detail } = this.state;

        return (
            <ScrollView style={styles.scroll_wrapper}>
                <View style={styles.wrapper}>
                    <ImageBackground source={Images.my_bg_icon} style={{width: '100%', height: PX2DP_H(130)}}>
                        <View style={styles.header}>
                            <Image style={styles.header_img} source={Images.limit_icon}/>
                            <Text style={styles.header_money}>{ detail.amount }</Text>
                            <Text style={styles.header_txt}>额度范围（元）</Text>
                        </View>
                    </ImageBackground>
                    <View style={[styles.body_box, styles.fx_row]}>
                        <View style={styles.body_left}>
                            <View style={styles.body_txt}>
                                <Text style={styles.body_txt1}>{ detail.accession }</Text>
                                <Text style={styles.body_txt2}>人</Text>
                            </View>
                            <Text style={styles.body_txt3}>已申请成功 浏览量：{ detail.page_view }</Text>
                        </View>
                        <Image style={styles.body_img} source={Images.img_icon}/>
                    </View>
                    <View style={styles.body_box}>
                        <View style={styles.body_list_tit}>
                            <Image style={styles.body_list_tit_img} source={Images.one_icon}/>
                            <Text style={styles.body_list_tit_txt}>基本信息</Text>
                        </View>
                        <View style={styles.body_list_item}>
                            <Text style={styles.body_list_item_label}>期限范围：</Text>
                            <Text style={styles.body_list_tit_value}>{ detail.deadline }</Text>
                        </View>
                        <View style={styles.body_list_item}>
                            <Text style={styles.body_list_item_label}>利息范围：</Text>
                            <Text style={styles.body_list_tit_value}>{ detail.interest }</Text>
                        </View>
                        <View style={styles.body_list_item}>
                            <Text style={styles.body_list_item_label}>审核时间：</Text>
                            <Text style={styles.body_list_tit_value}>{ detail.speed }</Text>
                        </View>
                    </View>
                    <View style={styles.body_box}>
                        <View style={styles.body_list_tit}>
                            <Image style={styles.body_list_tit_img} source={Images.one_icon}/>
                            <Text style={styles.body_list_tit_txt}>申请条件</Text>
                        </View>
                        <View style={styles.body_list_item}>
                            <Text style={styles.body_list_item_label}>1：</Text>
                            <Text style={styles.body_list_tit_value}>{ detail.requirements }</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll_wrapper: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    header: {
        width: PX2DP_W(375),
        height: PX2DP_H(130),
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_img: {
        width: PX2DP_W(13),
        height: PX2DP_W(12)
    },
    header_money: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'DINAlternate-Bold',
        marginTop: 20,
        marginBottom: 15
    },
    header_txt: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'DINAlternate-Bold'
    },
    body_box: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingTop: 15,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    fx_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    body_left: {
        flex: 1
    },
    body_txt: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 6
    },
    body_txt1: {
        fontSize: 21,
        color: primary,
        fontFamily: 'DINAlternate-Bold'
    },
    body_txt2: {
        fontSize: 12,
        color: primary,
        fontFamily: 'DINAlternate-Bold',
        marginLeft: 4,
        marginBottom: 2
    },
    body_txt3: {
        fontSize: 13,
        color: '#666'
    },
    body_img: {
        width: PX2DP_W(71),
        height: PX2DP_W(52)
    },

    body_list_tit: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    body_list_tit_img: {
        width: PX2DP_W(25),
        height: PX2DP_W(20)
    },
    body_list_tit_txt: {
        fontSize: 15,
        color: '#230E02',
        marginLeft: 8,
        fontFamily: 'DINAlternate-Bold'
    },
    body_list_item: {
        flexDirection: 'row',
        marginBottom: 10
    },
    body_list_item_label: {
        fontSize: 13,
        color: '#666',
        fontFamily: 'DINAlternate-Bold'
    },
    body_list_tit_value: {
        fontSize: 13,
        color: '#230E02',
        fontFamily: 'DINAlternate-Bold'
    }
})