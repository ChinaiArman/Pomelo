import { Table } from "flowbite-react";

const TransactionsTable = ({ transactions}) => {
    return (
        <div className="mt-5 mb-5">
            <Table hoverable style={{position: 'relative', zIndex: -1}}>
                <Table.Head>
                <Table.HeadCell>Item</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
                <Table.HeadCell>Spending Category</Table.HeadCell>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                {transactions.map((transaction, index) => {
                    const categoryId = transaction.spendingCategoryID
                    var redirect = "/categories?id=" + categoryId;
                    return (
                        <Table.Row
                            key={index}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            onClick={() => window.location.replace(redirect)}
                            style={{ cursor: "pointer" }}
                        >
                            <Table.Cell>{transaction.transactionName}</Table.Cell>
                            <Table.Cell>{transaction.transactionAmount}</Table.Cell>
                            <Table.Cell>{transaction.spendingCategoryName}</Table.Cell>
                            <Table.Cell>{transaction.username}</Table.Cell>
                            <Table.Cell>{transaction.transactionDate}</Table.Cell>
                        </Table.Row>
                    )
                        
                })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default TransactionsTable;
