import React, { useState } from "react";
import { CreditCard, ShieldCheck, CheckCircle, AlertCircle, FileText } from "lucide-react";

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal?: number;
}

export function CheckoutModal({ isOpen, onClose, orderTotal = 97.91 }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "card" && (!cardNumber || !expiry || !cvc)) {
      setError("Please fill in all credit card details.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethod, cardNumber, expiry, cvc, amount: orderTotal }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess(true);
        setPdfUrl(data.pdfReceiptUrl);
      } else {
        setError(data.message || "Payment failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <div className="checkout-header">
          <ShieldCheck color="#38bdf8" size={24} />
          <h2>Multi-Provider Secure Checkout</h2>
        </div>
        {success ? (
          <div className="success-banner">
            <CheckCircle color="#34d399" size={40} />
            <h3>Payment Approved!</h3>
            {pdfUrl && <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-pdf"><FileText size={16} /> Download PDF Receipt</a>}
            <button onClick={onClose} className="btn-close">Close</button>
          </div>
        ) : (
          <form onSubmit={handlePaymentSubmit}>
            {error && <div className="error-banner"><AlertCircle size={16} /> {error}</div>}
            <div className="payment-tabs">
              <button type="button" className={paymentMethod === "card" ? "active" : ""} onClick={() => setPaymentMethod("card")}>
                <CreditCard size={16} /> Stripe Card
              </button>
              <button type="button" className={paymentMethod === "paypal" ? "active" : ""} onClick={() => setPaymentMethod("paypal")}>
                PayPal
              </button>
            </div>
            <input type="text" placeholder="Card number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
            <button type="submit" className="btn-pay" disabled={loading}>
              {loading ? "Processing..." : `Pay $${orderTotal.toFixed(2)}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}