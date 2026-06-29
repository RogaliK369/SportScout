import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Theme } from '@/constants';

type ClubPhotoGalleryProps = {
  photos: string[];
  sportIcon: string;
};

/**
 * Horizontal photo strip for a club detail page.
 */
export function ClubPhotoGallery({ photos, sportIcon }: ClubPhotoGalleryProps) {
  const [failed, setFailed] = useState<Set<number>>(new Set());

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.strip}>
      {photos.map((uri, index) => (
        <View key={uri} style={styles.frame}>
          {failed.has(index) ? (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>{sportIcon}</Text>
              <Text style={styles.placeholderText}>Photo {index + 1}</Text>
            </View>
          ) : (
            <Image
              source={{ uri }}
              style={styles.image}
              resizeMode="cover"
              onError={() => setFailed((current) => new Set(current).add(index))}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  strip: {
    paddingBottom: 4,
    gap: 10,
  },
  frame: {
    width: 260,
    height: 160,
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.primarySoft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
  },
  placeholderIcon: {
    fontSize: 40,
    marginBottom: 6,
  },
  placeholderText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
});
