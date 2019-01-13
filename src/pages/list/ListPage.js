import React, { Component } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from './DefaultTabBar';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

import Container from '../components/container';
import Section from '../components/section';

import { PX2DP_H, PX2DP_W } from '../../utils';
import { FlatList } from 'react-native-gesture-handler';

class List extends Component {

    static navigationOptions = {
        headerTitle: '列表',
    };

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.wrapper}>

                <ScrollableTabView
                    style={styles.container_con}
                    renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 1)' />}
                >
                    <ScrollView1 tabLabel="高通过率" navigation={navigation} />
                    <ScrollView2 tabLabel="大额低息" navigation={navigation} />
                    <ScrollView3 tabLabel="信用卡" navigation={navigation} />
                </ScrollableTabView>
                
            </View>
        );
    }
}

class ScrollView1 extends Component {
    state = {
        list: [],
        refreshing: false,
        isMore: true,
        isLoading: false,
        offset: 0,
        pageSize: 15
    }

    componentDidMount() {
        this.getLoanData();
    }

    getLoanData() {
        let me = this;
        const { offset, pageSize } = me.state;
        const limit = offset + pageSize;

        axios.get('https://loan.hague.tech/api/loan?sort=speed&offset=' + offset + '&limit=' + limit)
            .then(function (response) {
                if(response.status == 200) {
                    const { data } = response;
                    const listData = data || [];

                    if(listData.length < pageSize) {
                        me.setState({
                            isMore: false
                        });
                    } else {
                        me.setState({
                            isMore: true,
                            offset: offset + pageSize
                        });
                    }
                    me.setState({
                        list: listData
                    });
                }

                me.setState({
                    refreshing: false,
                    isLoading: false
                });
            })
            .catch(function (error) {
                console.log(error);
                me.setState({
                    refreshing: false,
                    isLoading: false
                });
            });

    }

    _onRefresh() {
        const me = this;
        const { refreshing, isLoading } = me.state;

        // 如果正在刷新或加载更多，退回
        if(refreshing || isLoading) return;

        me.setState({
            isMore: true,
            offset: 0,
            refreshing: true
        }, () => {
            me.getLoanData();
        });
    }

    _renderItem({item}) {
        const { navigation } = this.props;

        return (
            <Container style={styles.container} key={item.loan_id}>
                <Section data={item} handleClick={() => { navigation.navigate('ListDetail', { loan_id: item.loan_id }) }} />
            </Container>
        );
    }

    _renderEndReach() {
        const me = this;
        const { refreshing, isLoading, isMore } = me.state;

        // 如果正在刷新或加载更多，退回
        if(refreshing || isLoading || !isMore) return;

        me.getLoanData();
    }

    render() {

        return(
            <FlatList
                data={this.state.list}
                renderItem={this._renderItem.bind(this)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                onEndReached={this._renderEndReach.bind(this)}
                ListFooterComponent={this.state.isMore ? <View style={styles.more_view}><Text style={styles.more_text}>上拉加载更多</Text></View> : <View style={styles.more_view}><Text style={styles.more_text}>拉到底啦...</Text></View>}
            />
        )
    }
}

class ScrollView2 extends Component {
    state = {
        list: [],
        refreshing: false,
        isMore: true,
        isLoading: false,
        offset: 0,
        pageSize: 15
    }

    componentDidMount() {
        this.getLoanData();
    }

    getLoanData() {
        let me = this;
        const { offset, pageSize } = me.state;
        const limit = offset + pageSize;

        axios.get('https://loan.hague.tech/api/loan?sort=interest&offset=' + offset + '&limit=' + limit)
            .then(function (response) {
                if(response.status == 200) {
                    const { data } = response;
                    const listData = data || [];

                    if(listData.length < pageSize) {
                        me.setState({
                            isMore: false
                        });
                    } else {
                        me.setState({
                            isMore: true,
                            offset: offset + pageSize
                        });
                    }
                    me.setState({
                        list: listData
                    });
                }

                me.setState({
                    refreshing: false,
                    isLoading: false
                });
            })
            .catch(function (error) {
                console.log(error);
                me.setState({
                    refreshing: false,
                    isLoading: false
                });
            });

    }

