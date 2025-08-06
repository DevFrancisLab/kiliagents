"use client";

import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MapPin, Send, AlertCircle, CheckCircle2, Building2, Leaf, Users, Briefcase, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ["development", "environment", "social", "sme", "safety"];

const CATEGORY_DETAILS = {
  development: {
    icon: <Building2 className="w-4 h-4" />,
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-700"
  },
  environment: {
    icon: <Leaf className="w-4 h-4" />,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700"
  },
  social: {
    icon: <Users className="w-4 h-4" />,
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700"
  },
  sme: {
    icon: <Briefcase className="w-4 h-4" />,
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700"
  },
  safety: {
    icon: <Shield className="w-4 h-4" />,
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700"
  }
};

export default function IssueReporter() {
  const { submitIssue } = useApi();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState<{ lat: number; lon: number; name: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleGetLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.", {
        icon: '🚫',
        style: {
          borderRadius: '12px',
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fca5a5'
        }
      });
      setIsLocating(false);
      return;
    }

    toast.promise(
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              const data = await response.json();
              const place_name = data.display_name || 'Unknown location';
              setLocation({ lat: latitude, lon: longitude, name: place_name });
              resolve(place_name);
            } catch (err) {
              setLocation({ lat: latitude, lon: longitude, name: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}` });
              reject("Failed to get location name.");
            }
          },
          (error) => {
            reject("Unable to retrieve your location.");
          }
        );
      }),
      {
        loading: 'Fetching location...',
        success: (name) => `📍 Location found: ${name}`,
        error: (err) => `❌ ${err}`,
      },
      {
        style: {
          borderRadius: '12px',
          background: '#f8fafc',
          color: '#475569',
          border: '1px solid #e2e8f0'
        },
        success: {
          style: {
            background: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #86efac'
          }
        },
        error: {
          style: {
            background: '#fee2e2',
            color: '#991b1b',
            border: '1px solid #fca5a5'
          }
        }
      }
    ).finally(() => setIsLocating(false));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !category || !location) {
      toast.error("Please fill in all fields and set a location.", {
        icon: <AlertCircle className="w-4 h-4" />,
        style: {
          borderRadius: '12px',
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fca5a5'
        }
      });
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

    await toast.promise(
      submitIssue(issueData),
      {
        loading: 'Submitting issue...',
        success: '🎉 Issue submitted successfully!',
        error: 'Failed to submit issue. Please try again.',
      },
      {
        style: {
          borderRadius: '12px',
          background: '#f8fafc',
          color: '#475569',
          border: '1px solid #e2e8f0'
        },
        success: {
          style: {
            background: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #86efac'
          }
        },
        error: {
          style: {
            background: '#fee2e2',
            color: '#991b1b',
            border: '1px solid #fca5a5'
          }
        }
      }
    );

    // Reset form on success
    setDescription('');
    setCategory('');
    setLocation(null);
    setIsSubmitting(false);
  };

  const selectedCategoryDetails = category ? CATEGORY_DETAILS[category as keyof typeof CATEGORY_DETAILS] : null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50/30 rounded-2xl shadow-2xl border border-slate-200/60 backdrop-blur-sm">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/10 to-cyan-400/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Send className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Report a New Issue
            </h3>
          </div>
          <p className="text-slate-600 text-sm">Help improve your community by reporting issues that need attention.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              Issue Description
            </label>
            <Textarea
              placeholder="Describe the issue in detail... (e.g., broken streetlight, pothole, safety concern)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] bg-white/80 backdrop-blur-sm border-slate-200 hover:border-slate-300 focus:border-blue-400 transition-colors resize-none rounded-xl shadow-sm"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
              Category
            </label>
            <Select onValueChange={setCategory} value={category} required>
              <SelectTrigger className={`bg-white/80 backdrop-blur-sm border-slate-200 hover:border-slate-300 focus:border-blue-400 transition-all rounded-xl h-12 ${selectedCategoryDetails ? `${selectedCategoryDetails.bgColor} ${selectedCategoryDetails.borderColor}` : ''}`}>
                <SelectValue placeholder="Select a category for your issue">
                  {selectedCategoryDetails && (
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 bg-gradient-to-r ${selectedCategoryDetails.color} rounded-lg flex items-center justify-center text-white`}>
                        {selectedCategoryDetails.icon}
                      </div>
                      <span className={`font-medium ${selectedCategoryDetails.textColor}`}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 bg-white/95 backdrop-blur-sm">
                {CATEGORIES.map(cat => {
                  const details = CATEGORY_DETAILS[cat as keyof typeof CATEGORY_DETAILS];
                  return (
                    <SelectItem 
                      key={cat} 
                      value={cat}
                      className="rounded-lg hover:bg-slate-50 focus:bg-slate-50"
                    >
                      <div className="flex items-center gap-3 py-1">
                        <div className={`w-6 h-6 bg-gradient-to-r ${details.color} rounded-lg flex items-center justify-center text-white`}>
                          {details.icon}
                        </div>
                        <span className="font-medium text-slate-700">
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
              Location
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={handleGetLocation}
              disabled={isLocating}
              className={`w-full h-12 rounded-xl border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left justify-start gap-3 font-medium ${
                location 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                  : 'bg-white/80 backdrop-blur-sm'
              }`}
            >
              {isLocating ? (
                <>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  </div>
                  <span>Fetching location...</span>
                </>
              ) : location ? (
                <>
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="truncate flex-1">{location.name}</span>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-slate-600" />
                  </div>
                  <span>Get Current Location</span>
                </>
              )}
            </Button>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting || !description || !category || !location} 
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting Issue...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Issue Report
              </>
            )}
          </Button>
        </form>

        {/* Progress indicator */}
        <div className="mt-6 pt-6 border-t border-slate-200/60">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="flex gap-1">
              <div className={`w-2 h-2 rounded-full transition-colors ${description ? 'bg-blue-400' : 'bg-slate-300'}`}></div>
              <div className={`w-2 h-2 rounded-full transition-colors ${category ? 'bg-blue-400' : 'bg-slate-300'}`}></div>
              <div className={`w-2 h-2 rounded-full transition-colors ${location ? 'bg-blue-400' : 'bg-slate-300'}`}></div>
            </div>
            <span>Complete all fields to submit</span>
          </div>
        </div>
      </div>
    </div>
  );
}