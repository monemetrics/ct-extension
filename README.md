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
| **Uniswap's pool index** | **New in 0.0.20.** Depth, 24-hour volume and fee APR for a token's pools, and the list of what Robinhood has tokenized — none of which is readable from the chain itself. Asked only when you open **explore** or a pool table, never while you read a timeline. The request carries a token address and nothing else: no wallet address, no cookie, no X identity, no key. It is the only third-party API ct calls. |
| **beacon-1/2/3.42069.gg** | Relay servers that let peers find each other. Browsers can't connect to each other unaided. |
| **Downloads** | Saves a post's video when you click **⤓**. Chrome fetches the MP4 itself, so ct never handles the file, and nothing is downloaded unless you ask for it. |
| **Notifications** | **Since 0.0.17.** Raises a desktop notification when one of your alert topics matches — nothing else uses it. Every topic has its own bell, off is per topic, and Settings → Alerts has a master switch that silences all of them at once. No topics means no notifications, ever. |
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
| Version | `0.0.21` |
| Built from | `monemetrics/ct` @ `8fe69d1` |
| Built on | 4 September 2026 |

### New in 0.0.21 — the swap tab stops asking first

A password prompt was the first thing the swap tab showed you. Not to sign
anything — just to look. Markets, pools, prices and balances are all reads off
the chain and none of them needs a key, so the wall stood in front of the wrong
things. The one moment a wallet is genuinely required is the press that signs.

**Everything on the tab now works with the wallet locked.** Explore, search, the
pool tables, live quotes, your balances — all of it. The buy button on a tweet
opens a composer with the pair loaded and a price on screen, rather than a
password box with the trade you wanted somewhere behind it.

**The password is asked for once, in the review sheet**, on the button that
sends: *unlock & swap*. One press opens the wallet and signs.

A quote lives twenty seconds, and typing a password spends some of that. If it
lapses while you type, the button offers you a fresh one instead of going dead —
what gets signed is never a price that aged out while you were reaching for it.

**Having no wallet at all is no longer a locked door either.** The tab opens on
explore like anyone else's, and the composer's button reads *set up a wallet to
swap*. That step still comes before a price, because a quote names the account
that will receive the tokens, but it comes when you ask to trade rather than
when you ask to look.

Nothing about the vault itself changed: same encryption, same auto-lock, and the
seed phrase still asks for the password separately even while the wallet is
open — unlocked means *may spend*, not *may be copied*.

#### Also: the site can tell the extension is installed

ct's web app is being built, and this release carries its half of one handshake:
on `ct.42069.gg` the page asks whether the extension is there and gets back that
it is, and its version. That is the whole exchange. It is deliberately
capability-free — no peer id, no wallet address, no account, no feed state
crosses into the page — and it happens nowhere else.

### 0.0.20 — the markets behind the ticker

A tokenized stock on Robinhood Chain is not one market. `$AAPL` sits in about
twenty pools: three against USDG across two Uniswap versions, one against ether,
one against `$NVDA`, one against `$SPY` — and a dozen against memecoins minted
specifically to pair with it, several of which turn over more in a day than the
stock's own dollar pool does.

None of that was reachable from a swap box you had to already know what to type
into.

**The swap tab now opens on explore.** Every market ct ships, ranked by 24-hour
volume, searchable, filterable to tokenized stocks or to what you actually hold.
Open a row and it shows that token's deepest pools — pair, Uniswap version, fee,
TVL, 24-hour volume and fee APR — and tapping one loads the pair into the
composer, which is itself rebuilt around *pay* and *receive* with the winning
route named underneath.

The composer has not changed what it does. The route is still chosen on chain by
`CtQuoter` inside a single call, and the price you are shown is still the price
that pool will fill, net of ct's fee.

#### 191 tickers, and the first ETFs

The list ct ships went from **100 to 191**. Everything new is in it — `$SPY`,
`$QQQ`, `$GLD`, `$SLV`, `$SGOV`, `$LLY`, `$BA`, `$F`, ninety-one in all,
including the first tokenized ETFs Robinhood has issued.

