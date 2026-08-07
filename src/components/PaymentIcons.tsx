/**
 * Payment method marks shown in the footer.
 * Simple, brand-neutral renderings of the methods enabled on greyon.co
 * (Visa, Mastercard, Maestro, American Express, Apple Pay, Google Pay, PayPal).
 */

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span
      title={label}
      aria-label={label}
      role="img"
      className="flex h-7 w-11 items-center justify-center rounded-[4px] bg-ivory/95 px-1"
    >
      {children}
    </span>
  );
}

const wordmark = "font-semibold tracking-tight text-charcoal";

export function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Card label="Visa">
        <span className={`text-[11px] italic ${wordmark}`}>VISA</span>
      </Card>

      <Card label="Mastercard">
        <svg viewBox="0 0 40 24" className="h-4 w-auto" aria-hidden="true">
          <circle cx="16" cy="12" r="9" fill="#EB001B" />
          <circle cx="24" cy="12" r="9" fill="#F79E1B" fillOpacity="0.9" />
        </svg>
      </Card>

      <Card label="Maestro">
        <svg viewBox="0 0 40 24" className="h-4 w-auto" aria-hidden="true">
          <circle cx="16" cy="12" r="9" fill="#0099DF" />
          <circle cx="24" cy="12" r="9" fill="#ED0006" fillOpacity="0.85" />
        </svg>
      </Card>

      <Card label="American Express">
        <span className={`text-[8px] ${wordmark}`}>AMEX</span>
      </Card>

      <Card label="Apple Pay">
        <span className={`text-[9px] ${wordmark}`}>&#63743; Pay</span>
      </Card>

      <Card label="Google Pay">
        <span className={`text-[8px] ${wordmark}`}>
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#EA4335" }}>e</span>
          <span> Pay</span>
        </span>
      </Card>

      <Card label="PayPal">
        <span className={`text-[9px] italic ${wordmark}`} style={{ color: "#003087" }}>
          Pay<span style={{ color: "#009cde" }}>Pal</span>
        </span>
      </Card>
    </div>
  );
}
