import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants';

type ProfileAvatarProps = {
  photoUri?: string | null;
  name?: string;
  size?: number;
  editable?: boolean;
  onPhotoChange?: (uri: string | null) => void;
};

/**
 * Profile photo with optional gallery picker.
 */
export function ProfileAvatar({
  photoUri,
  name,
  size = 96,
  editable = false,
  onPhotoChange,
}: ProfileAvatarProps) {
  const initial = name?.trim().charAt(0)?.toUpperCase() || '?';

  const pickPhoto = async () => {
    if (!editable || !onPhotoChange) {
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onPhotoChange(result.assets[0].uri);
    }
  };

  const removePhoto = () => {
    onPhotoChange?.(null);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={pickPhoto}
        disabled={!editable}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
          />
        ) : (
          <Text style={[styles.initial, { fontSize: size * 0.38 }]}>{initial}</Text>
        )}
        {editable ? (
          <View style={styles.editBadge}>
            <Text style={styles.editBadgeText}>📷</Text>
          </View>
        ) : null}
      </Pressable>

      {editable ? (
        <View style={styles.actions}>
          <Pressable onPress={pickPhoto} style={styles.actionLink}>
            <Text style={styles.actionText}>{photoUri ? 'Change photo' : 'Add photo'}</Text>
          </Pressable>
          {photoUri ? (
            <Pressable onPress={removePhoto} style={styles.actionLink}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initial: {
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  editBadgeText: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 16,
  },
  actionLink: {
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  removeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});
