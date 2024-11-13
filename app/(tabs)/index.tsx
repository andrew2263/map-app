// import { Image, StyleSheet, Platform } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{' '}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

import React, { useState, useEffect, useRef } from "react";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";

const HomeScreen = () => {
  // const [route, setRoute] = useState([
  //   { latitude: 47.0236629103391,
  //     longitude: 28.83388199981741, },
  //   { latitude: 47.02947114400767, longitude: 28.825258886696957 },
  //   { latitude: 47.03168507891203, longitude: 28.828368066377227 },
  //   { latitude: 47.03731631295645, longitude: 28.81981518842876 }
  // ]); // Пример маршрута

  const route = [
    { latitude: 47.0236629103391, longitude: 28.83388199981741, },
    { latitude: 47.02947114400767, longitude: 28.825258886696957 },
    { latitude: 47.03168507891203, longitude: 28.828368066377227 },
    { latitude: 47.03731631295645, longitude: 28.81981518842876 }
  ];

  const mapRef = useRef<MapView>(null);

  function calculateBearing(lat1: any, lon1: any, lat2: any, lon2: any) {
    const φ1 = (lat1 * Math.PI) / 180; // переводим широту в радианы
    const φ2 = (lat2 * Math.PI) / 180; // переводим широту в радианы
    const Δλ = ((lon2 - lon1) * Math.PI) / 180; // разница долгот в радианах
  
    // Формула азимута
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    
    let θ = Math.atan2(y, x); // вычисляем угол в радианах
    θ = (θ * 180) / Math.PI;  // переводим угол в градусы
    
    // Приведение угла к диапазону [0, 360]
    return (θ + 360) % 360;
  }

  useEffect(() => {
    if (route.length >= 2) {
      // Вычисляем угол между первыми двумя точками маршрута
      const startPoint = route[0];
      const endPoint = route[1];

      // const deltaX = endPoint.longitude - startPoint.longitude;
      // const deltaY = endPoint.latitude - startPoint.latitude;

      // console.log(deltaX, 'deltaX')
      // console.log(deltaY, 'deltaY')

      // const angle = Math.atan2(deltaX, deltaY) * (180 / Math.PI); // Угол в градусах
      const angle = calculateBearing(startPoint.latitude, startPoint.longitude, endPoint.latitude, endPoint.longitude);

      console.log(angle, 'angle')

      if (mapRef.current && startPoint && endPoint && angle) {
        // Обновляем камеру, поворачивая ее по направлению маршрута
        console.log('eeeee')
        setTimeout(() => {
          mapRef?.current?.animateCamera({
            center: {
              latitude: startPoint.latitude,
              longitude: startPoint.longitude,
            },
            heading: angle, // Угол поворота камеры
            pitch: 0,
            zoom: 18, // Вы можете изменить уровень зума
          });
        }, 3000);
      }
    }
  }, [route, mapRef]);

  // const handleMapReady = () => {
  //   if (route.length >= 2 && mapRef.current) {
  //     const startPoint = route[0];
  //     const endPoint = route[1];

  //     const deltaX = endPoint.longitude - startPoint.longitude;
  //     const deltaY = endPoint.latitude - startPoint.latitude;

  //     const angle = Math.atan2(deltaX, deltaY) * (180 / Math.PI); // Угол в градусах
      
  //     // Анимация камеры при готовности карты
  //     mapRef.current.animateCamera({
  //       center: {
  //         latitude: startPoint.latitude,
  //         longitude: startPoint.longitude,
  //       },
  //       heading: angle,
  //       pitch: 0,
  //       zoom: 18, // Начальный зум
  //     });
  //   }
  // };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: 47.0236629103391,
          longitude: 28.83388199981741,
          latitudeDelta: 0.0922, // вертикальный масштаб
          longitudeDelta: 0.0421, // горизонтальный масштаб
        }}
        initialRegion={{
          latitude: 47.0236629103391,
          longitude: 28.83388199981741,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={false}
        zoomEnabled={true}
        rotateEnabled={true}
        minZoomLevel={3}
        maxZoomLevel={20}
        // onMapReady={handleMapReady}
      >
        <Polyline
          coordinates={route}
          strokeColor="red" // Цвет маршрута
          strokeWidth={6} // Ширина линии
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
