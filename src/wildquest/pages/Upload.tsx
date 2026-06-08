import React, { useState, useRef } from 'react';
import { useWQ } from '../store';
import { supabase } from '@/lib/supabase';
import { Icons } from '../icons';
import { Btn, ConfidenceBadge, Badge } from '../ui/common';
import { CHALLENGES } from '../data';

type Stage = 'upload' | 'identifying' | 'result';

const Upload: React.FC = () => {
  const { user, navigate, toast, addObservation } = useWQ();
  const [stage, setStage] = useState<Stage>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [drag, setDrag] = useState(false);
  const [meta, setMeta] = useState({ location: '', date: new Date().toISOString().slice(0, 10), notes: '' });
  const [generalize, setGeneralize] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [challengeId, setChallengeId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/')) { toast('Please choose an image file', 'error'); return; }
    setFile(f); setPreview(URL.createObjectURL(f));
  };

  const identify = async () => {
    if (!file) { toast('Choose a photo first', 'error'); return; }
    setStage('identifying');
    try {
      const path = `${Date.now()}_${file.name.replace(/[^a-z0-9.]/gi, '_')}`;
      const { error: upErr } = await supabase.storage.from('wildquest-photos').upload(path, file, { upsert: true });
      let url = preview;
      if (!upErr) {
        const { data } = supabase.storage.from('wildquest-photos').getPublicUrl(path);
        url = data.publicUrl;
      }
      setUploadedUrl(url);
      const { data, error } = await supabase.functions.invoke('ai-identify', { body: { imageUrl: url, seed: path } });
      if (error) throw error;
      setResult(data); setStage('result');
    } catch (e) {
      toast('Identification failed — try again', 'error'); setStage('upload');
    }
  };

  const acceptId = async (alt?: any) => {
    const r = alt || result;
    await addObservation({
      image_url: uploadedUrl, common_name: alt ? alt.common : r.commonName, scientific_name: alt ? alt.sci : r.scientificName,
      category: alt ? alt.cat : r.category, confidence: alt ? alt.confidence : r.confidence,
      description: r.description, habitat: r.habitat,
      location: generalize ? generalizeLoc(meta.location) : meta.location, notes: meta.notes,
      challenge_id: challengeId || null, shared: false,
    });
    setAccepted(true);
    toast('Observation saved to your collection!');
  };

  const generalizeLoc = (l: string) => l ? l.split(',')[0] + ' (generalized)' : 'Location hidden';

  const shareToFeed = async () => {
    await addObservation({
      image_url: uploadedUrl, common_name: result.commonName, scientific_name: result.scientificName,
      category: result.category, confidence: result.confidence, description: result.description, habitat: result.habitat,
      location: generalize ? generalizeLoc(meta.location) : meta.location, notes: meta.notes,
      challenge_id: challengeId || null, shared: true,
    });
    toast('Shared to community feed!'); navigate('feed');
  };

  // ---------- UPLOAD STAGE ----------
  if (stage === 'upload') return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-black text-slate-900">Identify a species</h1>
      <p className="text-slate-500 mt-1">Upload a wildlife photo and let our AI name it for you.</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => inputRef.current?.click()}
        className={`mt-6 rounded-3xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${drag ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-white hover:border-emerald-400'}`}>
        {preview ? (
          <div className="relative">
            <img src={preview} alt="preview" className="max-h-72 mx-auto rounded-2xl object-contain" />
            <button onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(''); }} className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5"><Icons.X className="w-4 h-4" /></button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 grid place-items-center text-emerald-600 mb-4"><Icons.ImagePlus className="w-8 h-8" /></div>
            <p className="font-semibold text-slate-700">Drag & drop your photo here</p>
            <p className="text-sm text-slate-400 mt-1">or click to browse · JPG, PNG up to 10MB</p>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div><label className="text-sm font-medium text-slate-700">Location (optional)</label>
          <input value={meta.location} onChange={(e) => setMeta({ ...meta, location: e.target.value })} placeholder="e.g. Cedar Pond, Portland" className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-400 text-sm" /></div>
        <div><label className="text-sm font-medium text-slate-700">Date</label>
          <input type="date" value={meta.date} onChange={(e) => setMeta({ ...meta, date: e.target.value })} className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-400 text-sm" /></div>
      </div>
      <div className="mt-4"><label className="text-sm font-medium text-slate-700">Notes (optional)</label>
        <textarea value={meta.notes} onChange={(e) => setMeta({ ...meta, notes: e.target.value })} rows={2} placeholder="Behavior, conditions, anything notable..." className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-400 text-sm" /></div>

      <label className="flex items-start gap-3 mt-4 p-3 bg-sky-50 rounded-xl border border-sky-100 cursor-pointer">
        <input type="checkbox" checked={generalize} onChange={(e) => setGeneralize(e.target.checked)} className="mt-1 accent-emerald-600" />
        <span className="text-sm text-sky-900"><strong>Protect location</strong> — generalize exact coordinates to keep sensitive species safe from poaching and disturbance.</span>
      </label>

      <Btn onClick={identify} disabled={!file} className="w-full mt-6 !py-3.5 !text-base"><Icons.Sparkles className="w-5 h-5" /> Identify with AI</Btn>

      <div className="mt-5 flex items-start gap-2 text-xs text-slate-400">
        <Icons.Leaf className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
        <span>Reminder: never bait, chase, or disturb wildlife to get a photo. Observe from a respectful distance.</span>
      </div>
    </div>
  );

  // ---------- IDENTIFYING STAGE ----------
  if (stage === 'identifying') return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <div className="relative w-24 h-24 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
        <Icons.Leaf className="w-10 h-10 text-emerald-600 absolute inset-0 m-auto animate-pulse" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mt-6">Analyzing your photo…</h2>
      <p className="text-slate-500 text-sm mt-1">Our self-hosted vision model is identifying the species.</p>
      {preview && <img src={preview} alt="" className="max-h-48 mx-auto rounded-2xl mt-6 opacity-80" />}
    </div>
  );

  // ---------- RESULT STAGE ----------
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <button onClick={() => { setStage('upload'); setResult(null); setAccepted(false); }} className="text-sm text-emerald-600 font-semibold mb-4">← New identification</button>
      <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100">
        <div className="relative">
          <img src={uploadedUrl} alt={result.commonName} className="w-full aspect-[4/3] object-cover" />
          <div className="absolute top-3 right-3"><ConfidenceBadge value={result.confidence} /></div>
          <span className="absolute top-3 left-3"><Badge color="bg-white/90 text-slate-700">{result.category}</Badge></span>

        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 flex-wrap">
            <Icons.CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
              Top match · {result.provider === 'self-hosted' ? `self-hosted${result.model ? ` (${result.model})` : ''}` : 'demo model'}
            </span>
            {result.fallback && (
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">model offline — demo result</span>
            )}
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{result.commonName}</h1>
          <p className="italic text-slate-400">{result.scientificName}</p>

          <p className="text-sm text-slate-600 mt-3">{result.description}</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="bg-emerald-50 rounded-xl p-3"><p className="text-xs font-semibold text-emerald-700 flex items-center gap-1"><Icons.MapPin className="w-3.5 h-3.5" /> Habitat</p><p className="text-sm text-slate-600 mt-1">{result.habitat}</p></div>
            <div className="bg-amber-50 rounded-xl p-3"><p className="text-xs font-semibold text-amber-700 flex items-center gap-1"><Icons.Shield className="w-3.5 h-3.5" /> Safety note</p><p className="text-sm text-slate-600 mt-1">{result.safetyNote}</p></div>
          </div>

          {!accepted ? (
            <div className="flex flex-wrap gap-3 mt-5">
              <Btn onClick={() => acceptId()} className="flex-1 min-w-[140px]"><Icons.CheckCircle2 className="w-5 h-5" /> Accept ID</Btn>
              <Btn onClick={() => toast('Pick a better match below', 'info')} variant="outline" className="flex-1 min-w-[140px]">Not correct?</Btn>
            </div>
          ) : (
            <div className="mt-5 p-4 bg-emerald-50 rounded-2xl">
              <p className="text-sm font-semibold text-emerald-800 flex items-center gap-2"><Icons.CheckCircle2 className="w-4 h-4" /> Saved to your collection!</p>
              <div className="mt-3">
                <label className="text-xs font-medium text-slate-600">Submit to a challenge</label>
                <select value={challengeId} onChange={(e) => setChallengeId(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-sm">
                  <option value="">— None —</option>
                  {CHALLENGES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                <Btn onClick={shareToFeed} variant="amber" className="flex-1"><Icons.Share2 className="w-4 h-4" /> Share to feed</Btn>
                <Btn onClick={() => navigate('dashboard')} variant="outline" className="flex-1">Done</Btn>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alternatives */}
      {!accepted && result.alternatives?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-slate-800 mb-3">Alternative matches</h3>
          <div className="space-y-2">
            {result.alternatives.map((a: any, i: number) => (
              <button key={i} onClick={() => acceptId(a)} className="w-full flex items-center justify-between bg-white rounded-xl border border-slate-100 p-3 hover:border-emerald-300 hover:shadow-sm transition-all text-left">
                <div><p className="font-semibold text-slate-700">{a.common}</p><p className="text-xs italic text-slate-400">{a.sci}</p></div>
                <ConfidenceBadge value={a.confidence} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Upload;
