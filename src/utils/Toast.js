'use strict';

//toast
// import ToastTip from 'react-native-root-toast';

let toast;
const ToastUtil = {

	/**
	 * 显示toast
	 * @params text 要显示的字符串
	 * @param duration = 'long' | 'short' 显示时间
	 */
	show: function(text, duration){
		if(toast !== undefined){
			ToastTip.hide(toast);
		}
		toast = ToastTip.show(text, {
		    duration: duration == 'long' ? ToastTip.durations.LONG : ToastTip.durations.SHORT,
		    position: ToastTip.positions.BOTTOM,
		    shadow: false,
		    backgroundColor: 'rgba(0,0,0,.8)',
		    animation: true,
		    hideOnPress: false,
		    delay: 0,
		    onShow: () => {
		        // calls on toast\`s appear animation start
		    },
		    onShown: () => {
		        // calls on toast\`s appear animation end.
		    },
		    onHide: () => {
		        // calls on toast\`s hide animation start.
		    },
		    onHidden: () => {
		        // calls on toast\`s hide animation end.
		    }
		});
		return toast;
	},

	/**
	 * 隐藏toast
	 * @params toast 要隐藏的toast对象
	 */
	hide: function(toast){
		ToastTip.hide(toast);
	},

	/**
	 * 定时器
	 * @params callback 回调函数
	 * @params time 定时时间
	 */
	timer: function(callback, time){

		return setTimeout(function(){
			callback();
		}, time);
	}
};
export default ToastUtil;