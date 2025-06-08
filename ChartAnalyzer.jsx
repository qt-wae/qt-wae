
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, RefreshCw } from "lucide-react";

export default function ChartAnalyzer() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const analyzeChart = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "فشل التحليل. حاول مجدداً." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-6">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-xl font-bold">🔍 ارفع صورة الشارت لتحليلها</h2>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />

          {preview && (
            <div className="border p-2 rounded-lg">
              <img src={preview} alt="Chart Preview" className="w-full rounded" />
            </div>
          )}

          <Button onClick={analyzeChart} disabled={loading || !image}>
            {loading ? <RefreshCw className="animate-spin mr-2" /> : <UploadCloud className="mr-2" />}
            {loading ? "جارٍ التحليل..." : "ابدأ التحليل"}
          </Button>

          {result && (
            <div className="mt-4 text-center">
              {result.error ? (
                <p className="text-red-500 font-bold">{result.error}</p>
              ) : (
                <>
                  <p className="text-lg font-semibold">📈 التوصية: {result.signal === "buy" ? "شراء" : "بيع"}</p>
                  <p className="text-sm text-muted">الاتجاه العام: {result.trend === "up" ? "صاعد" : "هابط"}</p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
