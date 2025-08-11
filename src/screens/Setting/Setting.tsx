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
import { FONTS } from '../../fonts/fonts';

const { width } = Dimensions.get('window');

const Settings: React.FC<{navigation: any}> = ({navigation}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleVisible = ()=>{
    setIsVisible(prev => !prev)
  }
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Settings</Text>

        {/* User Info */}
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
          <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
            <Text style={styles.editBtn}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Profile & Settings Section */}
        <Text style={styles.sectionTitle}>Profile & Settings</Text>
        <View style={styles.card}>
          <SettingsRow icon="person-outline" label="My Profile" editable onPress={()=> navigation.navigate("Profile")} />
          <SettingsRow icon="lock-closed-outline" label="Password & Security" editable onPress={()=> navigation.navigate("passwordSecurity")}  />
        </View>

        {/* Helpful Desk Section */}
        <Text style={styles.sectionTitle}>Helpful Desk</Text>
        <View style={styles.card}>
          <SettingsRow icon="help-circle-outline" label="FAQs" onPress={()=> navigation.navigate("faqs")} />
          <SettingsRow icon="document-text-outline" label="Terms & Privacy Policy" onPress={()=> navigation.navigate("privacyPolicy")} />
          <SettingsRow icon="chatbubble-ellipses-outline" label="Report Issue" onPress={()=> navigation.navigate("report")} />
        </View>

        {/* Logout */}
        <View style={styles.card}>
          <SettingsRow icon="log-out-outline" label="Logout" onPress={handleVisible} />
        </View>
      </ScrollView>
      <LogoutModal visible={isVisible} onClose={()=> setIsVisible(false)} />
    </SafeAreaView>
  );
};

type SettingsRowProps = {
  icon: string;
  label: string;
  editable?: boolean;
  onPress: ()=> void;
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
    paddingHorizontal: width * 0.04,
  },
  header: {
    fontSize: width * 0.06,
    fontFamily:FONTS.bold,
    fontWeight: 'bold',
    marginVertical: width * 0.04,
    color: '#111827',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: width * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.06,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    marginRight: width * 0.03,
  },
  profileDetails: {
    flex: 1,
  },
  name: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#111827',
    fontFamily:FONTS.bold
  },
  email: {
    fontSize: width * 0.035,
    color: '#6B7280',
    fontFamily:FONTS.demiBold
  },
  editBtn: {
    fontSize: width * 0.035,
    color: '#2563EB',
    fontWeight: '500',
    fontFamily:FONTS.demiBold
  },
  sectionTitle: {
    fontSize: width * 0.036,
    color: '#9CA3AF',
    marginBottom: width * 0.02,
    marginTop: width * 0.04,
    fontFamily:FONTS.demiBold
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: width * 0.01,
    marginBottom: width * 0.04,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  row: {
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.045,
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
    width: width * 0.6,
    fontSize: width * 0.042,
    color: '#111827',
    marginLeft: width * 0.03,
    flexShrink: 1,
    fontFamily:FONTS.demiBold
  },
  editText: {
    fontSize: width * 0.035,
    color: '#2563EB',
    fontWeight: '500',
    fontFamily:FONTS.demiBold
  },
});
