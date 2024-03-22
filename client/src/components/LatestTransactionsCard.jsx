import Transactions from "../pages/Transactions";
import { currencyFormatter } from "../utils";

const LatestTransactionsCard = ({ transactions }) => {
    transactions = transactions.slice(0, 5);
    return (
        <div className="w-full max-w-md p-4 bg-theme-oldlace border border-theme-oldlace rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Transactions</h5>
                <a href="/transactions" className="text-sm font-medium text-theme-mantis hover:underline dark:text-blue-500">
                    View all
                </a>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.map((transaction, index) => (
                        <li key={index} className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src={transaction.styles.image} alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {transaction.transactionName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {transaction.spendingCategoryName}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {currencyFormatter.format(transaction.transactionAmount)}
                                </div>
                            </div>
                        </li>
                    ))}
                    
                </ul>
            </div>
        </div>
    );
};

export default LatestTransactionsCard;
