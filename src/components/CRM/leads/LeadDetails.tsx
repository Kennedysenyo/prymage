"use client";

import { motion } from "motion/react";
import { useActionState, useEffect, useState, useTransition } from "react";
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  User,
  Briefcase,
  Clock,
  Loader2,
  MessageCircleIcon,
} from "lucide-react";
import {
  CreateNoteFormResponseType,
  LeadDetails as Details,
  History,
  Notes,
  Stage,
} from "@/features/leads/leads.types";
import {
  updateStage,
  validateCreateNoteForm,
} from "@/features/leads/leads.service";
import { addHistoryIcons, capitalizeWord, cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";

interface Props {
  userId: string;
  leadId: string;
  lead: Details;
  notes: Notes;
  history: History;
}

export function LeadDetails({ userId, leadId, lead, notes, history }: Props) {
  const [newNote, setNewNote] = useState("");
  const [selectedStage, setSelectedStage] = useState(lead.stage);

  const stages = ["new", "contacted", "qualified", "won", "lost"];

  const getStageBadge = (stage: string) => {
    const badges = {
      new: "bg-green-100 text-green-700 border-green-200",
      contacted: "bg-purple-100 text-purple-700 border-purple-200",
      qualified: "bg-blue-100 text-blue-700 border-blue-200",
      won: "bg-yellow-100 text-yellow-700 border-yellow-200",
      lost: "bg-red-100 text-red-700 border-red-200",
    };
    return badges[stage as keyof typeof badges] || badges.new;
  };

  const [pending, startTranstion] = useTransition();

  const handleUpdateStage = () => {
    let res: string | null = null;
    if (lead.stage === (selectedStage as Stage)) return;
    startTranstion(async () => {
      res = await updateStage({
        userId,
        leadId,
        assignedTo: lead.assignedTo,
        currentStage: lead.stage,
        newStage: selectedStage as Stage,
      });

      if (res) {
        toast.error(res);
      } else {
        toast.success("Stage updated successfully!");
      }
    });
  };

  const initialState: CreateNoteFormResponseType = {
    success: false,
    errors: {},
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    validateCreateNoteForm.bind(null, { userId, leadId }),
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setNewNote("");
      toast.success("Note Added Successfully!");
    }
  }, [state.success]);

  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage);
    }
  }, [state.errorMessage]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {lead.name}
              </h2>
              <p className="text-lg text-gray-600">{lead.company}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStageBadge(lead.stage)}`}
            >
              {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mail size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{lead.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{lead.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium text-gray-900">{lead.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium text-gray-900">
                    {capitalizeWord(lead.country)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Briefcase size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest</p>
                  <p className="font-medium text-gray-900">
                    {capitalizeWord(lead.interest)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <User size={20} className="text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned Staff</p>
                  <p className="font-medium text-gray-900">
                    {lead.assignedUser ?? "None"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="font-medium text-gray-900">
                    {lead.createdAt.toDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                  <MessageCircleIcon size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Lead Message
                  </p>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Customer Inquiry
                  </h4>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm">
                {/* subtle decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 blur-3xl rounded-full" />

                <p className="relative text-gray-700 leading-7 whitespace-pre-wrap">
                  {lead.message}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Update Stage</h3>

          <div className="space-y-3 mb-6">
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage as Stage)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  selectedStage === stage
                    ? `${getStageBadge(stage)} font-semibold`
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={handleUpdateStage}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all"
          >
            {pending ? (
              <Loader2 size={18} className="animate-spin mx-auto" />
            ) : (
              " Update Stage"
            )}
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Follow-Up Notes
          </h3>

          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 overflow-hidden relative bg-gradient-to-br from-[#5B2CA5] to-[#D4A24C] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  <Image
                    src={note.authorImage ?? "/assets/default-image.png"}
                    alt={note.authorName ?? "Note Author"}
                    width={40}
                    height={40}
                    loading="eager"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">
                        {note.authorName}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {note.createdAt.toDateString()}
                      </p>
                    </div>
                    <p className="text-gray-700">{note.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <form className="space-y-3" action={formAction}>
            <div>
              <textarea
                value={newNote}
                name="note"
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a follow-up note..."
                className="w-full px-4 py-3 text-background bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B2CA5] transition-colors resize-none"
                rows={3}
              />
              {state.errors.note && (
                <p className="text-red-400 text-xs">{state.errors.note}</p>
              )}
            </div>
            <button
              type="submit"
              className={cn(
                "w-full px-4 py-3 bg-gradient-to-r from-[#5B2CA5] to-[#D4A24C] text-white rounded-xl hover:shadow-lg transition-all",
                isPending && "pointer-events-none",
              )}
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin mx-auto" />
              ) : (
                "Add Note"
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Activity Timeline
          </h3>

          <div className="space-y-6">
            {history
              .map((hist) => addHistoryIcons(hist))
              .map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex gap-4 relative"
                >
                  {index < history.length - 1 && (
                    <div className="absolute left-5 top-14 -bottom-6 w-px bg-gray-200" />
                  )}
                  <div
                    className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 ${event.color}`}
                  >
                    <event.icon size={20} />
                  </div>
                  <div className="flex-1 pb-6">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {event.activity}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1 font-semibold">
                      {event.actionBy}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {event.description}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {event.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
