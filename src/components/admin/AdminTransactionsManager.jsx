"use client";

import { Card, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
}

export function AdminTransactionsManager() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    apiFetch("/api/admin/transactions")
      .then(({ payments: items }) => {
        if (active) setPayments(items || []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Could not load transactions.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Card><Card.Content className="flex items-center gap-3"><Spinner /> Loading transactions...</Card.Content></Card>;
  if (error) return <Card><Card.Content><p role="alert">{error}</p></Card.Content></Card>;
  if (!payments.length) return <Card><Card.Content>No transactions found.</Card.Content></Card>;

  return (
    <Card className="overflow-hidden">
      <Card.Content className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] border-collapse text-left [&_th]:border-b [&_th]:border-stone-200 [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-xs [&_th]:uppercase [&_th]:text-stone-500 [&_td]:border-b [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-3.5 dark:[&_th]:border-neutral-800 dark:[&_td]:border-neutral-800">
          <thead><tr><th>User</th><th>Amount</th><th>Date</th><th>Status</th><th>Transaction ID</th></tr></thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id || payment.transactionId}>
                <td>{payment.userEmail}</td>
                <td>${Number(payment.amount || 0).toFixed(2)}</td>
                <td>{formatDate(payment.paidAt)}</td>
                <td className="capitalize">{payment.paymentStatus || "unknown"}</td>
                <td className="max-w-64 truncate" title={payment.transactionId}>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Content>
    </Card>
  );
}
