package com.coreevent;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new RNSpinkitPackage(),
           new MainReactPackage(),
            new BlurViewPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new ReactNativeI18n(),
            new GoogleAnalyticsBridgePackage(),
            new RCTCameraPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
