import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleDollarSign,
  Film,
  Video,
  Rocket,
  ShieldCheck,
  Trophy,
  PlayCircle,
  ArrowRight,
  Globe,
  Wallet,
  Image as ImageIcon,
  Calculator,
  ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

/** =========================
 * CONFIG — тексты/логика
 * ========================= */
const CONFIG = {
  brand: "Spread",
  tokenTicker: "SPREAD",
  tagline: "Turn trading fees into creator rewards.",
  subtitle:
    "We return 100% of $SPREAD fees from Pump.Fun back to creators who post short clips with our logo.",
  links: {
    pump: "https://pump.fun/",
    x: "https://x.com/Spread_sol",
  },
  program: {
    startDateISO: "2023-10-21",
    minViews: 10_000,
    allowedPlatforms: ["TikTok", "Instagram Reels", "YouTube Shorts", "Twitter"],
    disallowedPlatforms: [] as string[],
    payoutNetworks: ["SOL", "$SPREAD"],
  },
  tiers: [
    { min: 10_000, max: 49_999, payoutUSD: [2, 10] },
    { min: 50_000, max: 99_999, payoutUSD: [10, 20] },
    { min: 100_000, max: 399_999, payoutUSD: [20, 80] },
    { min: 500_000, max: 999_999, payoutUSD: [100, 180] },
    { min: 1_000_000, max: null, payoutUSD: [200, 200] },
  ],
};

function formatRange(min?: number | null, max?: number | null) {
  const fmt = (n: number) => n.toLocaleString();
  if (min && max) return `${fmt(min)}–${fmt(max)}`;
  if (min && max === null) return `${fmt(min)}+`;
  return "—";
}

