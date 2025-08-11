import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface Props {
  image: any;
}

const BrandCard: React.FC<Props> = React.memo(({ image }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#F6F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
  },
  image: {
    width: '60%',
    height: '60%',
  },
});

export default BrandCard;
