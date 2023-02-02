/**
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, Image, Text} from 'react-native';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {launchImageLibrary} from 'react-native-image-picker';

// https 의 uri 가 아닌, 로컬기기에서 나오는 file or ph// 의 파일로 리사이징 해야 동작한다.
// 위 문제가 안드로이드에서는 상관없지만, ios 에서는 해당사항이 적용된다.
// 그래서 서버로 업로드 하기전에 사진을 뽑고나서 리사이징 후 업로드를 해야한다.

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
      'file:///private/var/mobile/Containers/Data/Application/026DE1D3-B6C2-4518-A83F-3B5C729E09F2/tmp/1p7s8s.jpg',
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
