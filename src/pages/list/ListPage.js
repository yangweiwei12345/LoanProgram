import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from './DefaultTabBar';

import Container from '../components/container';
import Section from '../components/section';
import Tabs from '../components/tabs';

import { PX2DP_H, PX2DP_W } from '../../utils';


export default class List extends Component {

    static navigationOptions = {
        title: '列表',
    };

    render() {
        return (
            <View style={styles.wrapper}>

                <ScrollableTabView
                    style={styles.container_con}
                    renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 1)' />}
                >
                    <ScrollView tabLabel="高通过率">
                        <View style={[styles.swiper_wrapper, styles.mr_t10]}>
                            <Container style={styles.container}>
                                <Section />
                            </Container>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="大额低息">
                        <View style={[styles.swiper_wrapper, styles.mr_t10]}>
                            <Container style={styles.container}>
                                <Section />
                            </Container>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="信用卡">
                        <View style={[styles.swiper_wrapper, styles.mr_t10]}>
                            <Container style={styles.container}>
                                <Section />
                            </Container>
                        </View>
                    </ScrollView>
                </ScrollableTabView>
                
            </View>
        );
    }
}

const img = () => {
    
}

const styles = StyleSheet.create({
    container_con: {
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    swiper_wrapper: {
        marginLeft: PX2DP_H(15),
        marginRight: PX2DP_H(15)
    },
    container: {
        marginBottom: 10
    },
    mr_t10: {
        marginTop: 10
    },
    scene: {
        flex: 1,
    },
})