import React from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';

interface Props {
  image: any;
  size?: number;
}

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 4;
const CARD_MARGIN = 8;
const CARD_SIZE = (width - CARD_MARGIN * 2 * NUM_COLUMNS - 32) / NUM_COLUMNS;

const BrandCard: React.FC<Props> = React.memo(({ image, size = CARD_SIZE }) => {
  return (
    <View style={[styles.card, { width: size, height: size, margin: CARD_MARGIN }]}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#F6F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: '60%',
  },
});

export default BrandCard;
