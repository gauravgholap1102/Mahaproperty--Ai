import React, { useState } from 'react';
import { Calculator, Percent, Building, Landmark, DollarSign } from 'lucide-react';

export const RealEstateCalculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emi' | 'stamp' | 'yield'>('emi');

  // EMI State
  const [loanAmount, setLoanAmount] = useState(4000000); // 40 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20);

  // Stamp Duty State
  const [propertyPrice, setPropertyPrice] = useState(5000000); // 50 Lakhs
  const [buyerGender, setBuyerGender] = useState<'Male' | 'Female' | 'Joint'>('Male');
  const [isUrban, setIsUrban] = useState(true);

  // Rental Yield State
  const [monthlyRent, setMonthlyRent] = useState(20000);
  const [propertyValue, setPropertyValue] = useState(6000000);

  // EMI Calculation Formula
  const r = interestRate / (12 * 100);
  const n = tenureYears * 12;
  const emi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  // Stamp Duty Calculation (Maharashtra Rules: 5-7% depending on urban/gender + 1% Metro Cess + ₹30,000 Registration Fee)
  const stampRate = buyerGender === 'Female' ? (isUrban ? 6.0 : 5.0) : (isUrban ? 7.0 : 6.0);
  const stampDutyAmount = Math.round((propertyPrice * stampRate) / 100);
  const registrationFee = Math.min(30000, Math.round(propertyPrice * 0.01));
  const totalGovernmentCharges = stampDutyAmount + registrationFee;

  // Rental Yield Calculation
  const annualRent = monthlyRent * 12;
  const grossRentalYield = ((annualRent / propertyValue) * 100).toFixed(2);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h3 className="font-bold text-navy-900 text-lg flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>Maharashtra Real Estate Financial Calculators</span>
          </h3>
          <p className="text-xs text-slate-500">
            Instant Home Loan EMI, Maharashtra Stamp Duty & Registration, and Gross Rental Yield Estimator.
          </p>
        </div>

        <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button 
            onClick={() => setActiveTab('emi')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'emi' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Home Loan EMI
          </button>
          <button 
            onClick={() => setActiveTab('stamp')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'stamp' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Stamp Duty & Fees
          </button>
          <button 
            onClick={() => setActiveTab('yield')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'yield' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Rental Yield
          </button>
        </div>
      </div>

      {/* Tab 1: EMI Calculator */}
      {activeTab === 'emi' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Loan Amount</span>
                <span className="text-emerald-700 font-extrabold">₹{(loanAmount/100000).toFixed(2)} Lakhs</span>
              </div>
              <input 
                type="range"
                min="500000"
                max="20000000"
                step="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Interest Rate (% p.a.)</span>
                <span className="text-emerald-700 font-extrabold">{interestRate}%</span>
              </div>
              <input 
                type="range"
                min="6.5"
                max="12.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Loan Tenure (Years)</span>
                <span className="text-emerald-700 font-extrabold">{tenureYears} Years</span>
              </div>
              <input 
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-slate-500 font-bold block uppercase text-[10px]">Monthly Home Loan EMI</span>
              <div className="text-3xl font-black text-emerald-700">₹{emi.toLocaleString('en-IN')}/mo</div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Principal Amount:</span>
                <span className="font-bold text-slate-900">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Total Interest Payable:</span>
                <span className="font-bold text-amber-700">₹{totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-bold border-t pt-2 text-sm">
                <span>Total Amount Payable:</span>
                <span className="text-navy-900">₹{totalPayment.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Stamp Duty & Registration */}
      {activeTab === 'stamp' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
          
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Agreement / Property Value (₹)</label>
              <input 
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Buyer Category</label>
                <select 
                  value={buyerGender}
                  onChange={(e) => setBuyerGender(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold"
                >
                  <option value="Male">Male Buyer (Standard 7%)</option>
                  <option value="Female">Female Buyer (1% Concession)</option>
                  <option value="Joint">Joint Registration</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location Zone</label>
                <select 
                  value={isUrban ? 'urban' : 'rural'}
                  onChange={(e) => setIsUrban(e.target.value === 'urban')}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold"
                >
                  <option value="urban">Urban Municipal Corporation</option>
                  <option value="rural">Gram Panchayat / Rural</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-amber-900 font-bold block uppercase text-[10px]">Total Government Statutory Charges</span>
              <div className="text-3xl font-black text-amber-900">₹{totalGovernmentCharges.toLocaleString('en-IN')}</div>
            </div>

            <div className="space-y-2 pt-3 border-t border-amber-200 text-amber-950">
              <div className="flex justify-between font-medium">
                <span>Stamp Duty Rate ({stampRate}%):</span>
                <span className="font-bold">₹{stampDutyAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Registration Fee (Cap ₹30,000):</span>
                <span className="font-bold">₹{registrationFee.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Rental Yield */}
      {activeTab === 'yield' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
          
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Property Purchase Value (₹)</label>
              <input 
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Expected Monthly Rent (₹)</label>
              <input 
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold"
              />
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-emerald-950 font-bold block uppercase text-[10px]">Estimated Gross Rental Yield</span>
              <div className="text-3xl font-black text-emerald-700">{grossRentalYield}% per annum</div>
            </div>

            <p className="text-[11px] text-emerald-900 leading-relaxed">
              Maharashtra urban residential rental yields typically benchmark between <strong>3.5% to 4.5%</strong> in tech hubs like Wakad (Pune) and Andheri (Mumbai).
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
