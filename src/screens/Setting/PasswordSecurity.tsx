import React, { useCallback, useState, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Enable2FAModal from './Enable2FAModel';
import { FONTS } from '../../fonts/fonts';

const { width } = Dimensions.get('window');

const PasswordSecurityScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleTwoFactor = useCallback(() => {
    if (!twoFactorEnabled) {
      setIsModalVisible(true);
    } else {
      setTwoFactorEnabled(false);
    }
  }, [twoFactorEnabled]);

  const saveDisabled = useMemo(() => false, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Password & Security</Text>
      </View>

      {/* Subheader */}
      <Text style={styles.subheader}>
        Help protect your account from unauthorized access
      </Text>

      {/* Change Password Row */}
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('changePassword')}
      >
        <View style={styles.rowLeft}>
          <Icon name="lock-closed-outline" size={20} color="#000" />
          <Text style={styles.rowText}>Change Password</Text>
        </View>
        <Icon name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      {/* Two-factor authentication Row */}
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Text style={styles.rowText}>Two-factor authentication</Text>
        </View>
        <Switch
          value={twoFactorEnabled}
          onValueChange={toggleTwoFactor}
          trackColor={{ false: '#ccc', true: '#4caf50' }}
          thumbColor="#fff"
        />
      </View>

      <Text style={styles.helperText}>
        Add an extra layer of security to your account with two-factor authentication.
      </Text>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, saveDisabled && { opacity: 0.5 }]}
        disabled={saveDisabled}
        onPress={() => {
          console.log('Save changes clicked');
        }}
      >
        <Text style={styles.saveButtonText}>Save change</Text>
      </TouchableOpacity>

      {/* Modal to enable 2FA */}
      <Enable2FAModal
        visible={isModalVisible}
        twoFactorEnabled={twoFactorEnabled}
        onClose={() => setIsModalVisible(false)}
        onEnable={(password) => {
          console.log('Password:', password);
          setTwoFactorEnabled(true);
          setIsModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.04,
    gap: 12,
  },
  headerTitle: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#0F1E2D',
    fontFamily: FONTS.bold,
  },
  subheader: {
    fontSize: width * 0.038,
    color: '#6B6B6B',
    marginBottom: width * 0.06,
    fontFamily: FONTS.demiBold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: width * 0.04,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    fontSize: width * 0.042,
    color: '#000',
    fontFamily: FONTS.bold,
  },
  helperText: {
    fontSize: width * 0.035,
    color: '#6B6B6B',
    marginTop: width * 0.03,
    marginBottom: 'auto',
    fontFamily: FONTS.demiBold,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: width * 0.03,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: width * 0.05,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: width * 0.042,
    fontWeight: '600',
    fontFamily: FONTS.demiBold,
  },
});

export default PasswordSecurityScreen;
