'use client';
import React, { useEffect, useState } from 'react';
import { getAllTransactionsByParentUserId } from '@/lib/server-actions';

type Transaction = {
    timestamp: string;
    type: string;
    sent_to: string;
    sent_from: string;
    description: string;
    withholdings?: string | null;
    amount: string;
};

const TransactionHistory: React.FC<{ parentId: string }> = ({ parentId }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<keyof Transaction>('type');

    useEffect(() => {
        async function fetchTransactions() {
          try {
            const data = await getAllTransactionsByParentUserId(parentId);
            const formattedData = data.map((transaction) => ({
              timestamp: new Date(transaction.timestamp).toLocaleString(),
              type: transaction.type,
              sent_to: transaction.to_name || "N/A",
              sent_from: transaction.from_name || "N/A",
              description: transaction.description || "N/A",
              withholdings: transaction.withholdings ? `$${(transaction.withholdings / 100).toFixed(2)}` : null,
              amount: `$${(transaction.amount / 100).toFixed(2)}`, // Convert cents to dollars
            }));
            setTransactions(formattedData);
          } catch (error) {
            console.error("Failed to fetch transactions:", error);
          }
        }
    
        fetchTransactions();
      }, [parentId]);

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
        setTransactions(sortedTransactions);
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
    <div id='history' className="flex justify-center m-0">
        <div className="px-5 md:px-10 w-full">
            <div className="flex mx-0 justify-center rounded-xl overflow-hidden border-[1px] border-slate-200 m-4">
                <div className="overflow-x-auto w-full">
                <table className="w-full border border-collapse table-auto">
                    <thead className="bg-white">
                        <tr className="text-left">
                            {['timestamp', 'type', 'sent_to', 'sent_from', 'description', 'withholdings', 'amount'].map((column) => (
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
                    <tbody className="bg-white text-gray-700">
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
                            <td className="border border-r-transparent p-2">{transaction.withholdings}</td>
                            <td className="border border-r-transparent p-2">{transaction.amount}</td>
                        </tr>
                       ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
      </div>
    );
};

export default TransactionHistory;
