// Everything that takes a Razorpay payment: the four sewas plus the paid
// Personal Session booking. Shared by the donate cards, the booking popup, the
// /api/razorpay routes and the /admin panel. Table names match supabase/*.sql.

export type SewaKey = "shiksha" | "annapurna" | "nirman" | "gita" | "session";
export type DonationFrequency = "one_time" | "monthly";

type SewaConfig = {
  label: string;
  table: string;
  /** Set only for sewas that offer monthly auto-pay. */
  subscriptionsTable?: string;
  /**
   * Env var holding this sewa's Razorpay Payment Page link. When set, one-time
   * donations open that page with the chosen amount prefilled (via /donate/[sewa]).
   */
  paymentPageEnv?: string;
  /** Fixed price in rupees; the server ignores any other amount sent. */
  fixedAmount?: number;
  /** "booking" = a paid service (Personal Session), worded as a booking in emails. */
  kind?: "donation" | "booking";
  donatePath: string;
};

export const SEWAS: Record<SewaKey, SewaConfig> = {
  shiksha: {
    label: "Shiksha Sewa",
    table: "shiksha_sewa_donations",
    subscriptionsTable: "shiksha_sewa_subscriptions",
    donatePath: "/shiksha-sewa#shiksha-contribution",
  },
  annapurna: {
    label: "Annapurna Sewa",
    table: "annapurna_sewa_donations",
    paymentPageEnv: "RAZORPAY_ANNAPURNA_SEVA_URL",
    donatePath: "/annapurna-sewa#make-contribution",
  },
  nirman: {
    label: "Nirman Sewa",
    table: "nirman_sewa_donations",
    paymentPageEnv: "RAZORPAY_NIRMAAN_SEVA_URL",
    donatePath: "/nirman-sewa#contribute",
  },
  gita: {
    label: "Living the Gita",
    table: "living_the_gita_donations",
    paymentPageEnv: "RAZORPAY_LIVING_GITA_URL",
    donatePath: "/living-the-gita#gita-contribution",
  },
  session: {
    label: "Personal Session",
    table: "personal_session_bookings",
    paymentPageEnv: "RAZORPAY_SESSION",
    fixedAmount: 6100,
    kind: "booking",
    donatePath: "/book-session",
  },
};

export const SEWA_KEYS = Object.keys(SEWAS) as SewaKey[];
export const MONTHLY_SEWA_KEYS = SEWA_KEYS.filter((key) => SEWAS[key].subscriptionsTable);

export const MIN_DONATION = 1;
export const MIN_MONTHLY_DONATION = 11;
export const MAX_DONATION = 5_000_000;

export function isSewaKey(value: unknown): value is SewaKey {
  return typeof value === "string" && value in SEWAS;
}

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}