export default function SpreadSite() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [calcViews, setCalcViews] = useState(10000);

  const [form, setForm] = useState({
    handle: "",
    email: "",
    platform: "TikTok",
    videoUrl: "",
    views: "",
    walletNetwork: CONFIG.program.payoutNetworks[0],
    walletAddress: "",
    proofUrl: "",
    notes: "",
    agreeRules: false,
  });

  const eligibleTier = useMemo(() => {
    const v = Number(form.views);
    if (!v || Number.isNaN(v)) return null;
    return CONFIG.tiers.find((t) => v >= t.min && (t.max === null || v <= t.max));
  }, [form.views]);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target as any;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900)); // здесь подключишь свой webhook позже
    setSubmitting(false);
    setSubmitted(true);
  }

  const calcTier = useMemo(() => {
    const v = Number(calcViews);
    return CONFIG.tiers.find((t) => v >= t.min && (t.max === null || v <= t.max));
  }, [calcViews]);

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* BACKDROP: тёмный градиент + лёгкий узор + шум */}
      <div className="absolute inset-0 -z-50 bg-gradient-to-br from-[#0B1020] via-[#0F172A] to-[#111827]" />
      <div className="absolute inset-0 -z-40 bg-mesh opacity-25 pointer-events-none" />
      <div className="absolute inset-0 -z-30 bg-noise opacity-[.08] pointer-events-none" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-3 flex items-center gap-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-amber-400 via-fuchsia-500 to-sky-500 grid place-items-center font-bold">
              ✦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base md:text-lg tracking-tight">
                  {CONFIG.brand}
                </span>
                <Badge className="bg-white/10 hover:bg-white/10 text-white border-white/10">
                  Creator Rewards
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">
                Ticker: {CONFIG.tokenTicker}
              </p>
            </div>
          </a>

          <nav className="ml-auto hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a className="hover:text-white" href="#how">How it works</a>
            <a className="hover:text-white" href="#tiers">Tiers</a>
            <a className="hover:text-white" href="#rules">Rules</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
            <a className="hover:text-white" href="#submit">Submit</a>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="secondary" className="bg-white/10 border-white/10 hover:bg-white/20">
              <a href={CONFIG.links.pump} target="_blank" rel="noreferrer">Pump.Fun</a>
            </Button>
            <Button asChild className="bg-gradient-to-r from-amber-500 via-fuchsia-500 to-sky-500 hover:opacity-90">
              <a href="#submit">Submit clip</a>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO — кардинально новая композиция */}
      <section id="top" className="relative">
        {/* светящийся эллипс */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] max-w-[1100px] max-h-[560px] rounded-[50%] bg-gradient-to-tr from-fuchsia-500/20 via-amber-400/10 to-sky-500/20 blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-5 py-14 md:py-20 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-black leading-tight tracking-tight"
            >
              {CONFIG.tagline}
            </motion.h1>

            <p className="mt-4 text-slate-300 text-lg md:text-xl max-w-2xl">
              {CONFIG.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-400/30">
                <CircleDollarSign className="mr-2 size-4" />
                100% fees → creators
              </Badge>
              <Badge className="bg-sky-500/15 text-sky-200 border border-sky-400/30">
                <PlayCircle className="mr-2 size-4" />
                Min {CONFIG.program.minViews.toLocaleString()} views
              </Badge>
              <Badge className="bg-amber-500/15 text-amber-200 border border-amber-400/30">
                <Wallet className="mr-2 size-4" />
                Payouts: {CONFIG.program.payoutNetworks.join(", ")}
              </Badge>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 via-fuchsia-500 to-sky-500 hover:opacity-90">
                <a href="#submit">Submit your video <ArrowRight className="ml-2 size-4" /></a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 border-white/10">
                <a href={CONFIG.links.x} target="_blank" rel="noreferrer">X (Twitter)</a>
              </Button>
            </div>
          </div>

          {/* 3D-карточка с “телефоном” и подсветкой */}
          <div className="md:col-span-5">
            <div className="relative">
              
              <div className="rounded-[2rem] border border-white/0 bg-white/0 p-0 backdrop-blur-xl shadow-2xl">
              
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY / HOW — новый блок плиткой 2x3 */}
      <section id="how" className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
          <p className="mt-2 text-slate-300">
            Create a short, keep Spread as the main character, add our logo, hit the views — and get paid.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Film, title: "Make the clip", text: "Keep it native and fun. Spread should be the main character." },
            { icon: ImageIcon, title: "Add our logo", text: "Overlay the official Spread title/logo. No other banners or ads." },
            { icon: Rocket, title: "Post it", text: `Post to ${CONFIG.program.allowedPlatforms.join(", ")}.` },
            { icon: PlayCircle, title: "Hit the views", text: `Reach ${CONFIG.program.minViews.toLocaleString()}+ on a single post.` },
            { icon: ClipboardList, title: "Record analytics", text: "One clean scroll (top→bottom), no cuts. Paste link to the recording." },
            { icon: Wallet, title: "Submit & get paid", text: `Payouts in ${CONFIG.program.payoutNetworks.join(", ")} after approval.` },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-white/10 grid place-items-center">
                  {React.createElement(s.icon, { className: "size-5" })}
                </div>
                <h3 className="font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-300/90">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIERS — неоновые карточки + калькулятор сбоку (мозаика) */}
      <section id="tiers" className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <div className="text-left mb-6">
              <h2 className="text-3xl md:text-4xl font-bold">Payout tiers</h2>
              <p className="mt-2 text-slate-300">
                USD equivalent at approval time. One payout per post.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {CONFIG.tiers.map((t, idx) => (
                <Card key={t.min} className="bg-white/5 border-white/10 overflow-hidden">
                  <div
                    className={[
                      "h-1",
                      idx % 3 === 0
                        ? "bg-gradient-to-r from-amber-400 via-fuchsia-500 to-sky-500"
                        : idx % 3 === 1
                        ? "bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                        : "bg-gradient-to-r from-rose-400 via-violet-500 to-indigo-500",
                    ].join(" ")}
                  />
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{formatRange(t.min, t.max)} views</span>
                      <Trophy className="size-5 text-amber-300" />
                    </CardTitle>
                    <CardDescription>Payout (USD)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold">
                      {t.payoutUSD[0] === t.payoutUSD[1]
                        ? `$${t.payoutUSD[0]}`
                        : `$${t.payoutUSD[0]}–$${t.payoutUSD[1]}`}
                    </div>
                    <p className="mt-2 text-sm text-slate-300/90">
                      Paid in {CONFIG.program.payoutNetworks.join(", ")}.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* калькулятор сбоку */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="size-5" /> Payout calculator
              </CardTitle>
              <CardDescription>Estimate for a single post</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div>
                  <Label htmlFor="calcViews">Views</Label>
                  <Input
                    id="calcViews"
                    type="number"
                    min={0}
                    value={calcViews}
                    onChange={(e) => setCalcViews(Number(e.target.value))}
                    className="bg-black/30 border-white/10"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Minimum {CONFIG.program.minViews.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                  <div className="text-xs text-slate-400">Estimated payout</div>
                  <div className="text-2xl font-extrabold mt-1">
                    {calcTier
                      ? calcTier.payoutUSD[0] === calcTier.payoutUSD[1]
                        ? `$${calcTier.payoutUSD[0]}`
                        : `$${calcTier.payoutUSD[0]}–$${calcTier.payoutUSD[1]}`
                      : "—"}
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Final amount depends on quality and rule compliance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-xs text-slate-400 text-center">
          Program started on {new Date(CONFIG.program.startDateISO).toLocaleDateString()} — 100% of collected fees are redistributed to creators.
        </div>
      </section>

      {/* RULES — стеклянные карточки 2x */}
      <section id="rules" className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Rules</h2>
          <p className="mt-2 text-slate-300">Short, clear, anti-fraud.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-5" /> Eligibility & content
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-200 space-y-2">
              <ul className="list-disc pl-5 space-y-2">
                <li>Spread must be the <strong>main character</strong> (no deepfakes).</li>
                <li>Overlay the official logo/title. No other ads or banners.</li>
                <li>Minimum {CONFIG.program.minViews.toLocaleString()} views on a <strong>single</strong> post.</li>
                <li>Allowed: {CONFIG.program.allowedPlatforms.join(", ")}.</li>
                <li>No politics, hate, drugs, gambling or illegal content.</li>
                <li>Duets/photo carousels are fine if Spread stays primary.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="size-5" /> Submissions & verification
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-200 space-y-2">
              <ul className="list-disc pl-5 space-y-2">
                <li>Screen-record analytics (top → bottom) in one clean take.</li>
                <li>Give direct links to the post and to the recording.</li>
                <li>We may request extra checks. Never share passwords/seed phrases.</li>
                <li>No bought views/likes/comments. Blocked/removed posts can’t be paid.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ — тёмные табы */}
      <section id="faq" className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
          <p className="mt-2 text-slate-300">Quick answers to common questions.</p>
        </div>

        <Tabs defaultValue="general" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 bg-white/10 rounded-xl p-1 gap-1 border border-white/10">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="text-slate-200 text-sm space-y-3 mt-4">
            <Q q="Do views add up across platforms?" a="No. We count views on a single post. Re-uploads on other platforms can be submitted separately." />
            <Q q="How long will the program run?" a="Indefinitely. We have no end date planned." />
            <Q q="Can I use old stream moments?" a="Yes. Any Spread-centered clip works if it meets the rules." />
            <Q q="Can I reshare someone else’s clip?" a="Yes. Reposts are eligible if they meet the rules and you can verify analytics for your post." />
          </TabsContent>

          <TabsContent value="payment" className="text-slate-200 text-sm space-y-3 mt-4">
            <Q q="Where do you pay?" a={`${CONFIG.program.payoutNetworks.join(", ")}. One payout per post.`} />
            <Q q="When do you pay?" a="Typically within 2–5 days after approval." />
            <Q q="What if my post has 9,500 views?" a={`Minimum is ${CONFIG.program.minViews.toLocaleString()} — we don’t round up.`} />
            <Q q="If I get 1M now and 10M later, do I get a top-up?" a="No. Choose when to submit; we pay once per post." />
          </TabsContent>

          <TabsContent value="content" className="text-slate-200 text-sm space-y-3 mt-4">
            <Q q="Are duets allowed?" a="Yes, if Spread remains the main character." />
            <Q q="Can I include other ads?" a="No. Don’t add competing banners or promos." />
            <Q q="Language / region limits?" a="Any language and region are welcome, as long as the link is viewable for moderation." />
            <Q q="What about photo posts?" a="Photo carousels are OK on platforms that support them; regular text posts are not paid." />
          </TabsContent>
        </Tabs>
      </section>

      {/* SUBMIT — новая композиция формы: две колонки + сайд-панель чеклиста */}
      <section id="submit" className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Submit your video</h2>
          <p className="mt-2 text-slate-300">Share the essentials — we’ll review and DM you on Telegram.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ФОРМА */}
          <Card className="lg:col-span-2 bg-white/5 border-white/10">
            <CardContent className="p-6">
              {!submitted ? (
                <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <select
                      id="platform"
                      name="platform"
                      value={form.platform}
                      onChange={onChange}
                      className="w-full h-10 rounded-md bg-black/30 border border-white/10 px-3"
                    >
                      {CONFIG.program.allowedPlatforms.map((p) => (
                        <option key={p} value={p} className="bg-slate-900">{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="videoUrl">Post URL</Label>
                    <Input id="videoUrl" name="videoUrl" type="url" placeholder="https://..." value={form.videoUrl} onChange={onChange} required className="bg-black/30 border-white/10" />
                  </div>

                  <div>
                    <Label htmlFor="views">Views on this post</Label>
                    <Input id="views" name="views" type="number" placeholder="10000" value={form.views} onChange={onChange} required className="bg-black/30 border-white/10" />
                    <p className="text-xs text-slate-400 mt-1">
                      {eligibleTier ? (
                        <span>
                          Eligible tier: {formatRange(eligibleTier.min, eligibleTier.max)} → ${eligibleTier.payoutUSD[0]}
                          {eligibleTier.payoutUSD[0] !== eligibleTier.payoutUSD[1] ? `–$${eligibleTier.payoutUSD[1]}` : ""}*
                        </span>
                      ) : (
                        <span>Minimum {CONFIG.program.minViews.toLocaleString()} views.</span>
                      )}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="proofUrl">Analytics screen-record link</Label>
                    <Input id="proofUrl" name="proofUrl" type="url" placeholder="https://drive.google.com/..." value={form.proofUrl} onChange={onChange} required className="bg-black/30 border-white/10" />
                  </div>

                  <div>
                    <Label htmlFor="walletNetwork">Payout network</Label>
                    <select
                      id="walletNetwork"
                      name="walletNetwork"
                      value={form.walletNetwork}
                      onChange={onChange}
                      className="w-full h-10 rounded-md bg-black/30 border border-white/10 px-3"
                    >
                      {CONFIG.program.payoutNetworks.map((p) => (
                        <option key={p} value={p} className="bg-slate-900">{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="walletAddress">Wallet address</Label>
                    <Input id="walletAddress" name="walletAddress" placeholder="Wallet for payouts" value={form.walletAddress} onChange={onChange} required className="bg-black/30 border-white/10" />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="handle">Telegram handle</Label>
                    <Input id="handle" name="handle" placeholder="@yourname" value={form.handle} onChange={onChange} required className="bg-black/30 border-white/10" />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} className="bg-black/30 border-white/10" />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea id="notes" name="notes" placeholder="Anything else we should know?" value={form.notes} onChange={onChange} className="bg-black/30 border-white/10" />
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3 pt-2">
                    <Switch
                      id="agreeRules"
                      checked={form.agreeRules}
                      onCheckedChange={(v) => setForm((f) => ({ ...f, agreeRules: v }))}
                    />
                    <Label htmlFor="agreeRules" className="text-sm text-slate-200">
                      I agree with the Rules and confirm the clip shows the {CONFIG.brand} logo/title with no competing ads.
                    </Label>
                  </div>

                  <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-slate-400">
                      * Final amount depends on quality and compliance.
                    </p>
                    <Button type="submit" disabled={submitting || !form.agreeRules} className="bg-gradient-to-r from-amber-500 via-fuchsia-500 to-sky-500 hover:opacity-90">
                      {submitting ? "Submitting…" : "Submit for review"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle2 className="size-12 mx-auto text-emerald-400" />
                  <h3 className="mt-4 text-2xl font-bold">Submission received</h3>
                  <p className="mt-2 text-slate-200">
                    Thanks! We’ll review and contact you via Telegram <span className="font-mono">{form.handle || "(handle)"}</span>.
                  </p>
                  <div className="mt-6">
                    <Button asChild className="bg-white/10 hover:bg-white/20 border-white/10">
                      <a href="#top">Back to top</a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Сайд-панель: чеклист и ссылки */}
          <div className="space-y-4">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="size-5" /> Quick checklist
                </CardTitle>
                <CardDescription>Before you submit</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-200 space-y-2">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Spread is the main character.</li>
                  <li>Official logo/title is added.</li>
                  <li>{CONFIG.program.minViews.toLocaleString()}+ views on one post.</li>
                  <li>One clean analytics screen-record (top→bottom).</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Links</CardTitle>
                <CardDescription>Official resources</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="flex items-center justify-between">
                  <span>Pump.Fun</span>
                  <a className="text-fuchsia-300 hover:underline" href={CONFIG.links.pump} target="_blank" rel="noreferrer">Open</a>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>X (Twitter)</span>
                  <a className="text-fuchsia-300 hover:underline" href={CONFIG.links.x} target="_blank" rel="noreferrer">Open</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-10 grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <Globe className="size-4" /> {CONFIG.brand}
            </div>
            <p className="mt-2 text-slate-300 max-w-sm">
              Built for creators. 100% of fees → rewards.
            </p>
          </div>
          <div>
            <div className="font-semibold">Links</div>
            <ul className="mt-2 space-y-2 text-slate-200">
              <li><a className="hover:underline text-fuchsia-300" href={CONFIG.links.pump} target="_blank" rel="noreferrer">Pump.Fun</a></li>
              <li><a className="hover:underline text-fuchsia-300" href={CONFIG.links.x} target="_blank" rel="noreferrer">X (Twitter)</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-8">
          © {new Date().getFullYear()} {CONFIG.brand}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Q({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="font-semibold">{q}</div>
      <div className="text-slate-200 mt-1">{a}</div>
    </div>
  );
}