Every one was rebuilt against the chain rather than copied from an API: the
symbol and decimals below each ticker are what the contract answers, not what an
index claimed. That check is not ceremony — the roster still reports `SKYHY` for
a token whose contract says `SKHY`, and a cashtag that matches nothing you can
buy is worse than no cashtag.

#### It now tells you when it's behind

Ninety-one tickers appeared in two weeks. A list baked into a release cannot keep
up with that, and the old failure was silent: search `$SPY` in a build that
predated it and you got nothing, with no way to tell "ct has never heard of this"
from "this is not tokenized".

**The token picker now says which it is.** Opening it checks Robinhood's roster —
at most once every six hours, cached in between — then tells you how many tickers
this build does not carry, and lists the matching one when you search for it — marked *not in ct's list*, because it is
not. Picking it reads the symbol and decimals off the contract, exactly as
pasting an address does, and it stays marked unverified until a release checks
it.

#### What the numbers are, and are not

Depth, volume and APR come from Uniswap's index, not from the chain. ct did not
measure them and does not vouch for them, so nothing routes, prices or spends on
them — they decide what you *look at* next, and the trade that follows is quoted
on chain like any other.

Read the APR column with that in mind. Four figures is normal here and it is
arithmetic, not a forecast: a day of fees on a thin pool, annualised. Most of
these pools will not exist in a month.

The privacy line is the one worth knowing. Opening explore or a pool table is
the only moment ct talks to a third party, and it sends a token address — never
your wallet address, your holdings, your searches, or anything about your X
account. Reading a timeline still sends nothing to anyone, which is the whole
reason the ticker list is baked into the build rather than fetched per tweet.

### 0.0.19 — read one account, across every name it has worn

0.0.18 put the numeric X id on your notes. This makes it do something.

**Click an id and the list narrows to that account** — the same gesture as
clicking a tag, and the same result: everything you have written about one
person, oldest to newest, in one column. Or paste an id straight into the search
box. ct treats a bare number as an account rather than as a search term, because
ids appear nowhere in the words of a note, and running one as a search would
answer "you have no notes on them" — the one answer that must never be wrong.

The filter is on the id, never the handle. That is the whole reason it is worth
having: an account that renamed twice is still one account, and this is the only
filter in the panel a rename cannot break.

#### What they used to be called

Notes show whoever an account is *now* — ct refreshes the handle on your notes
from what it captures, so a name change doesn't leave you reading about someone
who no longer exists under that name.

The frozen posts don't work that way, and never did. A copy of a post is never
rewritten — that is the entire promise of keeping one — so the copy attached to
a note from March still carries the handle its author was wearing in March.

So the rename history was already sitting on your disk. Nothing was recording
it, because nothing had thought to look. **Now a filtered account shows the
names it has been through:**

> also seen as **@oldname** until 29/08/26 — same account throughout, which is
> how these notes stayed together.

Nothing was migrated to make this work. Notes you wrote a year ago have it too.

One thing it deliberately won't do: a note on a post that *quotes* somebody else
carries that stranger's handle in the copy as well, and counting it would accuse
an account of once having been named after someone it happened to quote. Only
the post's own author counts.

### 0.0.18 — the account behind the handle, and notes that outlive a block

A handle is rented. X frees one the moment its holder drops it, anyone can take
it, and an account can rename itself as often as it likes — which on crypto
twitter is not an edge case, it's the method: wear a name people already trust,
take what you can, rename.

ct has always known this. Every note you have written was filed under the
account's **numeric X id** — assigned once at signup, never reassigned — which
is why a renamed account's notes never went missing. But the id was never shown,
so the one fact that settles *is this the same guy* sat in the database being
useful to nobody.

**Notes now show it.** `@handle = 1234567890`, with the date you wrote, on every
note card, in both composers — the panel's and the one on x.com — and in the
section header when you group by account. Click it to copy. It's monospace
because the only thing anyone ever does with an eighteen-digit number is line it
up against another one.

Nothing was migrated and nothing was refiled; the id was already there. Notes
you wrote a year ago show it too.

