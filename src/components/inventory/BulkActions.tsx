
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImportExport, FileUp, FileDown, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkActionProps {
  onImportComplete?: (data: any[]) => void;
}

export function BulkActions({ onImportComplete }: BulkActionProps) {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [importResults, setImportResults] = useState<{
    total: number;
    success: number;
    errors: number;
    messages: string[];
  }>({ total: 0, success: 0, errors: 0, messages: [] });
  
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImportFile(e.target.files[0]);
      setImportStatus("idle");
    }
  };
  
  const handleImport = () => {
    if (!importFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV or Excel file first.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate processing
    setImportStatus("processing");
    
    // This would normally be an actual file processing function
    setTimeout(() => {
      // Simulate successful import with some errors
      const mockResults = {
        total: 120,
        success: 116,
        errors: 4,
        messages: [
          "Row 23: Invalid SKU format",
          "Row 45: Missing required price field",
          "Row 89: Invalid category",
          "Row 112: Duplicate SKU"
        ]
      };
      
      setImportResults(mockResults);
      setImportStatus("success");
      
      toast({
        title: "Import Complete",
        description: `Successfully imported ${mockResults.success} of ${mockResults.total} items`,
        variant: mockResults.errors > 0 ? "default" : "default",
      });
      
      // Notify parent component if needed
      if (onImportComplete) {
        onImportComplete([]);
      }
    }, 2000);
  };
  
  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} file for download...`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your ${format.toUpperCase()} file is ready for download`,
      });
      
      // In a real app, this would create and download the file
      const mockLink = document.createElement('a');
      mockLink.href = "#";
      mockLink.setAttribute('download', `inventory_export.${format}`);
      mockLink.click();
    }, 1500);
  };
  
  return (
    <Card className="p-6">
      <Tabs defaultValue="import">
        <TabsList className="mb-4">
          <TabsTrigger value="import">Import Inventory</TabsTrigger>
          <TabsTrigger value="export">Export Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="import">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Import Inventory Items</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a CSV or Excel file with your inventory data. 
                <a href="#" className="text-blue-600 hover:underline ml-1">Download template</a>
              </p>
            </div>
            
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Input 
                  type="file" 
                  accept=".csv,.xlsx,.xls" 
                  onChange={handleFileChange} 
                  className="cursor-pointer"
                />
              </div>
              <Button 
                onClick={handleImport} 
                disabled={!importFile || importStatus === "processing"}
              >
                <FileUp className="h-4 w-4 mr-2" />
                {importStatus === "processing" ? "Importing..." : "Upload & Import"}
              </Button>
            </div>
            
            {importStatus === "success" && (
              <div className="mt-4 border rounded-md">
                <div className="bg-muted p-3 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium">Import Complete</span>
                  </div>
                  <div className="text-sm">
                    Processed {importResults.total} items
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-green-50 p-3 rounded-md border border-green-100">
                      <div className="text-green-700 font-medium">Success</div>
                      <div className="text-2xl font-bold text-green-700">{importResults.success}</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
                      <div className="text-yellow-700 font-medium">Errors</div>
                      <div className="text-2xl font-bold text-yellow-700">{importResults.errors}</div>
                    </div>
                  </div>
                  
                  {importResults.errors > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1 flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                        Error Messages
                      </h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        {importResults.messages.map((msg, idx) => (
                          <li key={idx} className="border-b pb-1">{msg}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="export">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Export Inventory Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download your inventory data in various formats.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 flex flex-col items-center text-center hover:bg-muted cursor-pointer transition-colors" onClick={() => handleExport('csv')}>
                <FileText className="h-10 w-10 text-blue-600 mb-2" />
                <h4 className="font-medium">CSV Format</h4>
                <p className="text-sm text-muted-foreground mb-3">Standard spreadsheet format</p>
                <Button variant="outline" size="sm" className="mt-auto" onClick={() => handleExport('csv')}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Export as CSV
                </Button>
              </Card>
              
              <Card className="p-4 flex flex-col items-center text-center hover:bg-muted cursor-pointer transition-colors" onClick={() => handleExport('xlsx')}>
                <FileText className="h-10 w-10 text-green-600 mb-2" />
                <h4 className="font-medium">Excel Format</h4>
                <p className="text-sm text-muted-foreground mb-3">Full spreadsheet with formatting</p>
                <Button variant="outline" size="sm" className="mt-auto" onClick={() => handleExport('xlsx')}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Export as Excel
                </Button>
              </Card>
              
              <Card className="p-4 flex flex-col items-center text-center hover:bg-muted cursor-pointer transition-colors" onClick={() => handleExport('json')}>
                <FileText className="h-10 w-10 text-orange-600 mb-2" />
                <h4 className="font-medium">JSON Format</h4>
                <p className="text-sm text-muted-foreground mb-3">Data in JSON structure</p>
                <Button variant="outline" size="sm" className="mt-auto" onClick={() => handleExport('json')}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Export as JSON
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
