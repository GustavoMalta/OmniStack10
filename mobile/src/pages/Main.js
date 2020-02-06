import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import MapView , {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { lockAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api'

function Main({navigation}){
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInicialPosition(){
            const { granted } = await requestPermissionsAsync();
            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true, //para utilizar o GPS
                }); 

                const {latitude, longitude} = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadAllDevs();
        loadInicialPosition();
    }, [])
    async function loadAllDevs(){
        const response = await api.get('/devs');
        setDevs(response.data);
    }
    async function loadDevs(){
        const{latitude, longitude}=currentRegion;

        const response = await api.get('/search',{
            params:{
                lat: latitude, 
                lon: longitude,
                techs:techs,
            }
        });
        setDevs(response.data.devs);
    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

if(!currentRegion){
    return null;
}
    return(
        <>
    <MapView onRegionChangeComplete={handleRegionChanged}
             style={styles.map} 
             initialRegion={currentRegion}
        >
            {devs.map(dev=>(
            <Marker key={dev._id}
                coordinate={{
                latitude: dev.location.coordinates[1],
                longitude: dev.location.coordinates[0],

            }}>
                <Image style={styles.avatar} source={{uri:dev.avatar_url}}/>
                <Callout style={styles.box} onPress={()=>{
                    navigation.navigate('Profile', {github:dev.github})
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devBio}>{dev.bio}</Text>
                        <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                    </View>
                </Callout>
            </Marker>
            ))}
    </MapView>
    <View style={styles.searchForm}>
        <TextInput 
            style={styles.searchInput}
            placeholder="Buscar por Tecnologias"
            placeholderTextColor="#b58aff"
            autoCapitalize="words"
            autoCorrect={false} 
            value={techs}
            onChangeText={setTechs}       
            />
            <TouchableOpacity style={styles.searchButton} onPress={loadDevs}>
            <MaterialIcons name="person-pin" size={40} color="#fff"/>
            </TouchableOpacity>
    </View>
    </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex:1,
    },
    avatar:{
        width:50,
        height:50,
        borderWidth: 2,
        borderRadius: 4,
        borderColor:'#4b0075',
    },
    callout:{
        width: 250,
    },
    box:{
    },
    devName:{
        fontWeight:"bold",
        fontSize:16,
    },
    devBio:{
        color:"#666",
        marginTop:5,
    },
    devTechs:{
        marginTop: 5,
    },
    searchForm:{
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row",
    },
    searchInput:{
        flex:1,
        height: 50,
        backgroundColor: "#fff",
        color:"#333",
        borderRadius:25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset:{width:4, height:4},
        elevation: 5,
    },
    searchButton:{
        width: 50,
        height: 50,
        backgroundColor: "#8e4dff",
        borderRadius:25,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:15,
        elevation: 5,
    }
})

export default Main;