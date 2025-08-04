import { ReportForm } from "@/components/report/report-form"
import { ReportHeader } from "@/components/report/report-header"

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ReportHeader />
      <div className="container mx-auto px-4 py-8">
        <ReportForm />
      </div>
    </div>
  )
}
