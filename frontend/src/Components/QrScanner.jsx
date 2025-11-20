import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";

export default function QrScanner() {
  const [data, setData] = useState("No result");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-green-50">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Scan Product QR</h1>

      <div className="w-full max-w-md border rounded-xl shadow bg-white p-4">
        <QrReader
          onResult={(result) => {
            if (result?.text) {
              const qr = JSON.parse(result.text);

              if (qr.productId) {
                navigate(`/trace/${qr.productId}`);
              }
            }
          }}
          constraints={{ facingMode: "environment" }}
          containerStyle={{ width: "100%" }}
        />
      </div>

      <p className="mt-4 text-gray-700">{data}</p>
    </div>
  );
}
