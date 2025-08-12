import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoutModal from '../Auth/Logout';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../../fonts/fonts';

const { width } = Dimensions.get('window');

const Settings: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleVisible = () => setIsVisible(prev => !prev);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={styles.header}>Settings</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.profileDetails}>
            <Text style={styles.name}>Faizan Farooq</Text>
            <Text style={styles.email}>Faizann@example.com</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.editBtn}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Profile & Settings */}
        <Text style={styles.sectionTitle}>Profile & Settings</Text>
        <View style={styles.card}>
          <SettingsRow icon="person-outline" label="My Profile" editable onPress={() => navigation.navigate("Profile")} />
          <SettingsRow icon="lock-closed-outline" label="Password & Security" editable onPress={() => navigation.navigate("passwordSecurity")} />
        </View>

        {/* Helpful Desk */}
        <Text style={styles.sectionTitle}>Helpful Desk</Text>
        <View style={styles.card}>
          <SettingsRow icon="help-circle-outline" label="FAQs" onPress={() => navigation.navigate("faqs")} />
          <SettingsRow icon="document-text-outline" label="Terms & Privacy Policy" onPress={() => navigation.navigate("privacyPolicy")} />
          <SettingsRow icon="chatbubble-ellipses-outline" label="Report Issue" onPress={() => navigation.navigate("report")} />
        </View>

        {/* Logout */}
        <View style={styles.card}>
          <SettingsRow icon="log-out-outline" label="Logout" onPress={handleVisible} />
        </View>
      </ScrollView>

      <LogoutModal visible={isVisible} onClose={() => setIsVisible(false)} />
    </SafeAreaView>
  );
};

type SettingsRowProps = {
  icon: string;
  label: string;
  editable?: boolean;
  onPress: () => void;
};

const SettingsRow: React.FC<SettingsRowProps> = ({ icon, label, editable, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={styles.rowLeft}>
      <Icon name={icon} size={22} color="#444" />
      <Text style={styles.rowLabel} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </View>
    {editable ? (
      <Text style={styles.editText}>Edit</Text>
    ) : (
      <Icon name="chevron-forward" size={20} color="#ccc" />
    )}
  </TouchableOpacity>
);

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: width * 0.05,
  },
  scrollContent: {
    paddingBottom: RFValue(40),
  },
  header: {
    fontSize: RFValue(20),
    fontFamily: FONTS.bold,
    color: '#111827',
    marginVertical: RFValue(16),
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: RFValue(14),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(20),
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: RFValue(56),
    height: RFValue(56),
    borderRadius: RFValue(28),
    marginRight: RFValue(12),
  },
  profileDetails: {
    flex: 1,
  },
  name: {
    fontSize: RFValue(14),
    fontFamily: FONTS.bold,
    color: '#111827',
  },
  email: {
    fontSize: RFValue(12),
    color: '#6B7280',
    fontFamily: FONTS.demiBold,
  },
  editBtn: {
    fontSize: RFValue(12),
    color: '#2563EB',
    fontFamily: FONTS.demiBold,
  },
  sectionTitle: {
    fontSize: RFValue(12),
    color: '#9CA3AF',
    marginBottom: RFValue(6),
    marginTop: RFValue(12),
    fontFamily: FONTS.demiBold,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1,
    marginBottom: RFValue(14),
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  row: {
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#F3F4F6',
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rowLabel: {
    fontSize: RFValue(13),
    color: '#111827',
    marginLeft: RFValue(12),
    flexShrink: 1,
    fontFamily: FONTS.demiBold,
  },
  editText: {
    fontSize: RFValue(12),
    color: '#2563EB',
    fontFamily: FONTS.demiBold,
  },
});
