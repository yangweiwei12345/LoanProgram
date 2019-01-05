'use strict';

import { Dimensions } from 'react-native';

//设备宽度
const deviceW = Dimensions.get('window').width;

//标准页面
const baseWidth = 375;
//高度适配的最大宽度
const maxWidth = 500;
//高度适配最小宽度
const minWidth = 375;

//宽的适配
export function PX2DP_W(px) {
	return px * deviceW / baseWidth;
}

//高度适配
export function PX2DP_H(px) {
	let width = deviceW >= maxWidth ? maxWidth : ( deviceW < minWidth ? minWidth : deviceW );

	return px * width / baseWidth;
}