import React, { Component } from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Image } from 'react-native';

import Swiper from '../components/swiper';
import Container from '../components/container';
import { PX2DP_H, PX2DP_W } from '../../utils';
import { Images, variable } from '../../assets';
const { primary, gray } = variable;

const bannerData = [{
    img: Images.fast_a_icon,
    txt: '高通过率'
}, {
    img: Images.interest_b_icon,
    txt: '大额低息'
}, {
    img: Images.card_c_icon,
    txt: '信用卡'
}];

export default class Home extends Component {
    static navigationOptions = {
        title: '贷款超市',
    };
    render() {
        return (
            <ScrollView
                style={styles.scroll_wrapper}
            >
                <View style={styles.wrapper}>
                    <View
                        style={styles.header_wrapper}
                    >
                        <Swiper />
                        <Boxs data={bannerData} />
                    </View>
                </View>

                <View style={styles.body_wrapper}>
                    <Title title="平台推荐" />
                    <Container>
                        <View style={styles.platform_recommend}>
                            <Image style={styles.platform_img} source={Images.groom_icon} />
                            <View style={styles.platform_body}>
                                <Image style={styles.platform_money} source={Images.m_icon} />
                                <Text style={styles.platform_money_txt}>1000 - 2000</Text>
                            </View>
                            <Text style={styles.platform_get_money}>3分钟下款</Text>
                        </View>
                    </Container>

                    <Title title="今日爆款" />
                    <Container>
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
                    </Container>
                    <Container>
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
                    </Container>
                </View>
            </ScrollView>
        );
    }
}

const Box = (props) => {
    const { data } = props;
    return (
        <View style={styles.box}>
            <Image style={styles.box_image} source={data.img} />
            <Text style={styles.box_tit}>{data.txt}</Text>
        </View>
    )
}

const Boxs = (props) => {
    const { data } = props;
    return (
        <View style={styles.boxs}>
            {
                data.map(item => {
                    return <Box data={item} />
                })
            }
        </View>
    )
}

const Title = (props) => {
    const { title } = props;

    return (
        <View style={styles.title_wrapper}>
            <Image style={styles.title_icon} source={Images.label_icon} />
            <Text style={styles.title_txt}>{ title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    scroll_wrapper: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    wrapper: {
        flex: 1,
        alignItems: 'center'
    },
    header_wrapper: {
        backgroundColor: '#fff',
    },
    body_wrapper: {
        marginLeft: 15,
        marginRight: 15
    },

    platform_recommend: {
        paddingLeft: PX2DP_W(18),
        paddingRight: PX2DP_W(18),
        alignItems: 'center'
    },
    platform_img: {
        width: PX2DP_W(60),
        height: PX2DP_W(23),
        marginTop: PX2DP_W(20),
        marginBottom: PX2DP_W(20)
    },
    platform_body: {
        flexDirection: 'row',
        position: 'relative'
    },
    platform_money: {
        width: PX2DP_W(8),
        height: PX2DP_W(12),
        position: 'absolute',
        left: -15,
        bottom: 6
    },
    platform_money_txt: {
        fontSize: 26,
        color: primary,
        fontWeight: 'bold'
    },
    platform_get_money: {
        fontSize: 12,
        color: '#949494',
        marginTop: PX2DP_W(10),
        marginBottom: PX2DP_W(25)
    },
    
    boxs: {
        flexDirection: 'row',
        width: '100%',
        height: PX2DP_H(75),
        marginTop: 20
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: PX2DP_H(75)
    },
    box_image: {
        width: PX2DP_W(37),
        height: PX2DP_H(37),
    },
    box_tit: {
        fontSize: 13,
        color: '#666',
        marginTop: 6
    },

    title_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15
    },
    title_icon: {
        width: PX2DP_W(4),
        height: PX2DP_H(15)
    },
    title_txt: {
        fontSize: 16,
        color: '#230E02',
        fontWeight: 'bold',
        marginLeft: 10
    }
})

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
        alignItems: 'center'
    },
    hot_item_left: {

    },
    hot_item_center: {
        width: 2,
        height: 24,
        backgroundColor: '#eee',
        marginLeft: 15,
        marginRight: 15
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