#### Notes survive a block

Blocking is where this mattered most and worked least. ct found out which
account a profile belonged to by reading X's own follow button, and a blocked
profile doesn't have one — so on exactly the profile where you most want to read
back what you wrote, the `+note` button didn't appear at all, and there was no
way to reach the notes from the page.

**It appears now**, on a profile you've blocked and on one that has blocked you,
carrying the count of what you've already written there. Where X publishes no id
anywhere on the page, ct matches the handle in the URL against the notes it
already holds. The side panel was never affected — notes live in ct's own
storage and have never needed X's permission to be read — but the panel is not
where you are standing when you want them.

One limitation worth stating: a *post* by a blocked account renders as "This
Post is unavailable" and carries no post id anywhere in the page, so there is
nothing for the `✎` to attach to. The note is still on the account's profile and
in the panel, with its frozen copy of the post intact. Only the marker in place
is missing.

### 0.0.17 — alerts: watch a subject, not an account

X only knows how to notify you about *people*. Turn the bell on for someone and
you get everything they post, and there is no way at all to say "tell me when
anyone starts talking about this". Which is backwards for the case that actually
matters — during something fast-moving, almost every post worth seeing is
written by an account you have never heard of.

**The new 🔔 tab watches subjects.** A topic is a standing X search — `$SOL OR
#solana`, `"depeg" -filter:replies`, `from:someone min_faves:50` — with its own
feed and its own bell. Add one from the tab, or search in **find** and press
**watch it**, which turns what you just typed into a topic.

Each topic fills from two directions, and the second one is the part that makes
it work offline of your own attention:

- **ct searches X for it** in the background, on a rotation. This is the half
  that reaches strangers, and it is the half that costs requests.
- **Every post ct captures anyway** — your home timeline, your frens, ordinary
  browsing, posts other peers contributed — is matched against every topic on
  its way in. That costs nothing, so a matching post from a fren lands in the
  topic feed the moment it arrives rather than at the next search.

The query is **X's own search syntax and is sent to X exactly as typed**, so a
query you tuned in x.com's search box works here unchanged: quotes for a phrase,
`OR` between alternatives, `-` to exclude, brackets to group, `min_faves:`,
`from:`, `lang:`, `-filter:replies`. A few operators only X can evaluate
(`until:`, `geocode:`) — the composer says so, because for those the free half
above goes quiet and the topic only fills when it searches.

**Each topic has its own cadence.** Watch something moving fast every minute and
something slow every three hours, from the topic's **edit**. Setting everything
to a minute does not multiply the requests: a round is capped either way, so a
fast topic simply gets picked more often than a slow one. Topics can also be
paused (`◌`), which stops the searching but keeps the free half collecting —
the right setting for a subject you care about but not today.

**Notifications are per topic, and coalesced.** One notification per topic per
batch rather than one per post, with a floor between them, and a per-topic *only
over N likes* threshold — which is the setting that makes watching a busy hashtag
survivable at all. Everything still lands in the topic feed regardless; the
threshold only governs what is allowed to interrupt you. The toolbar icon carries
the total unread, so you can turn every bell off and still have a number to come
back to.

One honest limitation: the searching half needs ct to have seen X issue a search
once, because ct replays X's own requests rather than pretending to be a client
it isn't. **Run one search on x.com** and every topic works from then on — the
alerts tab says so if you haven't.

**Settings → Alerts** holds the default cadence for topics that don't override
it, and the master switch for notifications.

#### Also: the net tab is gone, and connect moved to the titlebar

The network tab was a screen people opened twice — once out of curiosity, once
when peers wouldn't appear — and it was taking a column the tab strip needed.

**The connect button is now in the titlebar**, next to the dot and the peer count
it changes, which is where a thing you press several times an hour belongs. The
diagnostics it sat above — node state, the peer list, your addresses — are under
**Settings → Network**, below the sharing and beacon controls that were already
there. Nothing was removed; `find`, `alerts` and `settings` now wear an icon
rather than a word so eight tabs fit a narrow panel.

### 0.0.16 — open a noted post without leaving ct

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
