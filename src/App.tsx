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
  ClipboardList,
  Image as ImageIcon,
  Calculator,
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

// =========================
// CONFIG — твои тексты/логика без изменений
// =========================
const CONFIG = {
  brand: "AllBags",
  tokenTicker: "BAGS",
  tagline: "Turn trading fees into creator rewards.",
  subtitle:
    "We return 100% of $BAGS fees from Pump.Fun back to creators who post short clips with our logo.",
  links: {
    pump: "https://pump.fun/",
    x: "https://x.com/AllBags_sol",
  },
  program: {
    startDateISO: "2023-10-21",
    minViews: 10_000,
    allowedPlatforms: ["TikTok", "Instagram Reels", "YouTube Shorts", "Twitter"],
    disallowedPlatforms: [] as string[],
    payoutNetworks: ["SOL", "$BAGS"],
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

export default function AllBagsSite() {
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
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  const calcTier = useMemo(() => {
    const v = Number(calcViews);
    return CONFIG.tiers.find((t) => v >= t.min && (t.max === null || v <= t.max));
  }, [calcViews]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight">{CONFIG.brand}</span>
                <Badge className="bg-slate-100 text-slate-700 border border-slate-200">
                  Creator Rewards
                </Badge>
              </div>
              <p className="text-xs text-slate-500">Ticker: {CONFIG.tokenTicker}</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#flywheel" className="hover:text-slate-900">Flywheel</a>
            <a href="#tiers" className="hover:text-slate-900">Payout tiers</a>
            <a href="#rules" className="hover:text-slate-900">Rules</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
            <a href="#submit" className="hover:text-slate-900">Submit</a>
          </nav>
        </div>
      </header>

      {/* HERO (светлый градиент + мокап) */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_-10%,#fde68a_0%,#fff_60%)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              {CONFIG.tagline}
            </motion.h1>
            <p className="mt-4 text-slate-600 text-lg md:text-xl max-w-2xl">
              {CONFIG.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
                <CircleDollarSign className="mr-2 size-4" /> 100% fees → creators
              </Badge>
              <Badge className="bg-sky-100 text-sky-700 border border-sky-200">
                <PlayCircle className="mr-2 size-4" /> Min {CONFIG.program.minViews.toLocaleString()} views
              </Badge>
              <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">
                <Wallet className="mr-2 size-4" /> Payouts: {CONFIG.program.payoutNetworks.join(", ")}
              </Badge>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#submit">
                  Submit your video <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 -z-10 blur-3xl opacity-70 bg-gradient-to-tr from-amber-200 via-pink-200 to-sky-200 rounded-[3rem]" />
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
                <div className="mx-auto w-full aspect-[9/19] max-w-[320px] rounded-[2.2rem] border border-slate-200 bg-slate-50 relative overflow-hidden">
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div className="text-5xl font-black tracking-tight">BAGS</div>
                    <div className="mt-2 text-xs text-slate-500">stream preview</div>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black/10 rounded-b-2xl" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-600">
                  <div className="rounded-xl bg-slate-100 border border-slate-200 p-3 text-center">Add logo</div>
                  <div className="rounded-xl bg-slate-100 border border-slate-200 p-3 text-center">Post</div>
                  <div className="rounded-xl bg-slate-100 border border-slate-200 p-3 text-center">Get paid</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLYWHEEL */}
      <section id="flywheel" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">The flywheel</h2>
          <p className="mt-2 text-slate-600">
            More creators → more views → more fees → bigger rewards → more clips → more streams.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Film, title: "More creators" },
            { icon: Video, title: "More clips" },
            { icon: PlayCircle, title: "More views" },
            { icon: CircleDollarSign, title: "More fees" },
            { icon: Trophy, title: "Bigger rewards" },
            { icon: Rocket, title: "More streams" },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              <div className="mx-auto size-10 rounded-xl bg-slate-100 grid place-items-center">
                {React.createElement(s.icon, { className: "size-5" })}
              </div>
              <div className="mt-2 font-semibold">{s.title}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center text-xs text-slate-500">It’s a loop. Everyone wins.</div>
      </section>

      {/* PAYOUT TIERS */}
      <section id="tiers" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Payout tiers</h2>
          <p className="mt-2 text-slate-600">
            Rewards may be adjusted in edge cases (fraudulent traffic, restricted content, etc.).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {CONFIG.tiers.map((t) => (
            <Card key={t.min} className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{formatRange(t.min, t.max)} views</span>
                  <Trophy className="size-5 text-amber-500" />
                </CardTitle>
                <CardDescription>Payout range (USD equivalent)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">
                  {t.payoutUSD[0] === t.payoutUSD[1]
                    ? `$${t.payoutUSD[0]}`
                    : `$${t.payoutUSD[0]}–$${t.payoutUSD[1]}`}
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Paid in {CONFIG.program.payoutNetworks.join(", ")} at approval-time rates.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* калькулятор */}
        <div className="mt-10 max-w-3xl mx-auto">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="size-5" /> Payout calculator
              </CardTitle>
              <CardDescription>Estimate your reward based on views on a single post</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <Label htmlFor="calcViews">Views</Label>
                  <Input
                    id="calcViews"
                    type="number"
                    min={0}
                    value={calcViews}
                    onChange={(e) => setCalcViews(Number(e.target.value))}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Minimum {CONFIG.program.minViews.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                  <div className="text-xs text-slate-500">Estimated payout</div>
                  <div className="text-2xl font-extrabold mt-1">
                    {calcTier
                      ? (calcTier.payoutUSD[0] === calcTier.payoutUSD[1]
                          ? `$${calcTier.payoutUSD[0]}`
                          : `$${calcTier.payoutUSD[0]}–$${calcTier.payoutUSD[1]}`)
                      : "—"}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Final amount depends on quality and rule compliance. One payout per post.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-xs text-slate-500 text-center">
          Program started on {new Date(CONFIG.program.startDateISO).toLocaleDateString()} — 100% of collected fees are redistributed to creators. One payout per post; resubmits on other platforms count separately.
        </div>
      </section>

      {/* RULES */}
      <section id="rules" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Rules</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-5" /> Eligibility & content
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <ul className="list-disc pl-5 space-y-2">
                <li>BAGS must be the <strong>main character</strong> of the clip (no deepfakes).</li>
                <li>Overlay the official logo/title. No competing banners or paid promos.</li>
                <li>
                  Minimum {CONFIG.program.minViews.toLocaleString()} views on a <strong>single</strong> post — views do not sum across posts.
                </li>
                <li>Allowed platforms: {CONFIG.program.allowedPlatforms.join(", ")}.</li>
                <li>No politics, hate, discrimination, drugs or paraphernalia, casinos/bookmakers, obvious scams, or anything illegal.</li>
                <li>Duets are OK if BAGS remains the main character. Photo carousels are allowed.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="size-5" /> Submissions & verification
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <ul className="list-disc pl-5 space-y-2">
                <li>Record a <strong>clean screen capture</strong> of analytics scrolling top→bottom without cuts. Poor quality captures may be rejected.</li>
                <li>Provide direct links to the post and the recording. Links must be viewable in your region.</li>
                <li>We may request additional checks to verify authenticity. Never share passwords/seed phrases.</li>
                <li>No view/like/comment manipulation or spam-bait. Blocked/removed posts cannot be paid.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
        </div>

        <Tabs defaultValue="general" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 bg-slate-100 rounded-xl p-1 gap-1">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="text-slate-700 text-sm space-y-3">
            <Q q="Do views add up across platforms?" a="No. We count views on a single post. Re-uploads on other platforms can be submitted separately." />
            <Q q="How long will the program run?" a="Indefinitely. We have no end date planned." />
            <Q q="Can I use old stream moments?" a="Yes. Any BAGS-centered clip works if it meets the rules." />
            <Q q="Can I reshare someone else’s clip?" a="Yes. Reposts are eligible if they meet the rules and you can verify analytics for your post." />
          </TabsContent>
          <TabsContent value="payment" className="text-slate-700 text-sm space-y-3">
            <Q q="Where do you pay?" a={`${CONFIG.program.payoutNetworks.join(", ")}. One payout per post.`} />
            <Q q="When do you pay?" a="Typically within 2–5 days after approval." />
            <Q q="What if my post has 9,500 views?" a={`Minimum is ${CONFIG.program.minViews.toLocaleString()} — we don’t round up.`} />
            <Q q="If I get 1M now and 10M later, do I get a top-up?" a="No. Choose when to submit; we pay once per post." />
          </TabsContent>
          <TabsContent value="content" className="text-slate-700 text-sm space-y-3">
            <Q q="Are duets allowed?" a="Yes, if BAGS remains the main character." />
            <Q q="Can I include other ads?" a="No. Don’t add competing banners or promos." />
            <Q q="Language / region limits?" a="Any language and region are welcome, as long as the link is viewable for moderation." />
            <Q q="What about photo posts?" a="Photo carousels are OK on platforms that support them; regular text posts are not paid." />
          </TabsContent>
        </Tabs>
      </section>

      {/* SUBMIT */}
      <section id="submit" className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Submit your video</h2>
        </div>

        <Card className="bg-white border-slate-200">
          <CardContent className="p-6">
            {!submitted ? (
              <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <Label htmlFor="handle">Telegram handle</Label>
                  <Input id="handle" name="handle" placeholder="@yourname" value={form.handle} onChange={onChange} required />
                </div>
                <div className="md:col-span-1">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} />
                </div>

                <div className="md:col-span-1">
                  <Label htmlFor="platform">Platform</Label>
                  <select
                    id="platform"
                    name="platform"
                    value={form.platform}
                    onChange={onChange}
                    className="w-full h-10 rounded-md bg-white border border-slate-300 px-3"
                  >
                    {CONFIG.program.allowedPlatforms.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-1">
                  <Label htmlFor="videoUrl">Post URL</Label>
                  <Input id="videoUrl" name="videoUrl" type="url" placeholder="https://..." value={form.videoUrl} onChange={onChange} required />
                </div>

                <div className="md:col-span-1">
                  <Label htmlFor="views">Views on this post</Label>
                  <Input id="views" name="views" type="number" placeholder="10000" value={form.views} onChange={onChange} required />
                  <p className="text-xs text-slate-500 mt-1">
                    {eligibleTier ? (
                      <span>
                        Eligible tier: {formatRange(eligibleTier.min, eligibleTier.max)} views → ${eligibleTier.payoutUSD[0]}
                        {eligibleTier.payoutUSD[0] !== eligibleTier.payoutUSD[1] ? `–$${eligibleTier.payoutUSD[1]}` : ""}*
                      </span>
                    ) : (
                      <span>Minimum {CONFIG.program.minViews.toLocaleString()} views.</span>
                    )}
                  </p>
                </div>
                <div className="md:col-span-1">
                  <Label htmlFor="proofUrl">Analytics screen-record link</Label>
                  <Input id="proofUrl" name="proofUrl" type="url" placeholder="https://drive.google.com/..." value={form.proofUrl} onChange={onChange} required />
                  <p className="text-xs text-slate-500 mt-1">One continuous scroll, unedited, from top to bottom.</p>
                </div>

                <div className="md:col-span-1">
                  <Label htmlFor="walletNetwork">Payout network</Label>
                  <select
                    id="walletNetwork"
                    name="walletNetwork"
                    value={form.walletNetwork}
                    onChange={onChange}
                    className="w-full h-10 rounded-md bg-white border border-slate-300 px-3"
                  >
                    {CONFIG.program.payoutNetworks.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-1">
                  <Label htmlFor="walletAddress">Wallet address</Label>
                  <Input id="walletAddress" name="walletAddress" placeholder="Wallet for payouts" value={form.walletAddress} onChange={onChange} required />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea id="notes" name="notes" placeholder="Anything else we should know?" value={form.notes} onChange={onChange} />
                </div>

                <div className="md:col-span-2 flex items-center gap-3 pt-2">
                  <Switch
                    id="agreeRules"
                    checked={form.agreeRules}
                    onCheckedChange={(v) => setForm((f) => ({ ...f, agreeRules: v }))}
                  />
                  <Label htmlFor="agreeRules" className="text-sm text-slate-700">
                    I’ve read and agree to the Rules and confirm the clip features the {CONFIG.brand} logo/title with no competing ads.
                  </Label>
                </div>

                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-slate-500">
                    * Final amount within tier depends on traffic quality and rule compliance.
                  </p>
                  <Button type="submit" disabled={submitting || !form.agreeRules}>
                    {submitting ? "Submitting…" : "Submit for review"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10">
                <CheckCircle2 className="size-12 mx-auto text-emerald-500" />
                <h3 className="mt-4 text-2xl font-bold">Submission received</h3>
                <p className="mt-2 text-slate-700">
                  Thanks! We’ll review and contact you via Telegram <span className="font-mono">{form.handle || "(handle)"}</span>.
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <a href="#top">Back to top</a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <Globe className="size-4" /> {CONFIG.brand}
            </div>
            <p className="mt-2 text-slate-600 max-w-sm">
              Built for creators. 100% of fees → rewards.
            </p>
          </div>
          <div>
            <div className="font-semibold">Links</div>
            <ul className="mt-2 space-y-2 text-slate-700">
              <li><a className="hover:underline text-amber-700" href={CONFIG.links.pump}>Pump.Fun</a></li>
              <li><a className="hover:underline text-amber-700" href={CONFIG.links.x}>X (Twitter)</a></li>
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
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="font-semibold">{q}</div>
      <div className="text-slate-700 mt-1">{a}</div>
    </div>
  );
}
