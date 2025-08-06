"use client";

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map as MapIcon } from "lucide-react";
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
      <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Community Issues Map</CardTitle>
        <MapIcon className="w-5 h-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full rounded-lg overflow-hidden relative">
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
            <DialogContent className="z-[1000] bg-white text-gray-900">
              <DialogHeader>
                <DialogTitle>Report a New Issue</DialogTitle>
                <DialogDescription>
                  {placeName
                    ? <>Location: <span className="font-medium text-blue-700">{placeName}</span></>
                    : newIssueLocation && <>Issue at Lat: {newIssueLocation.lat.toFixed(4)}, Lng: {newIssueLocation.lng.toFixed(4)}</>
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent position="popper" className="z-[2000] bg-white">
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="social">Social Cohesion</SelectItem>
                      <SelectItem value="sme">SME Support</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Attach Photo (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="proof" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                      Choose File
                    </Label>
                    <Input id="proof" type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      setProof(file);
                      setProofFileName(file ? file.name : 'No file chosen');
                    }} />
                    <span className="text-sm text-gray-500">{proofFileName || 'No file chosen'}</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewIssueLocation(null)}>Cancel</Button>
                <Button onClick={handleSubmitNewIssue} className="bg-blue-600 hover:bg-blue-700 text-white">Submit Issue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Active Issues</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Resolved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Monitoring</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
);
}
