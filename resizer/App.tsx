/**
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, Image, Text} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import {launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [pickUri, setPickUri] = useState('');

  const pickImage = async () => {
    const picked = await launchImageLibrary({mediaType: 'photo'});

    if (picked.assets && picked.assets[0].uri !== undefined) {
      setPickUri(picked.assets[0].uri);
    }

    console.log(JSON.stringify(picked, null, 5));
  };

  const getImageSize = () => {
    Image.getSize(
      pickUri,
      (width, height) => {
        console.log('width:', width);
        console.log('height:', height);
      },
      errorMsg => {
        console.log(errorMsg);
      },
    );
  };

  const resize = async () => {
    const response = await ImageResizer.createResizedImage(
      pickUri,
      1280,
      1280,
      'JPEG',
      100,
    );

    console.log(JSON.stringify(response, null, 5));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 30, marginTop: 20}} onPress={pickImage}>
        pickImage
      </Text>

      <Text style={{fontSize: 30}} onPress={getImageSize}>
        getSize
      </Text>

      <Text style={{fontSize: 30, marginTop: 20}} onPress={resize}>
        resize
      </Text>
    </SafeAreaView>
  );
};

export default App;
