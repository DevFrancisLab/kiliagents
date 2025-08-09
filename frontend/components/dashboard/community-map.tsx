"use client";

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map as MapIcon, MapPin, Camera, Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import { useApi } from '@/hooks/useApi';
import 'leaflet/dist/leaflet.css';
import type { LatLng, LeafletMouseEvent } from 'leaflet';

interface Issue {
  id: number;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
  status: string;
  proof: string | null;
}

export function CommunityMap() {
  const { fetchIssues, submitIssue } = useApi();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [newIssueLocation, setNewIssueLocation] = useState<LatLng | null>(null);
  const [placeName, setPlaceName] = useState<string>('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [proof, setProof] = useState<File | null>(null);
  const [proofFileName, setProofFileName] = useState('');

  const kilimaniPosition: [number, number] = [-1.2921, 36.7872];

  useEffect(() => {
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });

    const loadIssues = async () => {
      try {
        const data = await fetchIssues();
        setIssues(data);
      } catch (error) {
        // Error is already handled and toasted by the hook
        console.error("Failed to load issues from component");
      }
    };

    loadIssues();
  }, [fetchIssues]);

  const handleSubmitNewIssue = async () => {
    if (!newIssueLocation || !description || !category) {
      toast.error("Please fill all fields.");
      return;
    }

    const issueData = {
      latitude: newIssueLocation.lat,
      longitude: newIssueLocation.lng,
      description,
      category,
      place_name: placeName || `Approx. ${newIssueLocation.lat.toFixed(4)}, ${newIssueLocation.lng.toFixed(4)}`,
      // proof submission would require a separate multipart/form-data upload endpoint
    };

    try {
      const newIssue = await submitIssue(issueData);
      setIssues(prevIssues => [...prevIssues, newIssue]);
      toast.success("Your report has been received.");
      setNewIssueLocation(null);
      setPlaceName('');
      setDescription('');
      setCategory('');
      setProof(null);
      setProofFileName('');
    } catch (error) {
      toast.error((error as Error).message || "Submission failed.");
      console.error("Failed to submit issue from component", error);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click: async (e: LeafletMouseEvent) => {
        setNewIssueLocation(e.latlng);
        setPlaceName('');
        // Reverse geocode using Nominatim
        try {
          const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json&zoom=16`);
          if (!resp.ok) throw new Error('Failed to fetch place name');
          const data = await resp.json();
          setPlaceName(data.display_name || '');
        } catch (err) {
          setPlaceName('');
          toast.error('Could not fetch a name for this location.');
        }
      },
    });
    return null;
  };

  return (
    <>
      <Toaster position="top-right" />
      <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 rounded-t-xl border-b border-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <MapIcon className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Community Issues Map
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
              <Navigation className="w-3 h-3 inline mr-1" />
              Interactive
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
        <div className="h-[500px] w-full rounded-xl overflow-hidden relative shadow-lg border border-slate-200/60">
          <MapContainer center={kilimaniPosition} zoom={15} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {issues.map(issue => (
  <Marker key={issue.id} position={[issue.latitude, issue.longitude]}>
    <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
      <div style={{ maxWidth: 200 }}>
        <div className="font-semibold mb-1">{issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}</div>
        <div className="text-xs">{issue.description}</div>
        {typeof issue.proof === "string" && issue.proof && (
          <div className="mt-2">
            <img
              src={issue.proof}
              alt="Proof"
              style={{ maxWidth: '100%', maxHeight: 80, borderRadius: 4, border: '1px solid #eee' }}
              onClick={e => {
                e.stopPropagation();
                window.open(issue.proof!, '_blank');
              }}
            />
          </div>
        )}
      </div>
    </Tooltip>
    <Popup>
      <b>{issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}</b><br />
      {issue.description}
      {issue.proof && <><br/><a href={issue.proof} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Proof</a></>}
    </Popup>
  </Marker>
))}
            <MapEvents />
          </MapContainer>
          <Dialog open={!!newIssueLocation} onOpenChange={() => setNewIssueLocation(null)}>
            <DialogContent className="z-[1000] bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 border-2 border-blue-200/60 shadow-2xl">
              <DialogHeader className="mb-6 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full -translate-y-2 translate-x-2"></div>
                <DialogTitle className="flex items-center gap-3 text-xl font-bold">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Report New Issue
                  </span>
                </DialogTitle>
                <DialogDescription className="text-slate-600 font-medium mt-2 ml-13">
                  {placeName
                    ? <> <span className="font-semibold text-blue-700">{placeName}</span></>
                    : newIssueLocation && <> Coordinates: {newIssueLocation.lat.toFixed(4)}, {newIssueLocation.lng.toFixed(4)}</>
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    📝 Issue Description
                  </Label>
                  <Input 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Describe the issue in detail..." 
                    className="bg-white/80 backdrop-blur-sm border-slate-300/60 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    🏷️ Category
                  </Label>
                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger id="category" className="bg-white/80 backdrop-blur-sm border-slate-300/60 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200">
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="z-[2000] bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl rounded-lg">
                      <SelectItem value="development" className="hover:bg-blue-50">🏗️ Development</SelectItem>
                      <SelectItem value="environment" className="hover:bg-green-50">🌱 Environment</SelectItem>
                      <SelectItem value="social" className="hover:bg-purple-50">🤝 Social Cohesion</SelectItem>
                      <SelectItem value="sme" className="hover:bg-orange-50">💼 SME Support</SelectItem>
                      <SelectItem value="safety" className="hover:bg-red-50">🛡️ Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    📸 Photo Evidence (Optional)
                  </Label>
                  <div className="flex items-center gap-3">
                    <Label 
                      htmlFor="proof" 
                      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 border border-slate-300 text-slate-700 h-10 px-4 py-2 transition-all duration-200 hover:shadow-md"
                    >
                      <Camera className="w-4 h-4" />
                      Choose Photo
                    </Label>
                    <Input 
                      id="proof" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        setProof(file);
                        setProofFileName(file ? file.name : 'No file chosen');
                      }} 
                    />
                    <span className="text-sm text-slate-500 font-medium">{proofFileName || 'No file selected'}</span>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-3 pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setNewIssueLocation(null)}
                  className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitNewIssue} 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 px-6"
                >
                  Submit Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-50/80 to-blue-50/40 rounded-xl border border-slate-200/60">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            🎯 Issue Status Legend
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-3 p-2 bg-white/60 rounded-lg border border-red-200/60">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-sm"></div>
              <span className="font-medium text-slate-700">Active Issues</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white/60 rounded-lg border border-yellow-200/60">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-sm"></div>
              <span className="font-medium text-slate-700">In Progress</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white/60 rounded-lg border border-green-200/60">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm"></div>
              <span className="font-medium text-slate-700">Resolved</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white/60 rounded-lg border border-blue-200/60">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"></div>
              <span className="font-medium text-slate-700">Monitoring</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
);
}
