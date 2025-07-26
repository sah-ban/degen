import React, { useState } from "react";
import { Wallet, X } from "lucide-react";

type InfoPopupProps = {
  wallet_addresses: string[];
};

export const Wallets: React.FC<InfoPopupProps> = ({ wallet_addresses }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={togglePopup}
        className="text-white hover:text-blue-800 transition"
        title="Show Wallets"
      >
        <Wallet size={24} />
      </button>

      {/* Overlay + Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 w-[90%] max-w-md text-white relative backdrop-blur-xl">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-white hover:text-red-300"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-4">Connected Wallets</h3>
            <ul className="list-decimal list-inside space-y-1 text-sm break-all">
              {wallet_addresses.map((address, index) => (
                <li key={index}>{address}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
