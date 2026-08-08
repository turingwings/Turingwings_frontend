import Button from './Button';

/** The high-emphasis CTA — "Register", "Submit", "Join now". One per view, ideally. */
export default function PrimaryButton(props) {
  return <Button variant="primary" {...props} />;
}
