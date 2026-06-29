import { StyleSheet, Text, View } from 'react-native';

import { Colors, Theme, type ClubPricing, formatPrice, type Sport } from '@/constants';
import { SPORT_PRICE_GUIDE } from '@/constants/pricing';

type ClubPricingCardProps = {
  pricing: ClubPricing;
  sport: Sport;
};

/**
 * Shows example pricing tiers for a club.
 */
export function ClubPricingCard({ pricing, sport }: ClubPricingCardProps) {
  const guide = SPORT_PRICE_GUIDE[sport];
  const unitLabel = pricing.unit === 'hour' ? 'per hour' : 'per session';

  return (
    <View style={styles.card}>
      <View style={styles.mainPriceRow}>
        <View>
          <Text style={styles.fromLabel}>From</Text>
          <Text style={styles.mainPrice}>{formatPrice(pricing.standardPrice, pricing.currency)}</Text>
          <Text style={styles.unitLabel}>{unitLabel}</Text>
        </View>
        <View style={styles.sportGuide}>
          <Text style={styles.guideLabel}>{sport} typical</Text>
          <Text style={styles.guideRange}>{guide.typicalRange}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.tierRow}>
        <PriceTier label="Standard" price={formatPrice(pricing.standardPrice, pricing.currency)} hint="Weekday off-peak" />
        <PriceTier
          label="Peak"
          price={formatPrice(pricing.peakPrice, pricing.currency)}
          hint={`${pricing.peakHoursFrom}–${pricing.peakHoursTo}`}
        />
        {pricing.weekendPrice !== undefined ? (
          <PriceTier
            label="Weekend"
            price={formatPrice(pricing.weekendPrice, pricing.currency)}
            hint="Sat & Sun"
          />
        ) : null}
      </View>

      {pricing.resourcePrices ? (
        <>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>By resource</Text>
          {Object.entries(pricing.resourcePrices).map(([resource, price]) => (
            <View key={resource} style={styles.extraRow}>
              <Text style={styles.extraLabel}>{resource}</Text>
              <Text style={styles.extraPrice}>{formatPrice(price, pricing.currency)}</Text>
            </View>
          ))}
        </>
      ) : null}

      {pricing.membershipMonthly !== undefined ? (
        <>
          <View style={styles.divider} />
          <View style={styles.extraRow}>
            <Text style={styles.extraLabel}>Monthly membership</Text>
            <Text style={styles.extraPrice}>
              {formatPrice(pricing.membershipMonthly, pricing.currency)}/mo
            </Text>
          </View>
        </>
      ) : null}

      {pricing.extras && pricing.extras.length > 0 ? (
        <>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Extras</Text>
          {pricing.extras.map((extra) => (
            <View key={extra.label} style={styles.extraRow}>
              <Text style={styles.extraLabel}>{extra.label}</Text>
              <Text style={styles.extraPrice}>{formatPrice(extra.price, pricing.currency)}</Text>
            </View>
          ))}
        </>
      ) : null}
    </View>
  );
}

function PriceTier({ label, price, hint }: { label: string; price: string; hint: string }) {
  return (
    <View style={styles.tier}>
      <Text style={styles.tierLabel}>{label}</Text>
      <Text style={styles.tierPrice}>{price}</Text>
      <Text style={styles.tierHint}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...Theme.card,
    padding: 16,
  },
  mainPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  fromLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mainPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primaryDark,
    marginTop: 2,
  },
  unitLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sportGuide: {
    backgroundColor: Colors.primarySoft,
    borderRadius: Theme.radius.md,
    padding: 10,
    maxWidth: 140,
  },
  guideLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  guideRange: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 14,
  },
  tierRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tier: {
    flex: 1,
    minWidth: 90,
    backgroundColor: Colors.primarySoft,
    borderRadius: Theme.radius.md,
    padding: 10,
  },
  tierLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tierPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 4,
  },
  tierHint: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  extraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  extraLabel: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
    paddingRight: 8,
  },
  extraPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
});
