package com.loanproject;

import android.os.Bundle; // 添加这一行
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // 添加这一行（这里导入的跟MainApplication.java 文件导入的不一样哦）

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // 添加这一行
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "LoanProject";
    }
}
