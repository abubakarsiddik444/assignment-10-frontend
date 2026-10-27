"use client";

import { Button, Card, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ConfirmActionModal } from "@/components/shared/ConfirmActionModal";
import toast from "react-hot-toast";

export function AdminReportsManager() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workingId, setWorkingId] = useState("");

  useEffect(() => {
    let active = true;
    apiFetch("/api/admin/reports")
      .then(({ reports: items }) => {
        if (active) setReports(items || []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Could not load reports.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function resolveReport(report, removeRecipe) {
    const id = report._id;
    setWorkingId(id);
    try {
      await apiFetch(`/api/admin/reports/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: removeRecipe ? "removed" : "dismissed" }),
      });
      setReports((current) => current.map((item) =>
        item._id === id
          ? { ...item, status: removeRecipe ? "removed" : "dismissed" }
          : item
      ));
      toast.success(removeRecipe ? "Recipe removed and report resolved." : "Report dismissed.");
      return true;
    } catch (requestError) {
      toast.error(requestError.message || "Could not resolve this report.");
      return false;
    } finally {
      setWorkingId("");
    }
  }

  if (loading) return <Card><Card.Content className="flex items-center gap-3"><Spinner /> Loading reports...</Card.Content></Card>;
  if (error) return <Card><Card.Content><p role="alert">{error}</p></Card.Content></Card>;
  if (!reports.length) return <Card><Card.Content>No reports to review.</Card.Content></Card>;

  return (
    <Card className="overflow-hidden">
      <Card.Content className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] border-collapse text-left [&_th]:border-b [&_th]:border-stone-200 [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-xs [&_th]:uppercase [&_th]:text-stone-500 [&_td]:border-b [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-3.5 dark:[&_th]:border-neutral-800 dark:[&_td]:border-neutral-800">
          <thead><tr><th>Recipe</th><th>Reporter</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {reports.map((report) => {
              const id = report._id;
              const pending = report.status === "pending";
              return (
                <tr key={id}>
                  <td className="font-semibold">{report.recipeName || "Recipe unavailable"}</td>
                  <td>{report.reporterEmail}</td>
                  <td>{report.reason}</td>
                  <td className="capitalize">{report.status}</td>
                  <td>
                    {pending ? (
                      <div className="flex flex-wrap gap-2">
                        <ConfirmActionModal
                          title="Remove this recipe?"
                          description={`"${report.recipeName || "This recipe"}" will be removed from the site and the report will be marked as resolved.`}
                          confirmLabel="Remove Recipe"
                          pendingLabel="Removing..."
                          onConfirm={() => resolveReport(report, true)}
                        >
                          <Button size="sm" variant="danger" isDisabled={workingId === id}>
                            Remove Recipe
                          </Button>
                        </ConfirmActionModal>
                        <Button size="sm" variant="secondary" isDisabled={workingId === id} onPress={() => resolveReport(report, false)}>Dismiss</Button>
                      </div>
                    ) : "Reviewed"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card.Content>
    </Card>
  );
}
