'use client';
import React, { useState } from 'react';

type Transaction = {
    timestamp: string;
    type: string;
    sent_to: string;
    sent_from: string;
    description: string;
    interest: string;
    withholdings?: string | null;
    amount: string;
};

const TransactionHistory: React.FC = () => {
    const [transactions, setTransations] = useState<Transaction[]>([
        {
            timestamp: 'November 11, 2024 10:19 PM',
            type: 'Deposit',
            sent_to: 'Samantha',
            sent_from: 'Mom',
            description: 'Weekly allowance',
            interest: '0%',
            withholdings: '$0.00',
            amount: '$20.00',
        },
        {
            timestamp: 'November 11, 2024 10:40 PM',
            type: 'Deposit / Taxes',
            sent_to: 'Christopher',
            sent_from: 'Mom',
            description: 'Weekly allowance',
            interest: '0%',
            withholdings: '$5.00',
            amount: '$15.00',
        },
        {
            timestamp: 'November 11, 2024 10:49 PM',
            type: 'Loan',
            sent_to: 'Christopher',
            sent_from: 'Samantha',
            description: 'Loaning money for Pokemon Cards',
            interest: '30%',
            withholdings: 'N/A',
            amount: '$20.00',
        },
        {
            timestamp: 'November 11, 2024 11:00 PM',
            type: 'Payment',
            sent_to: 'Samantha',
            sent_from: 'Christopher',
            description: 'Loan Payment',
            interest: '0%',
            withholdings: 'N/A',
            amount: '$5.00',
        },
        {
            timestamp: 'November 11, 2024 11:24 PM',
            type: 'Transfer',
            sent_to: 'Samantha',
            sent_from: 'Savings',
            description: 'Savings Transfer',
            interest: '0%',
            withholdings: null,
            amount: '$50.00',
        },
    ]);

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<keyof Transaction>('type');

    const handleSort = (column: keyof Transaction) => {
        const sortedTransactions = [...transactions].sort((a, b) => {
            const aValue = column === 'amount' ? parseFloat(a[column]?.replace('$', '') || '0') : a[column] || '';
            const bValue = column === 'amount' ? parseFloat(b[column]?.replace('$', '') || '0') : b[column] || '';
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
        setTransations(sortedTransactions);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortColumn(column);
    };

    const getTransactionTypeStyle = (type: string) => {
        const lowerCaseType = type.toLowerCase();
        if (lowerCaseType.includes('deposit / taxes')) {
            return 'bg-orange-100 text-orange-800 px-2 py-1 rounded-full';
        }
        if (lowerCaseType.includes('deposit')) {
            return 'bg-green-100 text-green-800 px-2 py-1 rounded-full';
        }
        if (lowerCaseType.includes('loan')) {
            return 'bg-red-100 text-red-800 px-2 py-1 rounded-full';
        }
        if (lowerCaseType.includes('payment')) {
            return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full';
        }
        if (lowerCaseType.includes('transfer')) {
            return 'bg-teal-100 text-teal-800 px-2 py-1 rounded-full';
        }
        return 'bg-gray-100 text-gray-800';
    };

    return (
    <div className="flex justify-center m-0">
        <div
            className="p-6 w-full"
        >
          <header className="flex flex-col items-center text-center font-inter text-4xl text-text">
            Transaction History
            <div className="w-96 h-1 mt-2 mb-6 rounded-full overflow-hidden mx-auto flex">
              <div className="flex-1 bg-brightRed"></div>
              <div className="flex-1 bg-brightYellow"></div>
              <div className="flex-1 bg-brightBlue"></div>
            </div>
          </header>
            <div className="flex justify-center rounded-xl overflow-hidden border-[1px] border-slate-200 m-4">
                <table className="w-full border border-collapse table-auto">
                    <thead className="bg-slate-100">
                        <tr className="text-left">
                            {['timestamp', 'type', 'sent_to', 'sent_from', 'description', 'interest', 'withholdings', 'amount'].map((column) => (
                            <th
                                key={column}
                                className="border border-r-transparent p-2 cursor-pointer"
                                onClick={() => handleSort(column as keyof Transaction)}
                            >
                                <span className="flex items-center">
                                    {column.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className={`w-4 h-4 ml-2 transform ${
                                            sortColumn === column && sortOrder === 'asc' ? 'rotate-180' : ''
                                        }`}
                                        style={{ zIndex: 20 }}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-slate-50 text-gray-700">
                      {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td className="border border-x-transparent p-2">{transaction.timestamp}</td>
                            <td className="border border-r-transparent p-2">
                                <span
                                    className={`inline-flex items-center space-x-1 text-sm pe-3.5 ${getTransactionTypeStyle(transaction.type)}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-dot mb-1"
                                            viewBox="0 0 12 12"
                                        >
                                        <path
                                            d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
                                        />
                                        </svg>
                                        <span>{transaction.type}</span>
                                    </span>
                            </td>
                            <td className="border border-r-transparent p-2">{transaction.sent_to}</td>
                            <td className="border border-r-transparent p-2">{transaction.sent_from}</td>
                            <td className="border border-r-transparent p-2">{transaction.description}</td>
                            <td className="border border-r-transparent p-2">{transaction.interest}</td>
                            <td className="border border-r-transparent p-2">{transaction.withholdings}</td>
                            <td className="border border-r-transparent p-2">{transaction.amount}</td>
                        </tr>
                       ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    );
};

export default TransactionHistory;