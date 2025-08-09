"use client";

import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MapPin, Send, AlertCircle, CheckCircle2, Building2, Leaf, Users, Briefcase, Shield, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CATEGORIES = ["development", "environment", "social", "sme", "safety"];

const CATEGORY_DETAILS = {
  development: { icon: <Building2 className="w-4 h-4" />, color: "bg-blue-500" },
  environment: { icon: <Leaf className="w-4 h-4" />, color: "bg-green-500" },
  social: { icon: <Users className="w-4 h-4" />, color: "bg-orange-500" },
  sme: { icon: <Briefcase className="w-4 h-4" />, color: "bg-yellow-500" },
  safety: { icon: <Shield className="w-4 h-4" />, color: "bg-red-500" }
};

export function FloatingIssueReporter() {
  const { submitIssue } = useApi();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState<{ lat: number; lon: number; name: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGetLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const place_name = data.display_name || 'Unknown location';
          setLocation({ lat: latitude, lon: longitude, name: place_name });
          toast.success(`Location found: ${place_name}`);
        } catch (err) {
          setLocation({ lat: latitude, lon: longitude, name: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}` });
          toast.error("Failed to get location name.");
        }
        setIsLocating(false);
      },
      (error) => {
        toast.error("Unable to retrieve your location.");
        setIsLocating(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !category || !location) {
      toast.error("Please fill in all fields and set a location.");
      return;
    }

    const issueData = {
      description,
      category,
      latitude: location.lat,
      longitude: location.lon,
      place_name: location.name,
    };

    setIsSubmitting(true);

    try {
      await submitIssue(issueData);
      toast.success("Issue submitted successfully!");
      setDescription('');
      setCategory('');
      setLocation(null);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to submit issue. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          size="icon"
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" />
            Report New Issue
          </SheetTitle>
          <SheetDescription>
            Help improve your community by reporting issues that need attention.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Issue Description
            </label>
            <Textarea
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Category
            </label>
            <Select onValueChange={setCategory} value={category} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => {
                  const details = CATEGORY_DETAILS[cat as keyof typeof CATEGORY_DETAILS];
                  return (
                    <SelectItem key={cat} value={cat}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 ${details.color} rounded flex items-center justify-center text-white`}>
                          {details.icon}
                        </div>
                        <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Location
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={handleGetLocation}
              disabled={isLocating}
              className="w-full justify-start"
            >
              {isLocating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Getting location...
                </>
              ) : location ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                  <span className="truncate">{location.name}</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Current Location
                </>
              )}
            </Button>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !description || !category || !location} 
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Issue
              </>
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}