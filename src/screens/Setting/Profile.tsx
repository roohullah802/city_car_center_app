import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
  

  const imagePickerHandler = async () => {
  
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.subtitle}>Manage your profile</Text>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: 'https://i.imgur.com/4sX3gEo.png' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraIcon}>
          <Icon name="camera" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Info Items */}
      <View style={styles.section}>
        <LabelAndValue
          label="Your full name"
          value="Faizan Farooq"
          onPress={() => navigation.navigate('EditNameScreen')}
        />
        <LabelAndValue
          label="Age"
          value="21 Year old"
          onPress={() => navigation.navigate('AgePickerScreen')}
        />
        <LabelAndValue
          label="Gender"
          value="Male"
          onPress={() => navigation.navigate('GenderScreen')}
        />
        <FileItem
          label="Driver license"
          fileName="MyDriverlicense.pdf"
          onPress={imagePickerHandler}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save change</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const LabelAndValue = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.valueRow} onPress={onPress}>
      <Text style={styles.value}>{value}</Text>
      <Icon name="chevron-forward" size={18} color="#000" />
    </TouchableOpacity>
  </View>
);

const FileItem = ({
  label,
  fileName,
  onPress,
}: {
  label: string;
  fileName: string;
  onPress: () => void;
}) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.valueRow} onPress={onPress}>
      <Icon
        name="document-text-outline"
        size={18}
        color="red"
        style={{ marginRight: 8 }}
      />
      <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
        {fileName}
      </Text>
      <Icon
        name="chevron-forward"
        size={18}
        color="#000"
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 2,
  },
  title: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: '#072A3F',
    textAlign: 'center',
    marginTop: 40,
  },
  subtitle: {
    fontSize: RFValue(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginTop: 10,
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#000',
    padding: 6,
    borderRadius: 20,
  },
  section: {
    marginTop: 30,
  },
  item: {
    marginBottom: 20,
  },
  label: {
    fontSize: RFValue(13),
    color: '#555',
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  value: {
    flex: 1,
    fontSize: RFValue(14),
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: RFValue(16),
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ProfileScreen;
