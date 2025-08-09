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
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group border-2 border-white/20 backdrop-blur-sm"
          size="icon"
        >
          <Plus className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse"></div>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 border-l-2 border-blue-200/60">
        <SheetHeader className="mb-8 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full -translate-y-4 translate-x-4"></div>
          <SheetTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Send className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Report New Issue
            </span>
          </SheetTitle>
          <SheetDescription className="text-slate-600 font-medium mt-2">
            Help improve your community by reporting issues that need attention.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Issue Description
            </label>
            <Textarea
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none bg-white/80 backdrop-blur-sm border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl shadow-sm"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Category
            </label>
            <Select onValueChange={setCategory} value={category} required>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl shadow-sm h-12">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-slate-200 rounded-xl shadow-xl">
                {CATEGORIES.map(cat => {
                  const details = CATEGORY_DETAILS[cat as keyof typeof CATEGORY_DETAILS];
                  return (
                    <SelectItem key={cat} value={cat} className="rounded-lg hover:bg-blue-50 focus:bg-blue-50">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 ${details.color} rounded-lg flex items-center justify-center text-white shadow-sm`}>
                          {details.icon}
                        </div>
                        <span className="font-medium">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Location
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={handleGetLocation}
              disabled={isLocating}
              className="w-full justify-start h-12 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:border-blue-400 rounded-xl shadow-sm transition-all duration-200"
            >
              {isLocating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-3 animate-spin text-blue-600" />
                  <span className="font-medium">Getting location...</span>
                </>
              ) : location ? (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-3 text-green-600" />
                  <span className="truncate font-medium">{location.name}</span>
                </>
              ) : (
                <>
                  <MapPin className="h-5 w-5 mr-3 text-slate-600" />
                  <span className="font-medium">Get Current Location</span>
                </>
              )}
            </Button>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !description || !category || !location} 
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Submitting Issue...
              </>
            ) : (
              <>
                <Send className="mr-3 h-5 w-5" />
                Submit Issue Report
              </>
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}