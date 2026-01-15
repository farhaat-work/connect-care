export default function AnalyticsInsights() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
      <h2 className="text-sm font-semibold text-gray-700">
        Insights
      </h2>

      <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
        📈 Readmissions increased by <b>4%</b> compared to last quarter
      </div>

      <div className="p-3 bg-green-50 rounded-lg text-sm text-gray-700">
        💡 Diabetes shows the highest readmission rate among diseases
      </div>
    </div>
  );
}
