import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useState } from "react";

export function BrandingSettings() {
  const [primaryColor, setPrimaryColor] = useState("#4A69FF");
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">White-Label Branding</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Customize reports with your agency's branding
      </p>

      <div className="space-y-6">
        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Agency Logo</Label>
          <div className="flex items-center gap-4">
            {logo ? (
              <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg overflow-hidden">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">
                PNG or JPG, max 2MB. Recommended: 500x500px
              </p>
            </div>
          </div>
        </div>

        {/* Primary Color */}
        <div className="space-y-2">
          <Label>Primary Brand Color</Label>
          <div className="flex items-center gap-4">
            <Input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-24 h-12"
            />
            <Input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              placeholder="#4A69FF"
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            This color will be used in PDF reports and charts
          </p>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="p-6 border border-border rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              {logo && (
                <img src={logo} alt="Logo preview" className="w-16 h-16 object-contain" />
              )}
              <div>
                <h4 className="font-bold text-lg">Your Agency Name</h4>
                <p className="text-sm text-muted-foreground">Social Media Performance Report</p>
              </div>
            </div>
            <div className="h-4 rounded" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
          </div>
        </div>

        <Button className="w-full">Save Branding Settings</Button>
      </div>
    </Card>
  );
}
