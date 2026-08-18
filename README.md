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
| **ct.42069.gg** | The wallet-linking page. Wallets can't be reached from inside an extension, so signing happens on a normal web page. |
| **Robinhood Chain RPC** | Reads token balances for the broadcast gate and the wallet, and — **since 0.0.12** — sends the swaps you confirm. Nothing is signed or sent without you pressing swap. |
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
| Version | `0.0.12` |
| Built from | `monemetrics/ct` @ `1268909` |
| Built on | 18 August 2026 |

### New in 0.0.12 — a wallet, and swapping without leaving X

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
