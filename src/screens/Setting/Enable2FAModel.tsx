import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';

const { width } = Dimensions.get('window');

interface Enable2FAModalProps {
  visible: boolean;
  onClose: () => void;
  onEnable: (password: string) => void;
  twoFactorEnabled: boolean;
}

const Enable2FAModal: React.FC<Enable2FAModalProps> = ({
  visible,
  onClose,
  onEnable,
  twoFactorEnabled,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = useCallback(() => setShowPassword(prev => !prev), []);

  const isEnableDisabled = useMemo(() => password.trim().length < 6, [password]);

  const handleEnable = useCallback(() => {
    if (!isEnableDisabled) {
      onEnable(password);
      setPassword('');
    }
  }, [password, isEnableDisabled, onEnable]);

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
          <Text style={styles.title}>Enable 2FA</Text>
          <Text style={styles.subtitle}>
            Confirm your password to {twoFactorEnabled ? 'disable' : 'enable'} two-factor authentication.
          </Text>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
            />
            <TouchableOpacity onPress={toggleShowPassword} accessibilityLabel={showPassword ? "Hide password" : "Show password"}>
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.enableBtn, isEnableDisabled && { opacity: 0.5 }]}
              onPress={handleEnable}
              disabled={isEnableDisabled}
            >
              <Text style={styles.enableText}>{twoFactorEnabled ? 'Disable' : 'Enable'}</Text>
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
    fontWeight: 'bold',
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
  cancelBtn: {
    flex: 1,
    paddingVertical: width * 0.035,
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  cancelText: {
    color: '#000',
    fontWeight: '500',
    fontFamily: FONTS.demiBold,
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

export default Enable2FAModal;
