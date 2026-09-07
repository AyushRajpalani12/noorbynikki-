'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, CheckCircle2, Home, Briefcase } from 'lucide-react';
import DashboardSidebar from '@/app/dashboardsidebar/page';

interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export default function SavedAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [type, setType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('userAddresses');
    if (saved) {
      try {
        setAddresses(JSON.parse(saved));
      } catch {
        setAddresses([]);
      }
    } else {
      const defaultAddresses: Address[] = [
        {
          id: '1',
          type: 'Home',
          name: 'Gaurav Soni',
          phone: '9876543210',
          addressLine: 'Near Main Market, Civil Lines',
          city: 'Kota',
          state: 'Rajasthan',
          pincode: '324001',
          isDefault: true,
        },
      ];
      setAddresses(defaultAddresses);
      localStorage.setItem('userAddresses', JSON.stringify(defaultAddresses));
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: Date.now().toString(),
      type,
      name,
      phone,
      addressLine,
      city,
      state,
      pincode,
      isDefault: addresses.length === 0,
    };

    const updated = [newAddress, ...addresses];
    setAddresses(updated);
    localStorage.setItem('userAddresses', JSON.stringify(updated));

    setName('');
    setPhone('');
    setAddressLine('');
    setCity('');
    setState('');
    setPincode('');
    setShowAddModal(false);
    showToast('Address added successfully!');
  };

  const handleDelete = (id: string) => {
    const updated = addresses.filter((item) => item.id !== id);
    setAddresses(updated);
    localStorage.setItem('userAddresses', JSON.stringify(updated));
    showToast('Address deleted successfully!');
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));
    setAddresses(updated);
    localStorage.setItem('userAddresses', JSON.stringify(updated));
    showToast('Default address updated!');
  };

  return (
    <div className="min-h-screen bg-[#3A0E1F] flex flex-col lg:flex-row">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-64 bg-[#FAF6F0] flex flex-col relative">

        {/* Top bar - Added pl-16 on mobile to completely avoid overlapping with the hamburger menu */}
        <div className="fixed top-0 left-0 right-0 lg:left-64 z-30 h-16 flex items-center justify-between bg-[#FAF6F0]/95 backdrop-blur border-b border-[#EFE6DA] pl-16 pr-4 sm:px-6">
          <p className="font-serif text-sm sm:text-[15px] text-[#2A211D] font-medium tracking-wide truncate">
            Saved Addresses
          </p>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#3A0E1F] text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#B08D57]" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        <div className="flex-1 pt-16 px-4 pb-4 sm:px-6 sm:pb-6 flex flex-col gap-5">

          <div className="bg-white rounded-2xl border border-[#EFE6DA] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-5 border-b border-[#EFE6DA]">
              <div>
                <h3 className="font-serif text-lg text-[#2A211D]">Saved addresses</h3>
                <p className="text-xs text-[#8B7E74] mt-1">Manage your shipping addresses for fast checkout</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#3A0E1F] hover:bg-[#5C1A34] text-white text-xs font-semibold px-5 py-3 rounded-full transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add new address</span>
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-14">
                <div className="w-14 h-14 bg-[#FAF6F0] text-[#3A0E1F] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EFE6DA]">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="text-[#2A211D] font-semibold text-sm">No saved addresses found</p>
                <p className="text-[#8B7E74] text-xs mt-1 max-w-xs mx-auto">
                  Add an address to make your checkout process smoother.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-6 inline-block bg-[#3A0E1F] hover:bg-[#5C1A34] text-white font-semibold py-3 px-7 rounded-full text-sm transition-colors"
                >
                  Add address now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`bg-[#FAF6F0] rounded-2xl border p-6 relative flex flex-col justify-between ${
                      addr.isDefault ? 'border-[#B08D57]' : 'border-[#EFE6DA]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#2A211D] border border-[#EFE6DA]">
                          {addr.type === 'Home' && <Home className="w-3.5 h-3.5 text-[#B08D57]" />}
                          {addr.type === 'Work' && <Briefcase className="w-3.5 h-3.5 text-[#B08D57]" />}
                          {addr.type}
                        </span>
                        {addr.isDefault ? (
                          <span className="text-xs font-semibold text-[#B08D57] bg-white px-2.5 py-1 rounded-full border border-[#EFE6DA]">
                            Default
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefault(addr.id)}
                            className="text-xs font-medium text-[#8B7E74] hover:text-[#3A0E1F] underline"
                          >
                            Set as default
                          </button>
                        )}
                      </div>

                      <h4 className="font-serif font-semibold text-[#2A211D] text-base">{addr.name}</h4>
                      <p className="text-xs text-[#8B7E74] mt-0.5">Phone: {addr.phone}</p>
                      <p className="text-sm text-[#2A211D] mt-3 leading-relaxed">
                        {addr.addressLine}, {addr.city}, {addr.state} -{' '}
                        <span className="font-semibold">{addr.pincode}</span>
                      </p>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#EFE6DA]">
                      <button
                        onClick={() => handleDelete(addr.id)}
                        className="text-[#8B7E74] hover:text-[#3A0E1F] p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Add Address Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <h2 className="font-serif text-xl text-[#2A211D] mb-5">Add new address</h2>

              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2A211D] mb-1">Address type</label>
                  <div className="flex gap-3">
                    {(['Home', 'Work', 'Other'] as const).map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setType(t)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          type === t
                            ? 'bg-[#3A0E1F] text-white border-[#3A0E1F]'
                            : 'bg-[#FAF6F0] text-[#2A211D] border-[#EFE6DA]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A211D] mb-1">Full name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Gaurav Soni"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#EFE6DA] rounded-xl text-sm focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2A211D] mb-1">Phone number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#EFE6DA] rounded-xl text-sm focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A211D] mb-1">Street address / area</label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="House/Flat no., street name, landmark"
                    className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#EFE6DA] rounded-xl text-sm focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A211D] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Kota"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#EFE6DA] rounded-xl text-sm focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2A211D] mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Rajasthan"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#EFE6DA] rounded-xl text-sm focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2A211D] mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="324001"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0] border border-[#EFE6DA] rounded-xl text-sm focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#EFE6DA]">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#EFE6DA] text-xs font-semibold text-[#2A211D] hover:bg-[#FAF6F0]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#3A0E1F] hover:bg-[#5C1A34] text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Save address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}