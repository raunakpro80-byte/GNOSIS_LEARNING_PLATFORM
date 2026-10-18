import MockOwnerReview from "@/components/MockOwnerReview";
export const metadata = {
  title: "Question review | GNOSIS",
  robots: { index: false, follow: false },
};
// No bank data is embedded in the page. The private API authorizes every request.
export default function Page() {
  return <MockOwnerReview />;
}
