import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';
import { PX2DP_W, PX2DP_H } from '../../../utils';
import { hidden } from 'ansi-colors';


const dot = () => {
    return (
        <View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
    );
}

const activeDot = () => {
    return (
        <View style={{backgroundColor:'#007aff', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
    );
}

export default class SwiperSlide extends Component {
    render(){
        const { data } = this.props;

        return (
            <Swiper
                style={styles.wrapper}
                autoplay
                paginationStyle={{
                    bottom: -23
                }}
                dot={<View style={{backgroundColor: '#F3F3F3', width: 5, height: 5, borderRadius: 3, marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 3}} />}
                activeDot={<View style={{backgroundColor: '#aaa', width: 5, height: 5, borderRadius: 3, marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 3}} />}
            >
                {
                    data.map(item => {
                        return (<View style={styles.slide} key={item.banner_id}>
                                    <Image resizeMode='stretch' style={styles.image} source={{ uri: item.img }} />
                                </View>)
                    })
                }
            </Swiper>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        width: PX2DP_W(345),
        height: PX2DP_H(145),
        overflow: 'hidden',
        marginLeft: 15
    },
    slide: {
        width: PX2DP_W(345),
        height: PX2DP_H(145),
        // backgroundColor: '#9DD6EB',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
        overflow: 'hidden',
    },
    image: {
        width: PX2DP_W(345),
        height: PX2DP_H(145)
    }
})