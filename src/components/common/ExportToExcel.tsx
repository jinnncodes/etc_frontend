
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ExportToExcelProps<T extends Record<string, unknown>> {
  data: T[];
  fileName?: string;
  sheetName?: string;
}

const ExportToExcel = <T extends Record<string, unknown>>({
  data,
  fileName = "export",
  sheetName = "Sheet1",
}: ExportToExcelProps<T>) => {
  const handleExport = (): void => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Write to array buffer
    const excelBuffer: ArrayBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md shadow-md transition"
    >
      Export
    </button>
  );
};

export default ExportToExcel;
