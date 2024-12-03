'use client';
import React, { useState } from 'react';

type SettingsType = {
    payLoanInBill: boolean;
    canTakeOutLoan: boolean;
    loansHaveInterest: boolean;
    maxLoan?: number | null;
    maxInterest?: number | null;
    multiCheckingAccount: boolean;
    savingAccount: boolean;
    transfersCanBeTaxed: boolean;
    maxTaxes?: number | null;
};

const Settings: React.FC = () => {
    const [payLoanInBill, setPayLoanInBill] = useState(true);
    const [canTakeOutLoan, setCanTakeOutLoan] = useState(true);
    const [loansHaveInterest, setLoansHaveInterest] = useState(true);
    const [maxLoan, setMaxLoan] = useState<number | null>(null);
    const [isFocusedML, setIsFocusedML] = useState(false);
    const [maxInterest, setMaxInterest] = useState<number | null>(null);
    const [isFocusedMI, setIsFocusedMI] = useState(false);
    const [multiCheckingAccount, setMultiCheckingAccount] = useState(true);
    const [savingAccount, setSavingAccount] = useState(true);
    const [transfersCanBeTaxed, setTransfersCanBeTaxed] = useState(true);
    const [maxTaxes, setMaxTaxes] = useState<number | null>(null);
    const [isFocusedMT, setIsFocusedMT] = useState(false);

    const handlePayLoanInBill = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPayLoanInBill(e.target.checked);
    };
    const handleCanTakeOutLoan = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCanTakeOutLoan(e.target.checked);
    };
    const handleLoansHaveInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoansHaveInterest(e.target.checked);
    };
    const handleMaxLoan = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxLoan(value === '' ? null : parseFloat(value));
    };
    const handleFocusML = () => setIsFocusedML(true);
    const handleBlurML = () => setIsFocusedML(false);
    const handleMaxInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxInterest(value === '' ? null : parseFloat(value));
    };
    const handleFocusMI = () => setIsFocusedMI(true);
    const handleBlurMI = () => setIsFocusedMI(false);
    const handleMultiCheckingAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMultiCheckingAccount(e.target.checked);
    };
    const handleSavingAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSavingAccount(e.target.checked);
    };
    const handleTransfersCanBeTaxed = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransfersCanBeTaxed(e.target.checked);
    };
    const handleMaxTaxes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxTaxes(value === '' ? null : parseFloat(value));
    };
    const handleFocusMT = () => setIsFocusedMT(true);
    const handleBlurMT = () => setIsFocusedMT(false);

    return (
        <div className="flex flex-col bg-white p-10 rounded-lg border border-gray-100 shadow-lg max-w-md lg:max-w-2xl mx-auto mt-6">
            <header className="items-start mb-6">
                <h1 className="text-4xl font-inter text-text text-left">Settings</h1>
                <div className="w-48 h-1 m-2 rounded-full overflow-hidden flex">
                    <div className="flex-1 bg-brightRed"></div>
                    <div className="flex-1 bg-brightYellow"></div>
                    <div className="flex-1 bg-brightBlue"></div>
                </div>
            </header>
            <form>
                <div className="mb-6">
                    <h2 className="font-bold mb-1">Bills and Payments</h2>
                    <div className="flex items-center space-x-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={payLoanInBill}
                                onChange={handlePayLoanInBill}
                                className="sr-only"
                            />
                            <div className={`w-11 h-6 flex items-center rounded-full
                                transition-all
                                duration-300 ${payLoanInBill ? 'bg-brightGreen' : 'bg-gray-200'}`}
                            >
                                <div className="w-5 h-5 bg-white rounded-full
                                    shadow
                                    transition-transform
                                    duration-300" style={{transform: payLoanInBill ? 'translateX(1.25rem)' : 'translateX(0)',}}
                                >
                                </div>
                            </div>
                        </label>
                        <p>Loans can be paid back in the form of bills.</p>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="font-bold mb-1">Loans and Interest</h2>
                    <div className="flex flex-col justify-between md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                        <div className="flex flex-col space-y-3 w-full md:w-1/2">
                            <div className="flex items-center space-x-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={canTakeOutLoan}
                                        onChange={handleCanTakeOutLoan}
                                        className="sr-only"
                                    />
                                    <div className={`w-11 h-6 flex items-center rounded-full
                                        transition-all
                                        duration-300 ${canTakeOutLoan ? 'bg-brightGreen' : 'bg-gray-200'}`}
                                    >
                                        <div className="w-5 h-5 bg-white rounded-full
                                            shadow
                                            transition-transform
                                            duration-300" style={{transform: canTakeOutLoan ? 'translateX(1.25rem)' : 'translateX(0)',}}
                                        >
                                        </div>
                                    </div>
                                </label>
                                <p>Loans can be taken out.</p>
                            </div>
                            <div className="relative">
                                <label className="font-light mb-1">Maximum Loan</label>
                                <div className="relative w-full">
                                    <input
                                        type="number"
                                        placeholder={isFocusedML || maxLoan !== null ? '' : 'N/A'}
                                        value={maxLoan || ''}
                                        onChange={handleMaxLoan}
                                        onFocus={handleFocusML}
                                        onBlur={handleBlurML}
                                        className="pl-8 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                    />
                                    <span
                                        className={`absolute inset-y-0 left-3 flex items-center text-gray-500 transition-opacity ${
                                            isFocusedML || maxLoan !== null ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                    $
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 w-full md:w-1/2">
                            <div className="flex items-center space-x-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={loansHaveInterest}
                                        onChange={handleLoansHaveInterest}
                                        className="sr-only"
                                    />
                                    <div className={`w-11 h-6 flex items-center rounded-full
                                        transition-all
                                        duration-300 ${loansHaveInterest ? 'bg-brightGreen' : 'bg-gray-200'}`}
                                    >
                                        <div className="w-5 h-5 bg-white rounded-full
                                            shadow
                                            transition-transform
                                            duration-300" style={{transform: loansHaveInterest ? 'translateX(1.25rem)' : 'translateX(0)',}}
                                        >
                                        </div>
                                    </div>
                                </label>
                                <p>Loans can have interest.</p>
                            </div>
                            <div className="relative">
                                <label className="font-light mb-1">Maximum Interest</label>
                                <div className="relative w-full">
                                    <div className="flex">
                                        <input
                                            type="number"
                                            placeholder={isFocusedMI || maxInterest !== null ? '' : 'N/A'}
                                            value={maxInterest || ''}
                                            onChange={handleMaxInterest}
                                            onFocus={handleFocusMI}
                                            onBlur={handleBlurMI}
                                            className="pr-8 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-right"
                                        />
                                        <span
                                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 transition-opacity ${
                                                isFocusedMI || maxInterest !== null ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        >
                                        %
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="font-bold mb-1">Savings and Checking</h2>
                    <div className="flex flex-col justify-between md:flex-row">
                    <div className="flex items-center space-x-3 p-1 flex-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={multiCheckingAccount}
                                onChange={handleMultiCheckingAccount}
                                className="sr-only"
                            />
                            <div className={`w-11 h-6 flex items-center rounded-full
                                transition-all
                                duration-300 ${multiCheckingAccount ? 'bg-brightGreen' : 'bg-gray-200'}`}
                            >
                                <div className="w-5 h-5 bg-white rounded-full
                                    shadow
                                    transition-transform
                                    duration-300" style={{transform: multiCheckingAccount ? 'translateX(1.25rem)' : 'translateX(0)',}}
                                >
                                </div>
                            </div>
                        </label>
                        <p>More than one checking account can be created.</p>
                    </div>
                    <div className="flex items-center space-x-3 p-1 flex-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={savingAccount}
                                onChange={handleSavingAccount}
                                className="sr-only"
                            />
                            <div className={`w-11 h-6 flex items-center rounded-full
                                transition-all
                                duration-300 ${savingAccount ? 'bg-brightGreen' : 'bg-gray-200'}`}
                            >
                                <div className="w-5 h-5 bg-white rounded-full
                                    shadow
                                    transition-transform
                                    duration-300" style={{transform: savingAccount ? 'translateX(1.25rem)' : 'translateX(0)',}}
                                >
                                </div>
                            </div>
                        </label>
                        <p>Savings accounts can be created.</p>
                    </div>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="font-bold mb-1">Taxes and Withholding</h2>
                    <div className="flex items-center space-x-3 mb-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={transfersCanBeTaxed}
                                onChange={handleTransfersCanBeTaxed}
                                className="sr-only"
                            />
                            <div className={`w-11 h-6 flex items-center rounded-full
                                transition-all
                                duration-300 ${transfersCanBeTaxed ? 'bg-brightGreen' : 'bg-gray-200'}`}
                            >
                                <div className="w-5 h-5 bg-white rounded-full
                                    shadow
                                    transition-transform
                                    duration-300" style={{transform: transfersCanBeTaxed ? 'translateX(1.25rem)' : 'translateX(0)',}}
                                >
                                </div>
                            </div>
                        </label>
                        <p>Transfers can be taxed.</p>
                    </div>
                    <div className="flex flex-col mb-6 relative">
                        <label className="font-light mb-1">Maximum Taxes</label>
                        <div className="relative w-full">
                            <input
                                type="number"
                                placeholder={isFocusedMT || maxTaxes !== null ? '' : 'N/A'}
                                value={maxTaxes || ''}
                                onChange={handleMaxTaxes}
                                onFocus={handleFocusMT}
                                onBlur={handleBlurMT}
                                className="pl-8 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                            />
                            <span
                                className={`absolute inset-y-0 left-3 flex items-center text-gray-500 transition-opacity ${
                                    isFocusedMT || maxTaxes !== null ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                            $
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="font-bold mb-3">General Settings</h2>
                    <div className="flex flex-row justify-center">
                        <div className="font-normal pr-5">Reset Password</div>
                        <div className="font-normal pr-5">Reset Pin</div>
                        <div className="font-normal text-brightRed">Delete Account</div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-brightRed text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Settings;
