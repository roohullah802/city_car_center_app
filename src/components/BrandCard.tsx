import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

interface Props {
  item: {
    brandImage: {
      url: string;
      public_id: string;
    };
    brand: string;
  };
  size?: number;
  navigation: any;
}

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 4;
const CARD_MARGIN = 4;
const CARD_SIZE = (width - CARD_MARGIN * 2 * NUM_COLUMNS - 32) / NUM_COLUMNS;

const BrandCard: React.FC<Props> = React.memo(
  ({ item, navigation, size = CARD_SIZE }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('carCardsByBrand', { brand: item.brand })
        }
      >
        <View
          style={[
            styles.card,
            { width: size, height: size, margin: CARD_MARGIN },
          ]}
        >
          <Image
            source={{ uri: item.brandImage.url }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#F6F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    borderRadius: 15,
  },
});

export default BrandCard;
