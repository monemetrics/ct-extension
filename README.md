<div align="center">

<img src="icon/128.png" width="96" height="96" alt="ct">

# ct

**Own your distribution. Control your algo.**

A Chrome extension that puts a feed *you* control on top of X.

</div>

---

This repository is the **ready-to-install build** of ct. The Chrome Web Store
review is still in progress, so until it lands you can install the extension
yourself in about a minute. Nothing here needs Node, npm, or a build step —
these files are the extension.

## Install

### 1. Get the files

**Download the ZIP** — click the green **Code** button above → **Download ZIP**,
then unzip it. You'll get a folder called `ct-extension-main`.

Or, with git:

```sh
git clone https://github.com/monemetrics/ct-extension.git
```

Keep the folder somewhere permanent. Chrome loads the extension *from this
folder every time it starts* — if you delete it or move it to the trash, the
extension stops working.

### 2. Turn on Developer mode

Open `chrome://extensions` and switch **Developer mode** on, top-right.

### 3. Load it

Click **Load unpacked**, then select the folder from step 1 — the one with
`manifest.json` directly inside it.

ct appears in your extensions list. Pin it to the toolbar (click the puzzle-piece
icon → pin ct) so it's one click away.

### 4. Open it

Go to [x.com](https://x.com) and click the ct icon. The side panel opens.

That's it. ct starts learning from the posts your browser already loads — give
it a few minutes of normal scrolling before the feed has anything interesting
in it.

**Follow the tour.** Since 0.0.14 the panel opens on a seven-step tour, at the
top of the feed and behind the `tour` chip in the titlebar. It is worth the ten
minutes: a few parts of ct genuinely cannot work until you have done the
equivalent thing on x.com once, and the tour is the only place that says which.
You can hide it and come back — it counts what you do either way.

<details>
<summary><b>Other Chromium browsers</b></summary>

The same build works on Brave, Edge, Opera, Arc and Vivaldi. The extensions page
differs slightly:

| Browser | Extensions page |
| --- | --- |
| Brave | `brave://extensions` |
| Edge | `edge://extensions` |
| Opera | `opera://extensions` |
| Vivaldi | `vivaldi://extensions` |
| Arc | `arc://extensions` |

Everything after that — Developer mode, Load unpacked — is identical.

**Firefox and Safari are not supported.** ct is a Manifest V3 Chrome extension
and uses APIs (offscreen documents, side panel) that don't exist there.

</details>

<details>
<summary><b>"This extension is not from the Chrome Web Store"</b></summary>

Chrome shows this warning for every unpacked extension, on every startup. It is
telling you the truth — this build did not come from the store, which is exactly
why you're here. It does not indicate a problem with the extension.

Once ct is in the store, installing from there replaces this and the warning
goes away.

Do **not** click "Remove" on the warning dialog; dismiss it instead.

</details>

<details>
<summary><b>Keeping it up to date</b></summary>

Unpacked extensions don't auto-update. To take a new version:

1. Download or `git pull` the latest files into the *same* folder.
2. Go to `chrome://extensions` and hit the reload icon on ct's card.

Your data — frens, settings, captured posts, keys — lives in the browser, not in
this folder, so it survives an update.

If you'd rather not take that on trust, **Settings → Identity & privacy → frens
list** writes your graph out to a file. Importing it back merges rather than
replaces, so it's also how you move your frens to another browser or machine.

</details>

## Uninstalling

Go to `chrome://extensions`, click **Remove** on ct. That deletes everything ct
stored locally. You can then delete the folder.

## Permissions, and why

Chrome will list these when you load the extension. Each one is here because a
feature needs it, and nothing collects data about you:

| Permission | Why |
| --- | --- |
| **Read your browsing history** | The wording is Chrome's, and it overstates things. ct uses the `tabs` API to open a tab when you click a post, and to notice when an x.com tab has finished loading. It never reads your history. |
| **Read and change your data on x.com** | Reads the posts and profiles X sends your browser, so it can rank and search them offline. **Since 0.0.9:** it can also act as you — like, repost, and post — but only in the moment you click, and only the action you clicked. ct never acts on your account on its own: nothing automated, nothing scheduled, nothing in the background. It still never follows, replies, or sends DMs. |
| **Cookies on x.com** | Two cookies only: `twid`, so ct knows which X account you're signed in as, and `ct0`, the CSRF token X requires on its own requests. Neither is stored or sent anywhere. |
| **ct.42069.gg** | The wallet-linking page, for linking an *external* wallet — those can't be reached from inside an extension, so signing has to happen on a normal web page. **Since 0.0.14** ct's built-in wallet signs its own pass in the panel, so most people never open this. |
| **Robinhood Chain RPC** | Reads token balances for the broadcast gate and the wallet, and — **since 0.0.12** — sends the swaps you confirm. Nothing is *sent to the chain* without you pressing swap. **Since 0.0.14** ct will sign a broadcast pass by itself once your built-in wallet holds 100,000 $CT: that is a signature over a plain sentence, not a transaction — it spends nothing, approves nothing, and costs no gas. Switch it off under Settings → Network. |
| **beacon-1/2/3.42069.gg** | Relay servers that let peers find each other. Browsers can't connect to each other unaided. |
| **Downloads** | Saves a post's video when you click **⤓**. Chrome fetches the MP4 itself, so ct never handles the file, and nothing is downloaded unless you ask for it. |
| **Debugger** | **Off by default.** An optional second way to capture X responses, only if you switch it on in settings. Chrome shows a banner the whole time it's active. |

Everything ct stores stays in your browser. There is no ct account, no server
holding your data, and no analytics or telemetry of any kind. Since 0.0.12 that
includes a wallet key, encrypted with your password — which also means **ct
cannot recover it for you**. See below.

Full detail: **[ct.42069.gg/privacy.html](https://ct.42069.gg/privacy.html)**

## What's in this repo

The built extension, exactly as loaded by Chrome:

```
manifest.json      what Chrome reads first
background.js      the coordinator — storage, the graph, the RPC surface
sidepanel.html     the UI
offscreen.html     hosts the p2p node (needs WebRTC, unavailable in a worker)
content-scripts/   the parts that run on x.com and the wallet-linking page
chunks/  assets/   bundled JS and CSS
icon/              the CT mark, 16–128px
```

| | |
| --- | --- |
| Version | `0.0.16` |
| Built from | `monemetrics/ct` @ `8f4dacb` |
| Built on | 27 August 2026 |

### New in 0.0.16 — open a noted post without leaving ct

Notes were built before ct had a reader of its own. So the frozen copy of the
post sat at the bottom of every note with no way into it, and the only way to
see the post properly was `on x.com ↗` — a tab, on the site you keep notes to
avoid having to read.

**Click the post inside a note and it opens in ct's post view**, the same sheet
a card in the feed opens: the conversation above and below it, every metric ct
holds, media at full size, and the `✎` to add another note to the pile you are
already reading. Keyboard too — tab to it, Enter.

What opens is ct's *current* record of the post, where it has one. The frozen
copy is what the post looked like the day you wrote about it — the right thing
to show on the note, and the wrong thing to open, because the counters and the
like button in the post view describe the post now. Where ct has no record —
a post it never captured, or one long gone from the corpus — the note's own
copy opens instead, since that is the only copy left anywhere. The note keeps
showing you its snapshot either way; nothing about what you saved changes.

`on x.com ↗` is still there, and still goes to X.

### 0.0.15 — mute an account, and a switch for the peer firehose

Two ways to turn the volume down, from opposite ends: one person you don't want
to read, or the whole network at once.

**Every post now carries a `⊘ mute`.** It hides that account — in the feed, and
in the replies under any post you open. Hover a post to see it; it sits at the
end of the row, past `✎ note`, deliberately out of thumb's reach.

The part that isn't obvious, and the reason this is here at all: **it covers
posts that came from peers.** ct pools captured posts, so a post can reach your
feed having never passed through your browser on x.com — muting someone on X
does nothing about that copy, because X was never in the path. This mute drops
them on arrival as well as in the feed, so an account you never followed can't
reach you through the pool either.

A few decisions worth knowing:

- **It's keyed to X's numeric id, not the handle.** They can rename as often as
  they like and stay muted. If they drop the handle and somebody else picks it
  up, that person does *not* inherit the mute.
- **It hides other people's reposts of them too**, or a mute would last only
  until someone amplified them.
- **A quote of a muted account still shows.** That's somebody else's post about
  them, which is often exactly what you want to see.
- **It is a hide, not a block.** Nothing is disconnected and nothing already
  captured is deleted — unmute and their posts come back. It also doesn't touch
  x.com; ct is not driving X's own mute list.

Muting an **account** is a different thing from muting a **peer**, which ct has
always had and which really is a disconnect. Both lists live in **Settings →
Moderation**, separately, and both belong to the X account you were signed in as
when you made them.

---

**The tuner has a `peers` row.** Two keys, both on by default:

`pooled posts` — the posts other peers captured and shared, the ones marked
*"from a peer, not seen on X"*. Off, the feed is built from nothing but what
this browser saw itself.

`casts` — live broadcasts, interleaved with the posts. Off hides them **from
the feed only**; comms still receives every one, so this is about what
interrupts your reading rather than about refusing to listen.

Switch both off and you are back to your own algo on your own capture, which is
the setting to reach for when the network is noisier than it is useful. The
readout at the top of the panel says `no peers` when you do — a quiet feed
should read as a filter you set, not as a build that stopped working. Nothing
about this stops you *sharing*; that's still its own switch in Settings →
Network.

### 0.0.14 — a tour, and a wallet that lets itself in

Two things in this release, and they're the same complaint from opposite ends:
ct asks you to do a handful of specific things before parts of it work, and it
never said so.

**There's a tour now — seven steps, and it counts itself.** A `tour n/7` chip
sits in the titlebar next to `docs`, and while it's unfinished the current step
also sits above your feed, which is where a fresh install lands and stares.
Plug in · first fren · teach ct your hands · keep something · go live · make a
wallet · earn the mic.

None of those are busywork. They're the things that genuinely have to happen
first, and the tour exists because several of them are impossible to guess:

> **Why the like button doesn't work until you use X's.** ct acts on X by
> replaying requests it has watched your browser make — that's what lets it work
> with no API key and no ct account. X only issues a like request when a human
> presses the heart, so a fresh install has a like button that is correctly
> wired and completely inert. Same for reposting. Press each once on x.com and
> both come alive in the panel, permanently.

The tour's third step points at
[our post](https://x.com/ctextension/status/2087110695947018381) as the thing to
practise on, which is self-serving and we won't pretend otherwise — but any post
counts, and the card says so. ct records the shape of the request, never which
post it was for. Once both are learned, that same post re-appears *inside the
panel* with working like and repost buttons, which is the demonstration: the
thing you just taught it, on the post you taught it with.

**It counts what you actually did, not what you clicked here.** Progress is read
off the real state of the extension — the recorded requests, your graph, your
wallet — so if you've been using ct for weeks you'll open the tour already at
5/7. Steps completed while the panel was shut are simply green when it opens.
Nothing un-ticks: your frens list is per X account, so switching accounts would
otherwise wipe two steps, and that's not how achievements work.

**Pause it whenever.** `hide` on the card, or `pause` in the sheet. Progress
keeps counting while it's away — it was never the tour's to count. `restart`
puts the framing back and re-ticks most boxes immediately, because they describe
things you still have.

---

**The built-in wallet now clears the broadcast gate on its own.** Broadcasting
still needs 100,000 $CT, and that hasn't moved. What's changed is what happens
when you have it.

Before, the only wallet ct could prove anything about was an external one, and
proving it meant a trip to a web page — because wallet extensions can't be
reached from inside another extension, so there was nowhere else for the
signature to happen. None of that applies to the wallet ct added in 0.0.12: it's
ct's own key. So when it holds enough, ct signs the pass itself, in the
background, and you can just broadcast. No page opens, nothing to confirm, no
transaction and no gas.

It checks at the moments that can actually change the answer — a swap
confirming, unlocking your wallet, switching accounts — so buying $CT in the
swap tab and then broadcasting is now one continuous thing rather than two with
a detour in between.

**It won't touch a wallet you linked yourself.** If you've already linked an
external wallet and it still works, ct leaves it alone. A pass says publicly
which address speaks for your peer — quietly swapping that for a different one
isn't ours to do. There's a switch for the whole behaviour in **Settings →
Network → Use ct's own wallet**, on by default. Worth knowing why you might turn
it off: the pass links your trading wallet to your peer identity in public. It
always did that — but before, you opted in by walking through the page.

**A closed gate now tells you which closed gate it is.** "Link a wallet holding
$CT" was the only thing it ever said, including to people whose wallet held
plenty and was merely locked. Now it distinguishes: locked wallet, short of the
threshold, chain not answering, nothing linked — each with the button that
actually helps. It reads your balance before it mentions the lock, so it never
claims you hold enough without having looked.

**You no longer need the network running to link.** ct mints your peer key per X
account and holds it whether or not the node is up, so a pass can be signed
before you've ever pressed **start**.

### 0.0.13 — read the whole conversation

Opening a post used to show you that post and nothing around it. A reply
arrived with no sign of what it was answering, and the replies underneath it —
usually the reason the post is worth reading at all — weren't there.

**The post sheet is now a thread.** What the post replies to sits above it, in
order, running down into it. The replies sit below. Tap any of them to open
that one instead, and a **← back** button appears in the header to walk you out
again.

**A tweetstorm reads as one column.** Someone continuing their own post doesn't
get indented — it's one piece of writing, and X numbers it that way. Someone
*answering* does get indented, and so does the author when they answer somebody
else, because that really is a reply rather than a continuation.

**Where the replies come from.** Opening a post fetches its conversation from X
once — one request, the same one x.com makes when you open a status page — and
everything in it is kept. But the thread you see is assembled from everything ct
holds, not just from that one response. So replies captured earlier show up too,
the thread fills in as you browse, and it still renders when X is unreachable.
Re-opening the same post reads what's stored rather than spending another
request; **↻** next to **replies** asks X again.

**It will tell you what it doesn't have.** Two honest limits, both said on
screen rather than papered over. X returns the first page of replies, not all of
them, so a post X counts 40 replies on may show fewer — the sheet says
`X counts 40 in total — ct holds 12`. And ct only holds what it has seen, so a
long chain can start in the middle; where that happens you get a line offering
the earlier posts on x.com.

**Do it once on x.com first.** Same as the About page in 0.0.7 and the actions
in 0.0.9: ct replays requests it has watched your browser make, and it has never
seen you open a post's page. So the first thread will ask you to open any post
on x.com once. After that it works everywhere, and it's a one-off, not a
per-session thing.

**Replies aren't buttons.** The ♥ ↺ ↩ counts on a post inside a thread are text,
not controls, unlike the ones on a feed card. In a dense column of near-identical
rows a mis-tap would like a stranger's reply on your real X account. Open the
reply and the buttons are there, on a screen that shows you what you're about to
act on.

### 0.0.12 — a wallet, and swapping without leaving X

ct has always been able to *read* a $CT balance. It could never hold one. This
release adds a wallet and a swap tab, so buying $CT — or any of the tokenized
stocks on Robinhood Chain — happens in the panel rather than on someone else's
site.

**Read the recovery warning before you fund anything.** The wallet is created
in your browser and encrypted at rest with a password only you know. There is
no reset, no support address, and no copy anywhere else. If you lose the
password without having written down the seed phrase, the funds are gone — and
nobody at ct can do anything about it. Setup makes you acknowledge exactly that
before it will create the wallet, and **back up** in the swap tab's wallet
header shows the phrase again whenever you want it.

**The swap tab.** Pick two tokens, type an amount, press swap. Alongside the
amount are **$25 / $50 / $100** buttons, priced from the same pools the trade
will hit — nobody knows what 0.0055 ETH is, and everybody knows what $25 is.
The token list carries ct's own five plus the 100 tokenized stocks, with
anything you already hold at the top.

**Buy buttons on cashtags.** A post mentioning `$NVDA` or `$AMD` now carries a
small **buy** button in its action bar, next to `+note`, for any ticker that has
a pool. Pressing it opens the panel with that trade set up. Only cashtags with
the `$` count — the ticker list contains `ALL`, `APP` and `NET`, and a feed
sprouting buy buttons on the word "all" is not a feature.

**Routes are found for you.** Most tokenized stocks have a pool against exactly
one thing — some only against USDG, some only against ether, and $CT only
against ether. When there is no direct pool, ct composes a route through one or
two of them and sends **the whole thing as a single transaction**: it either
completes or it reverts and you keep what you had. `$AMD` to `$CT` really is
`AMD → USDG → ETH → CT`, and the route panel names every pool it passes
through.

**Where the price comes from.** There is no aggregator, no API key and no ct
server in the path. A contract on Robinhood Chain quotes every venue in a
single read and hands back the calldata to execute, so the number you are shown
and the number you receive come from the same pool. That matters more here than
it sounds: $CT alone has around fifteen zero-liquidity pools charging 87–99%
fees, and the route panel will show you them quoting nothing.

**ct takes 0.5% of a swap**, shown as its own line next to the rate rather than
folded quietly into the output. Swaps involving $CT are free, and so is
wrapping ETH. The fee is for the interface — the contracts are public and
anyone can call them directly and pay nothing.

**Smaller things.** A toast reports each swap as it is submitted, confirms or
fails, and it follows you across tabs — failures stay until you dismiss them,
because that is the only place the reason appears. The wallet shows its full
address with copy and explorer buttons. The idle lock went from 15 minutes to
an hour.

**What has not changed:** ct still holds no account of yours and still sends
nothing to a server. This wallet is also separate from the broadcast gate — the
gate reads a balance from whichever wallet you linked at
[ct.42069.gg](https://ct.42069.gg), and that page and its `personal_sign` flow
work exactly as before. Swapping here does not link anything.

### 0.0.11 — the broadcast gate drops to 100,000 $CT

Publishing a broadcast used to need **1,000,000 $CT** in a linked wallet. It now
needs **100,000** — a tenth of what it was, and 0.01% of supply instead of 0.1%.

Nothing else about the gate changes. It is still only on broadcasts, the one
verb that reaches every peer at once; reading, DMs and the post pool are open to
everyone and always will be. Linking is still a plain `personal_sign` — no
transaction, no approval, no gas — and holding is still the whole ticket: your
balance is read fresh from Robinhood Chain by every peer you talk to, so nothing
is spent and nothing is locked up.

**If you signed a pass already, it still works.** A pass says which wallet owns
your peer key; it never carried the amount. Peers re-read the balance on their
own schedule, so the lower bar takes effect for you as soon as the peers you're
talking to are running this version.

**If you were short of the old bar, check again.** Settings → **network** names
the threshold this build enforces, and the wallet-linking page reads your
balance straight from Robinhood Chain and tells you whether it clears — the
same page you'd use to link a wallet in the first place.

### 0.0.10 — filter by what a post carries

The tuner has a new **type** row, above **last**: `text`, `images`, `video`,
`gifs`, `links`. Press one and the feed keeps only posts carrying that; press
several and it keeps posts carrying any of them. Press none and everything
comes through — which is also what pressing all five does, since every post
lands in at least one of them.

Three things it does that you'd otherwise have to discover by watching it:

- **`text` means no media and no link** — the posts that are only writing.
- **`links` means it points off X.** X attaches the quoted post's own permalink
  to every quote post; counting that would make every quote a link post, so it
  doesn't count.
- **A repost is judged by the post it repeats**, and media inside a quoted post
  counts too — both because that is what you're actually looking at in the card.

The readout at the top of the panel names the constraint alongside the sort and
the time window — `time · 2d · images` — so a feed emptied by a type filter
reads as a filter you set rather than as a build that stopped working.

### 0.0.9 — ct can act, when you tell it to

Until now ct only ever read from X. It can now **like**, **repost**, and
**post** — and this is the first release where something you do in the panel
changes something on your actual account, so it's worth reading the shape of it.

**Like and repost from the feed.** The ♥ and ↺ counters under every post are
now the buttons. They light up when you've already liked or reposted, and the
number moves as you click. In the post sheet they sit in the header. A repost
acts on the original post, so reposting something from someone else's repost
does what you'd expect.

**Post to X from the composer.** The comms box in the network tab has an
**also post to X** switch beside send. Off it broadcasts to the ct network as
before; on, the same text goes up on your X account too, and the button reads
`post` instead of `send`.

It **starts off every time you open the panel and is never remembered**. That
is deliberate: forgetting to tick it costs you a click, while a remembered tick
would publish something publicly that you thought you were saying to the ct
network alone. Ticking it also gets you past the $CT broadcast gate — posting
to your own X account has nothing to do with the token — so the X half works
whether or not you've linked a wallet.

**Do each thing once on x.com first.** Same as the About-page note in 0.0.7:
ct works by replaying requests it has seen your browser make, and it has never
seen you like anything. So the first like from the panel will tell you to go
and like one post on x.com — after that it works. Repost and post are the
same, and each is learned separately. It's a one-off per action, not per
session, and the message says exactly what to do.

**What ct does with your likes: nothing.** Likes are never broadcast to the ct
network, never shared with peers, and never leave your browser — the panel is
the only thing that knows. Reposts and posts do reach the network, because
they're already public. If a peer sends ct a post claiming you liked it, that
claim is discarded on arrival.

### 0.0.8 — videos, and a post view for the details

**Videos download, and play in the panel.** Every video and GIF in the feed
now carries a **⤓** button — hover a post's media to see it — that saves the
MP4 straight to your downloads, named after the account and post it came from
rather than X's opaque CDN hash. Clicking the play badge plays it in the panel
instead of sending you to x.com.

The sources were already arriving in the data ct captures; nothing extra is
requested from X to make this work, and no third-party downloader service is
involved. This is the one new permission in this release — see **Downloads** in
the table above.

**Clicking a post now opens it in the panel.** The card in the feed is tuned
for scanning a column; the new sheet is the opposite — everything ct holds
about a post. The author with their bio and follower counts, the full text
(selectable, so you can actually copy it), media uncropped at its own aspect
ratio, all six engagement counts with exact figures on hover, every cashtag,
hashtag, mention and link, and every video rendition listed by resolution and
bitrate so you can pick which one to save.

Underneath that is a **record** section, which is the part worth knowing about:
the post and author ids, and — the two that were previously invisible — which X
operation ct lifted the post from, and whether it arrived from a peer rather
than from X at all. A post ct heard about over the network is a claim someone
signed, not something ct saw on X, and now you can tell which is which.

`on x ↗` in the sheet header still takes you to the post on X.

### 0.0.7 — where accounts post from

Every post in the feed now carries the account's country beside its handle —
🇩🇪, 🇺🇸, 🇪🇪 — read off X's own **About this account** panel.

Treat it as X's guess rather than a fact. X infers the country from where an
account connects, and it says as much itself: when it can't narrow one down it
gives a region instead, and ct shows that dimmed — "Europe" rather than a flag.
Hover any of them for X's exact wording and whether X called it accurate.

One thing to do first: open any `x.com/<handle>/about` page once. X only asks
for this data when you visit that page, and ct works by replaying requests it
has seen — so until you've been there once, there is nothing to replay and no
flags appear. Accounts are then looked up a few at a time as they turn up in
your feed, and remembered for a month, because each one costs a request against
the same X budget your own browsing draws on.

**Settings → Identity & privacy → Show where accounts post from** switches
between the flag, the two-letter code (`de`, `us`, `ee`), and off. Off stops the
lookups happening at all rather than just hiding the result.

### 0.0.6 — buttons that follow you

X's router reuses page containers instead of rebuilding them, so moving from one
profile to the next left ct's `+ct` and `+note` buttons sitting there — still
carrying the previous account's id. A note written through a stale one was filed
against the wrong person. Those buttons are now swept on every navigation.

### 0.0.5 — notes read as yours

A note used to sit under the avatar of the account it was about, which made
your own writing look like something they had posted. Now the note itself is
the card: your words come first, in the accent, under a line that says whose
post they are about — and the copy of that post sits below with its author's
face on it, clearly theirs rather than yours.

### 0.0.4 — notes

Write notes on accounts and on posts, from x.com or from the panel. **`+note`**
sits beside the follow button on a profile; **`✎`** sits in every post's action
bar, and on any account or post inside the panel.

A note on a post keeps a **copy of that post** — text, author, media, counts —
frozen at the moment you wrote it, so it survives the original being edited or
deleted. That is the difference between this and a bookmark.

The new **notes** tab searches everything you've written and groups it by time,
by tag, or by who it's about. **Backup** there writes a `json` file that imports
back, or a `md` archive you can read anywhere. Notes are filed under an
account's X id rather than their handle, so they survive a rename.

## Links

- **[ct.42069.gg](https://ct.42069.gg)** — what ct is, and the demo
- **[Privacy policy](https://ct.42069.gg/privacy.html)**

## License

MIT.
