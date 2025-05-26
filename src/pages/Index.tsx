
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Leaf, CheckCircle } from 'lucide-react';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{
    class: string;
    confidence: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const diseaseClasses = ['Blight', 'Common_Rust', 'Gray_Leaf_Spot', 'Healthy'];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
    }
  };

  const simulateClassification = () => {
    setIsProcessing(true);
    
    // Simulate API call with random result
    setTimeout(() => {
      const randomClass = diseaseClasses[Math.floor(Math.random() * diseaseClasses.length)];
      const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      
      setResult({
        class: randomClass,
        confidence: randomConfidence
      });
      setIsProcessing(false);
    }, 2000);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-green-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Corn Leaf Disease Classifier</h1>
          </div>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Upload a corn leaf image to classify it as Blight, Common_Rust, Gray_Leaf_Spot, or Healthy.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Upload Section */}
          <Card className="mb-8 border-green-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-700 flex items-center justify-center gap-2">
                <Upload className="h-6 w-6" />
                Upload Corn Leaf Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!selectedFile ? (
                <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                  <Upload className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-lg font-medium text-green-700">
                      Click to upload an image
                    </span>
                    <p className="text-sm text-green-600 mt-2">
                      Supports PNG and JPEG files
                    </p>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {previewUrl && (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Selected corn leaf"
                        className="w-full max-w-md mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={simulateClassification}
                      disabled={isProcessing}
                      className="bg-green-600 hover:bg-green-700 text-white px-8"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Analyzing...
                        </div>
                      ) : (
                        'Classify Image'
                      )}
                    </Button>
                    <Button
                      onClick={resetUpload}
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      Upload New Image
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <Card className="border-green-300 bg-green-50 shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-green-700 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  Classification Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-6">
                  <div className="text-center space-y-3">
                    <div>
                      <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
                        Predicted Class
                      </p>
                      <p className="text-3xl font-bold text-green-800 mt-1">
                        {result.class}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
                        Confidence Score
                      </p>
                      <p className="text-2xl font-semibold text-green-700 mt-1">
                        {result.confidence}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Development Team</h3>
            <div className="flex flex-wrap justify-center gap-6 text-green-100">
              <span className="font-medium">Ishan Jeumihiro Balao</span>
              <span className="font-medium">Sean Andrei Dizon</span>
              <span className="font-medium">Zach Dela Cruz</span>
            </div>
          </div>
          <div className="border-t border-green-700 pt-4">
            <p className="text-green-200 text-sm">
              © 2024 Corn Leaf Disease Classifier. Built with React, Tailwind CSS, and Vite.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
