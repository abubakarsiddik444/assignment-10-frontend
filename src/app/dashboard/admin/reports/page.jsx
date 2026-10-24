import { reports } from "@/lib/data";

export const metadata = {
  title: "Reports - RecipeHub",
};

export default function ReportsPage() {
  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">Reports</span>
        <h1>Recipe Reports</h1>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Reporter</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.recipeName}</td>
                <td>{report.reporterEmail}</td>
                <td>{report.reason}</td>
                <td>{report.status}</td>
                <td className="button-row">
                  <button className="button button-danger compact" type="button">
                    Remove Recipe
                  </button>
                  <button className="button button-secondary compact" type="button">
                    Dismiss
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
