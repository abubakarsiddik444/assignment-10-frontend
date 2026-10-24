import { payments } from "@/lib/data";

export const metadata = {
  title: "Transactions - RecipeHub",
};

export default function TransactionsPage() {
  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">Payments</span>
        <h1>Transactions</h1>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.transactionId}>
                <td>{payment.userEmail}</td>
                <td>${payment.amount}</td>
                <td>{payment.paidAt}</td>
                <td>{payment.paymentStatus}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
