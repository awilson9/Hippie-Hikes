package com.hippiehikes;

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import io.realm.react.RealmReactPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HippieHikes";
    }
}
