"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import { useFormStatus } from "react-dom";
import { ImagePlus, LoaderCircle, Trash2, X } from "lucide-react";
import { saveEvent, type SaveEventState } from "./actions";
import { eventStatus, istDateInput, istTimeInput, type SiteEvent } from "@/lib/events";

const inputClass =
  "mt-1 w-full rounded-xl border border-[#E8D6B5] bg-white px-4 py-2.5 text-sm text-[#2C1810] focus:border-[#521623] focus:outline-none";
const labelClass = "block text-xs font-semibold text-[#5A4448]";

async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/admin/events/upload", { method: "POST", body });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error || "Upload failed.");
  return data.url;
}

function SaveButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-full bg-[#521623] px-7 py-3 text-sm font-bold text-white hover:bg-[#3B0910] disabled:opacity-60"
    >
      {pending && <LoaderCircle size={16} className="animate-spin" />}
      {editing ? "Save changes" : "Publish event"}
    </button>
  );
}

export function EventForm({ event }: { event?: SiteEvent }) {
  const [state, action] = useActionState<SaveEventState, FormData>(saveEvent, {});
  const [cover, setCover] = useState(event?.image_url ?? "");
  const [gallery, setGallery] = useState<string[]>(event?.gallery ?? []);
  const [uploading, setUploading] = useState<"cover" | "gallery" | null>(null);
  const [uploadError, setUploadError] = useState("");

  const onCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading("cover");
    setUploadError("");
    try {
      setCover(await uploadImage(file));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(null);
    }
  };

  const onGallery = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setUploading("gallery");
    setUploadError("");
    try {
      for (const file of files) {
        const url = await uploadImage(file);
        setGallery((g) => [...g, url]);
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(null);
    }
  };

  return (
    <form action={action} className="space-y-6">
      {event && <input type="hidden" name="id" value={event.id} />}
      <input type="hidden" name="image_url" value={cover} />
      <input type="hidden" name="gallery" value={JSON.stringify(gallery)} />

      {/* Cover image */}
      <section className="rounded-2xl border border-[#E8D6B5] bg-white p-5 shadow-sm">
        <p className={labelClass}>Cover image *</p>
        <p className="mb-3 text-[11px] text-[#7A6165]">Shown on the event card and at the top of the event page. Landscape works best (16:10). JPG, PNG or WebP, up to 8 MB.</p>
        {cover ? (
          <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-[#E8D6B5]">
            <img src={cover} alt="Cover preview" className="aspect-[16/10] w-full object-cover" />
            <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#521623] shadow">
              Change
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={onCover} />
            </label>
          </div>
        ) : (
          <label className="flex aspect-[16/10] w-full max-w-md cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E0B95A] bg-[#FFFAF0] text-sm font-semibold text-[#521623] hover:bg-[#FFF4CF]">
            {uploading === "cover" ? <LoaderCircle className="animate-spin" /> : <ImagePlus />}
            {uploading === "cover" ? "Uploading…" : "Upload cover image"}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={onCover} />
          </label>
        )}
      </section>

      {/* Text */}
      <section className="grid gap-4 rounded-2xl border border-[#E8D6B5] bg-white p-5 shadow-sm sm:grid-cols-2">
        <label className={`${labelClass} sm:col-span-2`}>
          Heading *
          <input name="title" required defaultValue={event?.title} placeholder="e.g. Navvarsh Dhyan Mahotsav" className={inputClass} />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Subheading
          <input name="subtitle" defaultValue={event?.subtitle ?? ""} placeholder="e.g. Special Satsang & Meditation Program" className={inputClass} />
        </label>
        <label className={labelClass}>
          Date *
          <input type="date" name="date" required defaultValue={event ? istDateInput(event.starts_at) : ""} className={inputClass} />
        </label>
        <label className={labelClass}>
          Start time (IST) *
          <input type="time" name="time" required defaultValue={event ? istTimeInput(event.starts_at) : "10:00"} className={inputClass} />
        </label>
        <label className={labelClass}>
          End date <span className="font-normal text-[#7A6165]">(optional, for multi-day events)</span>
          <input type="date" name="end_date" defaultValue={event?.ends_at ? istDateInput(event.ends_at) : ""} className={inputClass} />
        </label>
        <label className={labelClass}>
          End time (IST) <span className="font-normal text-[#7A6165]">(optional)</span>
          <input type="time" name="end_time" defaultValue={event?.ends_at ? istTimeInput(event.ends_at) : ""} className={inputClass} />
        </label>
        <p className="text-[11px] text-[#7A6165] sm:col-span-2">
          The event shows as <strong>Available Now</strong> until it ends (the end time, or the end of the event day) and then switches to <strong>Completed</strong> automatically.
          {event && <> Current status: <strong>{eventStatus(event)}</strong>.</>}
        </p>
        <label className={`${labelClass} sm:col-span-2`}>
          Location
          <input
            name="location"
            defaultValue={event?.location ?? "Siddha Sudarshan Sakshi Dhaam, 9, Avantika, Chiranjeev Vihar, Ghaziabad"}
            className={inputClass}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Description
          <textarea
            name="description"
            rows={8}
            defaultValue={event?.description}
            placeholder="What happens at the event, who it is for, what to bring… Line breaks are kept."
            className={inputClass}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Registration link <span className="font-normal text-[#7A6165]">(optional — e.g. a Razorpay page or Google Form; shown as a Register button while the event is upcoming)</span>
          <input name="register_url" type="url" defaultValue={event?.register_url ?? ""} placeholder="https://" className={inputClass} />
        </label>
      </section>

      {/* Gallery */}
      <section className="rounded-2xl border border-[#E8D6B5] bg-white p-5 shadow-sm">
        <p className={labelClass}>Event photos <span className="font-normal text-[#7A6165]">(optional — shown as the recap gallery on the event page)</span></p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.map((url) => (
            <div key={url} className="relative overflow-hidden rounded-xl border border-[#E8D6B5]">
              <img src={url} alt="" className="aspect-square w-full object-cover" />
              <button
                type="button"
                onClick={() => setGallery((g) => g.filter((u) => u !== url))}
                aria-label="Remove photo"
                className="absolute right-1.5 top-1.5 rounded-full bg-white/95 p-1 text-red-700 shadow"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[#E0B95A] bg-[#FFFAF0] text-xs font-semibold text-[#521623] hover:bg-[#FFF4CF]">
            {uploading === "gallery" ? <LoaderCircle className="animate-spin" size={20} /> : <ImagePlus size={20} />}
            {uploading === "gallery" ? "Uploading…" : "Add photos"}
            <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={onGallery} />
          </label>
        </div>
      </section>

      <label className="flex items-center gap-2 text-sm font-semibold text-[#2C1810]">
        <input type="checkbox" name="published" defaultChecked={event?.published ?? true} className="h-4 w-4 accent-[#521623]" />
        Show on the website
      </label>

      {(uploadError || state.error) && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
          {uploadError || state.error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <SaveButton editing={Boolean(event)} />
        {uploading && <span className="text-xs text-[#7A6165]">Wait for the upload to finish before saving.</span>}
      </div>
    </form>
  );
}

export function DeleteEventButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm("Delete this event? This cannot be undone.")) e.preventDefault();
      }}
      className="flex items-center gap-1.5 rounded-full border border-red-300 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60"
    >
      <Trash2 size={13} /> {pending ? "Deleting…" : "Delete event"}
    </button>
  );
}
