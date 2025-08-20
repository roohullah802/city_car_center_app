import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux.toolkit/store';
import Toast from 'react-native-toast-message';
import { logout, setLoading } from '../../redux.toolkit/slices/userSlice';
import axios from 'axios';
import { BASE_AUTH_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

const { width } = Dimensions.get('window');

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, isLoading } = useSelector(
    (state: RootState) => state.user,
  );
  

  const handleLogout = async () => {
    try {
      if (!isLoggedIn) {
        Toast.show({
          type: 'success',
          text1: 'Please login first',
        });
        return;
      }

      dispatch(setLoading(true));
      const response = await axios.post(
        BASE_AUTH_URL + '/logout',
        null,
        {withCredentials: true},
      );
      const usr = response.data;
      if (usr.success) {
        Toast.show({
          type: 'success',
          text1: usr.message,
        });
        dispatch(logout());
        onClose();
        navigation.navigate("Login");
      } else {
        Toast.show({
          type: 'error',
          text1: usr.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      onClose();
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Icon name="lock-closed-outline" size={width * 0.08} color="#fff" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Log Out</Text>
          <Text style={styles.subtitle}>
            Are you sure you want to log out? You’ll need to sign in again to
            access your account.
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity disabled={isLoading} style={[styles.enableBtn]} onPress={handleLogout}>
              {isLoading ? (<ActivityIndicator size={"small"} color={"#fff"} />) : (
                <Text style={styles.enableText}>{'Logout'}</Text>
              ) }
              
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: width * 0.06,
    width: '100%',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#004AAD',
    borderRadius: 50,
    padding: width * 0.04,
    marginBottom: width * 0.04,
  },
  title: {
    fontSize: width * 0.05,
    color: '#0F1E2D',
    marginBottom: width * 0.02,
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: width * 0.038,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: width * 0.06,
    fontFamily: FONTS.demiBold,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    height: width * 0.13,
    backgroundColor: '#F6F8F8',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: width * 0.06,
  },
  input: {
    flex: 1,
    fontSize: width * 0.042,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: width * 0.04,
  },
  enableBtn: {
    flex: 1,
    paddingVertical: width * 0.035,
    borderRadius: 8,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  enableText: {
    color: '#fff',
    fontWeight: '500',
    fontFamily: FONTS.demiBold,
  },
});

export default LogoutModal;
