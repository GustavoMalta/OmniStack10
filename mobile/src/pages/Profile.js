import React from 'react';
import {View, Text} from 'react-native';
import {WebView}  from 'react-native-webview';

function Profile({navigation}){ 
    const username = navigation.getParam('github');
    return(
    <WebView style={{flex:1}} source={{uri:`https://github.com/${username}`}}>
        
    </WebView>
    )
    
    

}

export default Profile;