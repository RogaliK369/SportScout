import { FlatList, StyleSheet, Text, View } from 'react-native';

import { FriendCard } from '@/components/FriendCard';
import { ScreenContainer } from '@/components/ScreenContainer';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Colors } from '@/constants';
import { useAuth } from '@/lib/auth';
import { getMatchingProfiles } from '@/lib/friends';

/**
 * Find training partners who share your sports interests.
 */
export default function FriendsScreen() {
  const { user, sendFriendRequest, hasSentFriendRequest } = useAuth();

  const userSports = user?.sports ?? [];
  const matches = getMatchingProfiles(userSports);

  return (
    <ScreenContainer style={styles.container}>
      <FlatList
        style={styles.list}
        data={matches}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <ScreenHeader
            title="Sport"
            accent="Friends"
            subtitle="People near you who share your sports. Send a request to train together."
          />
        }
        renderItem={({ item }) => (
          <FriendCard
            profile={item}
            userSports={userSports}
            requestSent={hasSentFriendRequest(item.id)}
            onSendRequest={() => sendFriendRequest(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>👋</Text>
            <Text style={styles.emptyTitle}>No matches yet</Text>
            <Text style={styles.emptyText}>
              Pick more sports on your profile to see people with similar interests.
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  empty: {
    paddingTop: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});
