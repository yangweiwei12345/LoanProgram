/**
 * Created by eleven on 16/6/3.
 */

import React,{
    NetInfo
} from 'react-native';

const TAG_NETWORK_CHANGE = "NetworkChange";
const NOT_NETWORK_CODE = 2000;
const ERROR_NETWORK_CODE = 2001;
const NOT_NETWORK = "你的网络连接似乎断开了，请检查";
const ERROR_NETWORK = "网络错误，请重试";

/***
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
const removeEventListener = (tag,handler) => {
    NetInfo.isConnected.removeEventListener(tag, handler);
}

/***
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
const addEventListener = (tag,handler)=>{
    NetInfo.isConnected.addEventListener(tag, handler);
}

export default{
    addEventListener,
    removeEventListener,
    NOT_NETWORK,
    ERROR_NETWORK,
    NOT_NETWORK_CODE,
    ERROR_NETWORK_CODE,
    TAG_NETWORK_CHANGE
}
