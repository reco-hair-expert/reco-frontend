"use client";

import { useEffect, useState, useRef } from "react";

const TEST_DATA = "eyJ2ZXJzaW9uIjozLCJwdWJsaWNfa2V5Ijoic2FuZGJveF9pNDIyMzk1MDk2OCIsImFjdGlvbiI6InBheSIsImFtb3VudCI6IjEiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0KLQtdGB0YLQvtCy0LDRjyDQvtC/0LvQsNGC0LAgUkVDTyIsIm9yZGVyX2lkIjoib3JkZXItMTIzNDUiLCJzYW5kYm94IjoxfQ==";
const TEST_SIGNATURE = "BrzYerhswEItw0Lervvnb3o1rbc=";

declare global {
  interface Window {
    LiqPayCheckout?: any;
  }
}

const LiqPayTestButton = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const alertedRef = useRef(false);

  useEffect(() => {
    if (!document.getElementById("liqpay-checkout-script")) {
      const script = document.createElement("script");
      script.src = "https://static.liqpay.ua/libjs/checkout.js";
      script.async = true;
      script.id = "liqpay-checkout-script";
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    } else {
      setSdkReady(true);
    }
  }, []);

  const handleClick = () => {
    if (!window.LiqPayCheckout) {
      alert("LiqPay SDK не загружен");
      return;
    }

    alertedRef.current = false;

    const checkout = window.LiqPayCheckout.init({
      data: TEST_DATA,
      signature: TEST_SIGNATURE,
      embedTo: "#liqpay_checkout",
      mode: "popup",
    });

    checkout
      .on("liqpay.callback", (data: any) => {
        if (!alertedRef.current) {
          alertedRef.current = true;
          console.log("LiqPay callback:", data);
          alert("Платёж завершён: " + data.status + "\n" + (data.err_description || ""));
        }
      })
      .on("liqpay.ready", () => {
        console.log("✅ LiqPay готов");
      })
      .on("liqpay.close", () => {
        console.log("❌ Окно закрыто");
      });
  };

  return (
    <div>
      <button onClick={handleClick} disabled={!sdkReady}>
        🚀 Тестовая оплата через LiqPay
      </button>
      <div id="liqpay_checkout" style={{ marginTop: 24 }} />
    </div>
  );
};

export default LiqPayTestButton;
