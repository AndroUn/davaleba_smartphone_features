import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType } from 'expo-camera'

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(false)
    const [type, setType] = useState(CameraType.back)
    const [capturedPictureUri, setCapturedPictureUri] = useState(null)
    const cameraRef = useRef(null)

    useEffect(()=>{
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    },[])

    const handleCapture = async () => {
        if (cameraRef.current){
            const photo = await cameraRef.current.takePictureAsync()
            setCapturedPictureUri(photo.uri)
        }
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }

  return (
    <View>
      {hasPermission ? (<Camera style={{width: 400, height: 500 }} ref={cameraRef} type={type}/>) : (<Text>No access to camera</Text>)}

      <View style={styles.row}>
        {capturedPictureUri && (<Image source={{uri: capturedPictureUri}} style={styles.photo}/>)}
        <Pressable style={styles.buttonWrapper} onPress={handleCapture}>
                <Image style={styles.btn} source={require('../img/buttonIcon.png')}/>
        </Pressable>
        <Pressable style={styles.buttonWrapper} onPress={toggleCameraType}>
                <Image style={styles.switcher} source={require('../img/switch.png')}/>
        </Pressable>
      </View>
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({
    row: {
        marginHorizontal: 35,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    buttonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btn: {
        width: 80,
        height: 80,
    },
    switcher: {
        width: 50,
        height: 50,
    },
    photo: {
        width: 50,
        height: 50,
        marginTop: 35,
        marginLeft: 10,
        borderRadius: 5
    }
})