    _onRefresh() {
        const me = this;
        const { refreshing, isLoading } = me.state;

        // 如果正在刷新或加载更多，退回
        if(refreshing || isLoading) return;

        me.setState({
            isMore: true,
            offset: 0,
            refreshing: true
        }, () => {
            me.getLoanData();
        });
    }

    _renderItem({item}) {
        const { navigation } = this.props;

        return (
            <Container style={styles.container} key={item.loan_id}>
                <Section data={item} handleClick={() => { navigation.navigate('ListDetail', { loan_id: item.loan_id }) }} />
            </Container>
        );
    }

    _renderEndReach() {
        const me = this;
        const { refreshing, isLoading, isMore } = me.state;

        // 如果正在刷新或加载更多，退回
        if(refreshing || isLoading || !isMore) return;

        me.getLoanData();
    }

    render() {
        return(
            <FlatList
                data={this.state.list}
                renderItem={this._renderItem.bind(this)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                onEndReached={this._renderEndReach.bind(this)}
                ListFooterComponent={this.state.isMore ? <View style={styles.more_view}><Text style={styles.more_text}>上拉加载更多</Text></View> : <View style={styles.more_view}><Text style={styles.more_text}>拉到底啦...</Text></View>}
            />
        )
    }
}

class ScrollView3 extends Component {

    state = {
        list: [],
        refreshing: false,
        isMore: true,
        isLoading: false,
        offset: 0,
        pageSize: 15
    }

    componentDidMount() {
        this.getLoanData();
    }

    getLoanData() {
        let me = this;
        const { offset, pageSize } = me.state;
        const limit = offset + pageSize;

        axios.get('https://loan.hague.tech/api/banner?place=2001&&offset=' + offset + '&limit=' + limit)
            .then(function (response) {
                if(response.status == 200) {
                    const { data } = response;
                    const listData = data || [];
                    console.log(listData);

                    if(listData.length < pageSize) {
                        me.setState({
                            isMore: false
                        });
                    } else {
                        me.setState({
                            isMore: true,
                            offset: offset + pageSize
                        });
                    }
                    me.setState({
                        list: listData
                    });
                }

                me.setState({
                    refreshing: false,
                    isLoading: false
                });
            })
            .catch(function (error) {
                console.log(error);
                me.setState({
                    refreshing: false,
                    isLoading: false
                });
            });

    }

    _onRefresh() {
        const me = this;
        const { refreshing, isLoading } = me.state;

        // 如果正在刷新或加载更多，退回
        if(refreshing || isLoading) return;

        me.setState({
            isMore: true,
            offset: 0,
            refreshing: true
        }, () => {
            me.getLoanData();
        });
    }

    _renderItem({item}) {

        return (
            <Img key={item.banner_id} data={item}/>
        );
    }

    _renderEndReach() {
        const me = this;
        const { refreshing, isLoading, isMore } = me.state;

        // 如果正在刷新或加载更多，退回
        if(refreshing || isLoading || !isMore) return;

        me.getLoanData();
    }

    render() {
        return(
            <FlatList
                data={this.state.list}
                renderItem={this._renderItem.bind(this)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                onEndReached={this._renderEndReach.bind(this)}
                ListFooterComponent={this.state.isMore ? <View style={styles.more_view}><Text style={styles.more_text}>上拉加载更多</Text></View> : <View style={styles.more_view}><Text style={styles.more_text}>拉到底啦...</Text></View>}
            />
        )
    }
}

const Img = (props) => {

    const { data } = props;
    let uri = data.url ? { uri: data.url } : require('../../assets/test/1.jpg');
    
    return (
        <Image style={styles.item_img} source={uri}/>
    );
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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    mr_t10: {
        marginTop: 10
    },
    item_img: {
        width: PX2DP_W(355),
        height: PX2DP_H(97),
        overflow: 'hidden',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#fff'
    },
    more_view: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30
    },
    more_text: {
        fontSize: 13,
        color: '#888'
    }
})

export default withNavigation(List);