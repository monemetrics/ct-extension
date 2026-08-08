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
| **Read and change your data on x.com** | Reads the posts and profiles X sends your browser, so it can rank and search them offline. Every request ct makes to X is a read — it never posts, likes, follows or replies. |
| **Cookies on x.com** | Two cookies only: `twid`, so ct knows which X account you're signed in as, and `ct0`, the CSRF token X requires on its own requests. Neither is stored or sent anywhere. |
| **ct.42069.gg** | The wallet-linking page. Wallets can't be reached from inside an extension, so signing happens on a normal web page. |
| **Robinhood Chain RPC** | Reads a $CT token balance for the broadcast gate. |
| **beacon-1/2/3.42069.gg** | Relay servers that let peers find each other. Browsers can't connect to each other unaided. |
| **Debugger** | **Off by default.** An optional second way to capture X responses, only if you switch it on in settings. Chrome shows a banner the whole time it's active. |

Everything ct stores stays in your browser. There is no ct account, no server
holding your data, and no analytics or telemetry of any kind.

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
| Version | `0.0.3` |
| Built from | `monemetrics/ct` @ `c78d449` |
| Built on | 8 August 2026 |

## Links

- **[ct.42069.gg](https://ct.42069.gg)** — what ct is, and the demo
- **[Privacy policy](https://ct.42069.gg/privacy.html)**

## License

MIT.
