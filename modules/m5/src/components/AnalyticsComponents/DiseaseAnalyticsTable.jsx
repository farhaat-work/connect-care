const data = [
  { disease: "Diabetes", rate: "14%" },
  { disease: "Pneumonia", rate: "35%" },
  { disease: "Heart Disease", rate: "60%" },
  { disease: "COPD", rate: "35%" },
  { disease: "Hypertension", rate: "14%" },
];

export default function DiseaseAnalyticsTable() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Readmission Rate by Disease
      </h2>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.disease}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.disease}</span>
              <span className="font-medium">{item.rate}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: item.rate }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

