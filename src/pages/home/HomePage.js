import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen'

import Swiper from '../components/swiper';
import Container from '../components/container';
import Section from '../components/section';
import Button from '../components/Button';
import Toast from 'react-native-root-toast';

import { PX2DP_H, PX2DP_W } from '../../utils';
import { Images, variable } from '../../assets';
const { primary, gray } = variable;

export default class Home extends Component {

    static navigationOptions = {
        headerTitle: '贷款超市',
    };

    state = {
        banner: [],
        loanList: [],
        bannerData: []
    }

    // 请求banner
    getBannerData() {
        let me = this;

        axios.get('https://www.raindropbox365.com/api/banner?place=1001')
            .then(function (response) {
                if(response.status == 200) {
                    const { data } = response;
                    me.setState({
                        banner: data || []
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    // 请求今日爆款列表
    getLoanData() {
        let me = this;

        axios.get('https://www.raindropbox365.com/api/loan')
            .then(function (response) {
                if(response.status == 200) {
                    const { data } = response;
                    me.setState({
                        loanList: data || []
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    // 请求三个圆图列表
    getCircleData() {
        let me = this;

        axios.get('https://www.raindropbox365.com/api/banner?place=1002')
            .then(function (response) {
                if(response.status == 200) {
                    const { data } = response;
                    console.log(data);
                    me.setState({
                        bannerData: data || []
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    getUserInfo = cb => {
        axios
            .post("https://www.raindropbox365.com/api/sessions/check")
            .then(resp => {
                if (resp) {
                    if (resp.status == 200 && resp.data) {
                        this.setState({
                            phone: resp.data.account || "",
                            userID: resp.data.user_id || "",
                            isLogin: true
                        })
                        cb && cb(true);
                    } else {
                        cb && cb(false);
                    }
                }
            })
            .catch(err => {
                if (err && err.response) {
                    Toast.show(err.response.data, {
                        shadow: true,
                        position: Toast.positions.CENTER
                    });
                }
                
            })
    }

    apply = (id) => {
        const me = this;
        this.getUserInfo(flag => {
            if ( !flag ) {
                this.props.navigation.navigate('Login');
            } else {
                me.getApply(id);
            }
        })
    }

    // 申请
    getApply(id) {
        let me = this;

        axios.post('https://www.raindropbox365.com/api/loan/' + id + '/apply')
            .then(function (response) {
                console.log(response);
                if(response.status == 200 || response.status == 204) {
                    Toast.show('申请成功', {
                        shadow: true,
                        position: Toast.positions.CENTER
                    });
                } else {
                    Toast.show('申请失败', {
                        shadow: true,
                        position: Toast.positions.CENTER
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                Toast.show('申请失败', {
                    shadow: true,
                    position: Toast.positions.CENTER
                });
            });

    }

    componentDidMount() {
        if(Platform.OS === "android") {
            SplashScreen.hide();
        }
        this.getBannerData();
        this.getLoanData();
        this.getCircleData();
    }

    render() {
        const { navigation } = this.props;

        return (
            <ScrollView
                style={styles.scroll_wrapper}
            >
                <View style={styles.wrapper}>
                    <View
                        style={styles.header_wrapper}
                    >
                        <Swiper data={this.state.banner} />
                        <Boxs data={this.state.bannerData} />
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
                            <Button style={{ left: 0, marginLeft: 0, marginBottom: PX2DP_H(20) }} value="立即申请" onPress={() => { }} />
                        </View>
                    </Container>

                    <Title title="今日爆款" />
                    {
                        (this.state.loanList || []).map(item => {
                            return (<Container style={styles.container} key={item.loan_id}>
                                        <Section data={item} handleClick={() => { navigation.navigate('ListDetail', { loan_id: item.loan_id }) }} handleApplyClick={ () => { this.apply(item.loan_id) }} />
                                    </Container>)
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}

const Box = (props) => {
    const { data } = props;
    let uri = data.img ? { uri: data.img } : Images.fast_a_icon;

    return (
        <View style={styles.box}>
            <Image resizeMode='stretch' style={styles.box_image} source={uri} />
            <Text style={styles.box_tit}>{data.name}</Text>
        </View>
    )
}

const Boxs = (props) => {
    const { data } = props;
    return (
        <View style={styles.boxs}>
            {
                data.map((item, index) => {
                    return <Box key={index} data={item} />
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
    container: {
        marginBottom: 10
    },
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
        marginLeft: PX2DP_H(15),
        marginRight: PX2DP_H(15)
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
        width: PX2DP_W(38),
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
