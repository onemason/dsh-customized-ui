window.__ModuleLoader__.load({
  id: '@local/customized-ui',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'sidebar.identity';
    const CLIENT_VERSION =
      (globalThis.__DSH_BOOT__ && globalThis.__DSH_BOOT__.version) || '0.2.1-rc.1';

    const en = {
      menu: 'Account menu',
      account: 'Account',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      signingOut: 'Signing out…',
      signOutConfirm: 'Confirm sign out',
      signOutFailedShort: 'Sign Out failed',
      tasks: 'Tasks',
    };
    const zh = {
      menu: '账户菜单',
      account: '账户',
      signIn: '登录',
      signOut: '退出登录',
      signingOut: '正在退出…',
      signOutConfirm: '确认退出登录',
      signOutFailedShort: '退出失败',
      tasks: '任务',
    };

    const CSS = [
      /* Mostly solid sidebar with a subtle frosted lift from the window behind. */
      '[data-platform="darwin"] [class*="sidebarCol"]{',
      '  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0) 38%), color-mix(in srgb, var(--dsw-specific-sidebar-fill) 84%, transparent) !important;',
      '  -webkit-backdrop-filter: blur(20px) saturate(130%) !important;',
      '  backdrop-filter: blur(20px) saturate(130%) !important;',
      '  box-shadow: inset 0 .5px 0 rgba(255,255,255,.06) !important;',
      '}',
      /* Auto-hide the background-jobs chip once no job is live. */
      '[data-slot="conversation.session.header.actions"] button[class*="_trigger"]:not(:has([class*="triggerDot"])){display:none !important}',
      'div[data-window-drag]:has([data-slot="sidebar.brand.name"]){height:36px;min-height:0;margin:0;padding-top:0;padding-bottom:0}',
      '[data-platform="darwin"] div[data-window-drag]:has([data-slot="sidebar.brand.name"]){height:0;min-height:0;margin:0;padding:0;overflow:hidden}',
      '[data-slot="sidebar.workspaces"] [role="treeitem"]{height:28px;min-height:0;margin-top:0}',
      /* Session titles sit one step below their workspace name (14px -> 13px). */
      '[role="treeitem"][data-row-key^="session:"]>span[class*="_title"]{font-size:13px;line-height:18px}',
      /* Fallback for hosts that omit the row key: rows with a time label are sessions. */
      '[role="treeitem"]:has(>span[class*="_time"])>span[class*="_title"]{font-size:13px;line-height:18px}',
      '[data-slot="sidebar.workspaces"] [style*="--dsh-workspace-indent"]+[style*="--dsh-workspace-indent"]{margin-top:2px}',
      '[data-slot="sidebar"] button[class*="newSession"]{display:none}',
      '[data-slot="sidebar"] nav{gap:2px;margin-bottom:4px}',
      '[data-slot="sidebar"] nav button{height:32px;min-height:32px;padding:5px 8px;margin:0}',
      '[data-slot="sidebar.workspaces"] > div > div:first-child:has(> span){height:32px;margin-top:0;margin-bottom:2px}',
      '[data-slot="sidebar.settings"] div:has(> [data-slot="settings.launcher"]){margin:2px -2px}',
      '.dsh-identity-root{position:relative;flex:1;width:100%;min-width:0}',
      '.dsh-identity-root[data-collapsed="true"]{width:36px}',
      '.dsh-identity-trigger{display:flex;align-items:center;gap:8px;width:100%;height:38px;padding:6px;border:0;border-radius:var(--dsw-radius-md,8px);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:14px;line-height:22px;text-align:left;cursor:pointer}',
      '.dsh-identity-trigger:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsh-identity-trigger:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-brand-primary));outline-offset:-2px}',
      '.dsh-identity-root[data-collapsed="true"] .dsh-identity-trigger{width:36px;height:36px;justify-content:center;padding:0}',
      '.dsh-identity-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:50%;overflow:hidden;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary)}',
      '.dsh-identity-avatar img{display:block;width:100%;height:100%;object-fit:cover}',
      '.dsh-identity-avatar svg{display:block;width:16px;height:16px}',
      '.dsh-identity-initials{font-size:10px;font-weight:600;line-height:24px;letter-spacing:.02em}',
      '.dsh-identity-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.dsh-identity-root[data-collapsed="true"] .dsh-identity-name{display:none}',
    ].join('');

    /* Effective dark theme only: light mode keeps the shipped Settings surface. */
    const SETTINGS_ROOT =
      'html[data-platform="darwin"]:is([data-ds-theme-source="dark"], :has(body[data-ds-dark-theme]))';
    const SETTINGS_SCOPE = SETTINGS_ROOT + ' [data-shortcut-modal="settings"]';
    const SETTINGS_MASK =
      SETTINGS_ROOT + ' body > div:has(> [data-shortcut-modal="settings"]) > div[aria-hidden="true"]';
    const SETTINGS_CSS = [
      /* ---- Backdrop: darker and softer, so the sheet reads as the front layer. ---- */
      SETTINGS_MASK + '{',
      '  background: color-mix(in srgb, #030508 55%, transparent);',
      '  -webkit-backdrop-filter: blur(18px) saturate(120%);',
      '  backdrop-filter: blur(18px) saturate(120%);',
      '}',

      /* ---- Sheet: translucent panel over the blurred window, tinted like the sidebar. ---- */
      SETTINGS_SCOPE + '{',
      '  background:',
      '    linear-gradient(180deg, rgba(255,255,255,.065), rgba(255,255,255,0) 28%),',
      '    linear-gradient(145deg, rgba(122,155,240,.09), rgba(122,155,240,0) 48%, rgba(143,137,184,.05)),',
      '    color-mix(in srgb, var(--dsw-specific-sidebar-fill) 58%, transparent);',
      '  -webkit-backdrop-filter: blur(44px) saturate(155%);',
      '  backdrop-filter: blur(44px) saturate(155%);',
      '  border-radius: 28px;',
      '  box-shadow:',
      '    0 0 0 .5px rgba(255,255,255,.14),',
      '    0 30px 90px rgba(0,0,0,.55),',
      '    0 4px 18px rgba(0,0,0,.35),',
      '    inset 0 .5px 0 rgba(255,255,255,.18);',
      '}',

      /* ---- Navigation rail: a quiet tinted column, not floating pills on nothing. ---- */
      SETTINGS_SCOPE + ' > nav{',
      '  width: 192px;',
      '  padding: 22px 14px 20px;',
      '  gap: 16px;',
      '  background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.012));',
      '  border-right: .5px solid rgba(255,255,255,.07);',
      '}',
      SETTINGS_SCOPE + ' > nav [class*="navTitle"]{',
      '  padding: 0 12px;',
      '  font-size: 16px;',
      '  font-weight: 600;',
      '  letter-spacing: -.01em;',
      '}',
      SETTINGS_SCOPE + ' > nav [class*="navList"]{ gap: 2px; }',
      SETTINGS_SCOPE + ' > nav button{',
      '  position: relative;',
      '  height: 38px;',
      '  border-radius: 10px;',
      '  padding: 0 12px;',
      '  gap: 10px;',
      '  font-size: 13.5px;',
      '  font-weight: 500;',
      '  color: color-mix(in srgb, var(--dsw-alias-label-primary) 64%, transparent);',
      '  transition: background-color .16s ease, color .16s ease, box-shadow .16s ease;',
      '}',
      SETTINGS_SCOPE + ' > nav button:hover{',
      '  background: rgba(255,255,255,.055);',
      '  color: var(--dsw-alias-label-primary);',
      '}',
      SETTINGS_SCOPE + ' > nav button[class*="active"]{',
      '  background: linear-gradient(180deg, rgba(255,255,255,.125), rgba(255,255,255,.07));',
      '  color: var(--dsw-alias-label-primary);',
      '  box-shadow: inset 0 .5px 0 rgba(255,255,255,.18), 0 1px 2px rgba(0,0,0,.22);',
      '}',
      SETTINGS_SCOPE + ' > nav [class*="navIcon"]{ opacity: .72; }',
      SETTINGS_SCOPE + ' > nav button:hover [class*="navIcon"], ' +
        SETTINGS_SCOPE + ' > nav button[class*="active"] [class*="navIcon"]{ opacity: 1; }',

      /* ---- Header: a slim toolbar with one hairline, and a quiet close control. ---- */
      SETTINGS_SCOPE + ' > div > div:has(> [class*="actions"]){',
      '  height: 55px;',
      '  padding: 20px 16px 9px;',
      '  align-items: flex-start;',
      '  border-bottom: .5px solid rgba(255,255,255,.07);',
      '}',
      SETTINGS_SCOPE + ' > div > div:has(> [class*="actions"]) > [class*="actions"]{ gap: 8px; }',
      SETTINGS_SCOPE + ' > div > div:has(> [class*="actions"]) button[class*="_outline_"]{',
      '  height: 28px;',
      '  border-radius: 9px;',
      '  padding: 0 11px;',
      '  font-size: 12px;',
      '  font-weight: 500;',
      '  line-height: 18px;',
      '  color: rgba(249,250,251,.78);',
      '  background: rgba(255,255,255,.035);',
      '  border: .5px solid rgba(255,255,255,.13);',
      '  box-shadow: inset 0 .5px 0 rgba(255,255,255,.08);',
      '  transition: background-color .15s ease, border-color .15s ease, color .15s ease;',
      '}',
      SETTINGS_SCOPE + ' > div > div:has(> [class*="actions"]) button[class*="_outline_"]:hover{',
      '  background: rgba(255,255,255,.08);',
      '  border-color: rgba(255,255,255,.20);',
      '  color: #fff;',
      '}',
      SETTINGS_SCOPE + ' > div > div:has(> [class*="actions"]) > button{',
      '  width: 28px;',
      '  height: 28px;',
      '  border-radius: 50%;',
      '  background: transparent;',
      '  color: rgba(249,250,251,.55);',
      '  transition: background-color .15s ease, color .15s ease;',
      '}',
      SETTINGS_SCOPE + ' > div > div:has(> [class*="actions"]) > button:hover{',
      '  background: rgba(255,255,255,.08);',
      '  color: #f9fafb;',
      '}',

      /* ---- Content frame ---- */
      SETTINGS_SCOPE + ' > div > [class*="options"]{ padding: 0 22px 24px; }',

      /* ---- Cards: layered glass panes with a lit top edge. The plugin list itself
         is a grid, not a card, so it never gets the rounded container. ---- */
      SETTINGS_SCOPE + ' :is([class*="card"], [class*="Card"]):not(:is([class*="card"] *, [class*="Card"] *)):not(ul[class*="cards"]){',
      '  background: linear-gradient(180deg, rgba(255,255,255,.058), rgba(255,255,255,.026));',
      '  border: .5px solid rgba(255,255,255,.11);',
      '  border-radius: 18px;',
      '  box-shadow: inset 0 .5px 0 rgba(255,255,255,.10), 0 1px 2px rgba(0,0,0,.14);',
      '}',

      /* ---- Built-in plugins: two cards per row, aligned with the search field;
         every plugin is its own small rounded card (no list-wide wrapper). ---- */
      SETTINGS_SCOPE + ' [class*="catalog"] ul[class*="cards"]{',
      '  padding: 0;',
      '  border: 0;',
      '  border-radius: 0;',
      '  background: none;',
      '  box-shadow: none;',
      '}',
      SETTINGS_SCOPE + ' [class*="catalog"] ul[class*="cards"] > li{',
      '  background: linear-gradient(180deg, rgba(255,255,255,.058), rgba(255,255,255,.026));',
      '  border: .5px solid rgba(255,255,255,.11);',
      '  border-radius: 18px;',
      '  box-shadow: inset 0 .5px 0 rgba(255,255,255,.10), 0 1px 2px rgba(0,0,0,.14);',
      '}',

      /* ---- Account card details ---- */
      SETTINGS_SCOPE + ' [class*="avatar"]{',
      '  width: 34px;',
      '  height: 34px;',
      '  box-shadow: 0 0 0 1px rgba(255,255,255,.14);',
      '}',
      SETTINGS_SCOPE + ' [class*="identityCopy"]{ gap: 0; }',
      SETTINGS_SCOPE + ' [class*="identityCopy"] [class*="name"]{',
      '  font-size: 14.5px;',
      '  font-weight: 600;',
      '  letter-spacing: -.01em;',
      '}',
      SETTINGS_SCOPE + ' [class*="identityCopy"] [class*="status"]{',
      '  font-size: 12.5px;',
      '  color: rgba(249,250,251,.55);',
      '}',
      SETTINGS_SCOPE + ' [class*="amount"]{',
      '  font-size: 19px;',
      '  font-weight: 600;',
      '  letter-spacing: -.015em;',
      '  font-variant-numeric: tabular-nums;',
      '}',

      /* ---- Account card: the native account-info link itself becomes Sign Out. ---- */
      SETTINGS_SCOPE + ' a[class*="accountInfo"]{',
      '  height: 30px;',
      '  padding: 0 12px;',
      '  margin-right: 0;',
      '  border-radius: 9px;',
      '  gap: 0;',
      '  font-size: 0;',
      '  line-height: 0;',
      '  color: var(--dsw-alias-state-error-primary);',
      '  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);',
      '  border: .5px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 38%, transparent);',
      '  box-shadow: inset 0 .5px 0 color-mix(in srgb, var(--dsw-alias-state-error-primary) 20%, transparent);',
      '  text-decoration: none;',
      '  white-space: nowrap;',
      '  cursor: pointer;',
      '  transition: background-color .15s ease, border-color .15s ease, box-shadow .15s ease, opacity .15s ease;',
      '}',
      SETTINGS_SCOPE + ' a[class*="accountInfo"]::after{',
      '  content: var(--cu-signout-label, "Sign Out");',
      '  font-size: 12.5px;',
      '  font-weight: 600;',
      '  line-height: 18px;',
      '}',
      SETTINGS_SCOPE + ' a[class*="accountInfo"] svg{ display: none !important; }',
      SETTINGS_SCOPE + ' a[class*="accountInfo"]:hover{',
      '  color: var(--dsw-alias-state-error-primary);',
      '  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 18%, transparent);',
      '  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 55%, transparent);',
      '}',
      SETTINGS_SCOPE + ' a[class*="accountInfo"]:focus-visible{',
      '  outline: 2px solid var(--dsw-alias-state-error-primary);',
      '  outline-offset: 2px;',
      '}',
      SETTINGS_SCOPE + ' a[class*="accountInfo"][data-customized-state="signing-out"]::after{',
      '  content: var(--cu-signout-busy, "Signing out…");',
      '}',
      SETTINGS_SCOPE + ' a[class*="accountInfo"][data-customized-state="failed"]::after{',
      '  content: var(--cu-signout-failed, "Sign Out failed");',
      '}',
      SETTINGS_SCOPE + ' a[class*="accountInfo"][data-customized-state="confirm"]{',
      '  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 24%, transparent);',
      '  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 70%, transparent);',
      '}',
      SETTINGS_SCOPE + ' a[class*="accountInfo"][data-customized-state="confirm"]::after{',
      '  content: var(--cu-signout-confirm, "Confirm sign out");',
      '}',
      SETTINGS_SCOPE + ' a[class*="accountInfo"][aria-disabled="true"]{',
      '  opacity: .6;',
      '  cursor: default;',
      '  pointer-events: none;',
      '}',

      /* ---- Action links: one secondary glass tier, one solid primary tier. ---- */
      SETTINGS_SCOPE + ' a[class*="linkButton"]{',
      '  height: 34px;',
      '  min-width: 56px;',
      '  padding: 0 14px;',
      '  border-radius: 10px;',
      '  font-size: 13px;',
      '  font-weight: 500;',
      '  letter-spacing: .005em;',
      '  color: #f9fafb;',
      '  background: rgba(255,255,255,.055);',
      '  border: .5px solid rgba(255,255,255,.12);',
      '  box-shadow: inset 0 .5px 0 rgba(255,255,255,.08), 0 1px 2px rgba(0,0,0,.12);',
      '  transition: background-color .15s ease, border-color .15s ease, box-shadow .15s ease;',
      '}',
      SETTINGS_SCOPE + ' a[class*="linkButton"]:hover{',
      '  background: rgba(255,255,255,.10);',
      '  border-color: rgba(255,255,255,.20);',
      '}',
      SETTINGS_SCOPE + ' a[class*="linkButton"][class*="primary"]{',
      '  color: #0c0e13;',
      '  background: linear-gradient(180deg, #ffffff, #e8ecf3);',
      '  border-color: rgba(255,255,255,.55);',
      '  font-weight: 600;',
      '  box-shadow:',
      '    0 1px 2px rgba(0,0,0,.30),',
      '    0 6px 16px rgba(0,0,0,.22),',
      '    inset 0 .5px 0 #fff;',
      '}',
      SETTINGS_SCOPE + ' a[class*="linkButton"][class*="primary"]:hover{',
      '  background: linear-gradient(180deg, #ffffff, #f1f3f8);',
      '  box-shadow:',
      '    0 2px 4px rgba(0,0,0,.30),',
      '    0 8px 20px rgba(0,0,0,.25),',
      '    inset 0 .5px 0 #fff;',
      '}',
      SETTINGS_SCOPE + ' a[class*="linkButton"][class*="primary"]:active{',
      '  box-shadow: 0 1px 2px rgba(0,0,0,.35), inset 0 .5px 0 #fff;',
      '}',

      /* ---- Selector buttons: compact glass fields instead of solid slabs. ---- */
      SETTINGS_SCOPE + ' button[class*="selector"]{',
      '  height: 34px;',
      '  border-radius: 10px;',
      '  padding: 0 12px;',
      '  gap: 10px;',
      '  font-size: 13px;',
      '  color: rgba(249,250,251,.90);',
      '  background: rgba(255,255,255,.05);',
      '  border: .5px solid rgba(255,255,255,.10);',
      '  box-shadow: inset 0 .5px 0 rgba(255,255,255,.07);',
      '  transition: background-color .15s ease, border-color .15s ease;',
      '}',
      SETTINGS_SCOPE + ' button[class*="selector"]:hover:not(:disabled){',
      '  background: rgba(255,255,255,.085);',
      '  border-color: rgba(255,255,255,.16);',
      '}',
      SETTINGS_SCOPE + ' button[class*="selector"] svg{',
      '  opacity: .55;',
      '  transition: opacity .15s ease;',
      '}',
      SETTINGS_SCOPE + ' button[class*="selector"]:hover svg{ opacity: .9; }',

      /* ---- Theme cubes: quiet unselected panes, a clearly lit selected pane. ---- */
      SETTINGS_SCOPE + ' button[class*="themeCube"]{',
      '  flex: 1 1 150px;',
      '  min-width: 0;',
      '  border-radius: 16px;',
      '  background: rgba(255,255,255,.035);',
      '  border: .5px solid rgba(255,255,255,.10);',
      '  transition: background-color .16s ease, border-color .16s ease, box-shadow .16s ease;',
      '}',
      SETTINGS_SCOPE + ' button[class*="themeCube"]:hover:not([class*="selected"]){',
      '  background: rgba(255,255,255,.06);',
      '  border-color: rgba(255,255,255,.16);',
      '}',
      SETTINGS_SCOPE + ' button[class*="themeCube"][class*="selected"]{',
      '  background: linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.045));',
      '  border-color: rgba(255,255,255,.26);',
      '  box-shadow: inset 0 .5px 0 rgba(255,255,255,.12), 0 1px 2px rgba(0,0,0,.20);',
      '}',

      /* ---- Numeric stepper ---- */
      SETTINGS_SCOPE + ' [class*="stepper"]{',
      '  border-radius: 10px;',
      '  background: rgba(255,255,255,.05);',
      '  border: .5px solid rgba(255,255,255,.10);',
      '}',

      /* ---- Switches: keep the shipped thumb, give the track real contrast. ---- */
      SETTINGS_SCOPE + ' [role="switch"]{',
      '  background: rgba(255,255,255,.13);',
      '  box-shadow: inset 0 0 0 .5px rgba(255,255,255,.16), inset 0 1px 2px rgba(0,0,0,.25);',
      '  transition: background-color .18s ease, box-shadow .18s ease;',
      '}',
      SETTINGS_SCOPE + ' [role="switch"][aria-checked="true"]{',
      '  background: linear-gradient(180deg, #ffffff, #e7eaf0);',
      '  box-shadow:',
      '    0 0 0 .5px rgba(255,255,255,.50),',
      '    0 1px 4px rgba(0,0,0,.30),',
      '    inset 0 .5px 0 #fff;',
      '}',
      SETTINGS_SCOPE + ' [role="switch"] > span{',
      '  box-shadow: 0 1px 2px rgba(0,0,0,.35);',
      '}',

      /* ---- Text fields ---- */
      SETTINGS_SCOPE + ' input:not([type="checkbox"]):not([type="radio"]):not([type="range"]),',
      SETTINGS_SCOPE + ' textarea,',
      SETTINGS_SCOPE + ' select{',
      '  border-radius: 10px;',
      '  background: rgba(255,255,255,.045);',
      '  box-shadow: inset 0 0 0 .5px rgba(255,255,255,.10);',
      '  caret-color: var(--dsw-alias-label-primary);',
      '}',

      /* ---- Row rules: a quieter rhythm than the shipped 12% hairlines. ---- */
      SETTINGS_SCOPE + ' [class*="_row"]{ border-bottom-color: rgba(255,255,255,.07); }',

      /* ---- Scrollbar inside the content column ---- */
      SETTINGS_SCOPE + ' [class*="options"]::-webkit-scrollbar{ width: 10px; }',
      SETTINGS_SCOPE + ' [class*="options"]::-webkit-scrollbar-track{ background: transparent; }',
      SETTINGS_SCOPE + ' [class*="options"]::-webkit-scrollbar-thumb{',
      '  background: rgba(255,255,255,.10);',
      '  border: 3px solid transparent;',
      '  background-clip: padding-box;',
      '  border-radius: 999px;',
      '}',
      SETTINGS_SCOPE + ' [class*="options"]::-webkit-scrollbar-thumb:hover{',
      '  background: rgba(255,255,255,.16);',
      '  background-clip: padding-box;',
      '}',

      /* ---- A monochrome focus ring that belongs to this surface. ---- */
      SETTINGS_SCOPE + ' > nav button:focus-visible,',
      SETTINGS_SCOPE + ' a[class*="linkButton"]:focus-visible,',
      SETTINGS_SCOPE + ' button[class*="selector"]:focus-visible,',
      SETTINGS_SCOPE + ' button[class*="themeCube"]:focus-visible,',
      SETTINGS_SCOPE + ' > div > div:has(> [class*="actions"]) > button:focus-visible{',
      '  outline: 2px solid color-mix(in srgb, var(--dsw-alias-label-primary) 55%, transparent);',
      '  outline-offset: 2px;',
      '}',

      /* ---- Menu popovers: the sheet's dark glass instead of a pale blue-grey pane. ---- */
      SETTINGS_ROOT + ' [data-menu-material="translucent"]{',
      '  --dsw-menu-surface-fill: color-mix(in srgb, var(--dsw-specific-sidebar-fill) 74%, transparent);',
      /* lift the surface's isolation so the inner material can blur the page behind it */
      '  isolation: auto;',
      '}',

      /* ---- Hover cards: same dark glass as the menu popovers. ---- */
      SETTINGS_ROOT + ' body > [class*="_card_"]{',
      '  --dsw-hovercard-bg: color-mix(in srgb, var(--dsw-specific-sidebar-fill) 74%, transparent);',
      '  -webkit-backdrop-filter: blur(40px) saturate(150%);',
      '  backdrop-filter: blur(40px) saturate(150%);',
      '}',

      /* ---- Tooltip bubbles: the flat chip becomes a small pane of the same glass. ---- */
      SETTINGS_ROOT + ' [role="tooltip"]{',
      '  background: color-mix(in srgb, var(--dsw-specific-sidebar-fill) 78%, transparent);',
      '  -webkit-backdrop-filter: blur(24px) saturate(150%);',
      '  backdrop-filter: blur(24px) saturate(150%);',
      '  box-shadow: 0 6px 18px rgba(0,0,0,.28), inset 0 .5px 0 rgba(255,255,255,.10);',
      '}',

      /* ---- Reduced transparency: solid, high-contrast fallbacks. ---- */
      '@media (prefers-reduced-transparency: reduce){',
      '  ' + SETTINGS_MASK + '{',
      '    background: rgba(0,0,0,.66);',
      '    -webkit-backdrop-filter: none;',
      '    backdrop-filter: none;',
      '  }',
      '  ' + SETTINGS_SCOPE + '{',
      '    background: var(--dsw-alias-bg-layer-2);',
      '    -webkit-backdrop-filter: none;',
      '    backdrop-filter: none;',
      '  }',
      '  ' + SETTINGS_SCOPE + ' > nav{ background: var(--dsw-specific-sidebar-fill); }',
      '  ' + SETTINGS_SCOPE + ' :is([class*="card"], [class*="Card"]):not(:is([class*="card"] *, [class*="Card"] *)),',
      '  ' + SETTINGS_SCOPE + ' button[class*="selector"],',
      '  ' + SETTINGS_SCOPE + ' button[class*="themeCube"],',
      '  ' + SETTINGS_SCOPE + ' input,',
      '  ' + SETTINGS_SCOPE + ' textarea,',
      '  ' + SETTINGS_SCOPE + ' select{',
      '    background: var(--dsw-alias-bg-layer-1);',
      '    -webkit-backdrop-filter: none;',
      '    backdrop-filter: none;',
      '  }',
      '  ' + SETTINGS_SCOPE + ' a[class*="linkButton"]{ background: var(--dsw-alias-bg-layer-1); }',
      '  ' + SETTINGS_SCOPE + ' [role="switch"][aria-checked="true"]{',
      '    background: var(--dsw-alias-brand-primary);',
      '  }',
      '  ' + SETTINGS_ROOT + ' [data-menu-material="translucent"]{',
      '    --dsw-menu-surface-fill: var(--dsw-alias-bg-overlay);',
      '    --dsw-menu-backdrop-filter: none;',
      '    -webkit-backdrop-filter: none;',
      '    backdrop-filter: none;',
      '  }',
      '  ' + SETTINGS_ROOT + ' body > [class*="_card_"]{',
      '    --dsw-hovercard-bg: var(--dsw-alias-bg-layer-2);',
      '    -webkit-backdrop-filter: none;',
      '    backdrop-filter: none;',
      '  }',
      '  ' + SETTINGS_ROOT + ' [role="tooltip"]{',
      '    background: var(--dsw-alias-bg-overlay);',
      '    -webkit-backdrop-filter: none;',
      '    backdrop-filter: none;',
      '  }',
      '}',
    ].join('\n');

    function IconUser() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' },
        h('circle', { cx: 8, cy: 5.25, r: 2.75, stroke: 'currentColor', strokeWidth: 1.4 }),
        h('path', {
          d: 'M2.75 14c0-2.9 2.35-5.25 5.25-5.25S13.25 11.1 13.25 14',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinecap: 'round',
        }),
      );
    }

    /** Decorative clock glyph for the Tasks panel row; the sidebar owns its label. */
    function TasksIcon({ size }) {
      const edge = Number.isFinite(size) && size > 0 ? size : 16;
      return h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: edge,
          height: edge,
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('circle', { cx: 8, cy: 8, r: 5.75, stroke: 'currentColor', strokeWidth: 1.3 }),
        h('path', {
          d: 'M8 4.75V8l2.25 1.5',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      );
    }

    /**
     * Show the plain catalog model name. The shipped temporary 1017 decorator
     * owns this single slot at default priority; a lower priority shadows it
     * while keeping the owner's own fallback text for every other model.
     */
    function ModelLabel({ model }) {
      return model && typeof model.name === 'string' ? model.name : null;
    }

    /** Account calls carry the same client identity the shipped account UI sends. */
    function accountClient(ctx) {
      const locale = ctx.get('locale');
      const active = locale && typeof locale.getSnapshot === 'function' ? locale.getSnapshot().active : 'en';
      return {
        version: CLIENT_VERSION,
        locale: active,
        timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60,
      };
    }

    /**
     * Observe the account state stream and read the profile whose name and
     * picture the launcher displays. The stream restarts after a transport end;
     * the latest profile read wins, and a failed read leaves the local fallback
     * on screen rather than showing the shipped generic account label.
     */
    function useAccountIdentity(ctx) {
      const [snapshot, setSnapshot] = React.useState({ view: undefined, profile: undefined });

      React.useEffect(() => {
        const remote = ctx.get('remote');
        const account = remote && remote.account;
        if (!account || typeof account.watch !== 'function') return undefined;

        let disposed = false;
        let controller;
        let retryTimer;
        let generation = 0;
        let wake;

        const readProfile = async () => {
          const current = ++generation;
          let profile = { status: 'failed' };
          try {
            const result = await account.getProfile(accountClient(ctx));
            profile = result && result.ok && result.value ? result.value : { status: 'failed' };
          } catch (error) {
            profile = { status: 'failed' };
          }
          if (disposed || current !== generation) return;
          setSnapshot((previous) => ({ ...previous, profile }));
        };

        const run = async () => {
          while (!disposed) {
            controller = new AbortController();
            try {
              for await (const frame of account.watch(controller.signal)) {
                if (disposed) return;
                const view =
                  frame && typeof frame === 'object' && frame.value !== undefined ? frame.value : frame;
                setSnapshot((previous) => ({ ...previous, view }));
                if (frame && typeof frame.accept === 'function') frame.accept();
                void readProfile();
              }
            } catch (error) {
              if (disposed) return;
            }
            if (disposed) return;
            await new Promise((resolve) => {
              wake = resolve;
              retryTimer = setTimeout(resolve, 1500);
            });
            retryTimer = undefined;
            wake = undefined;
          }
        };

        void run();
        void readProfile();
        return () => {
          disposed = true;
          generation++;
          if (controller) controller.abort();
          if (retryTimer) clearTimeout(retryTimer);
          if (wake) wake();
        };
      }, [ctx]);

      return snapshot;
    }

    function initialsOf(name) {
      const parts = String(name || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      if (parts.length === 1) {
        return Array.from(parts[0]).slice(0, 2).join('').toUpperCase();
      }
      return '';
    }

    function AccountLauncher(props) {
      const ctx = props.ctx;
      const t = typeof props.t === 'function' ? props.t : (key) => key;
      const wide = props.wide !== false;
      const { view, profile } = useAccountIdentity(ctx);
      const ready = profile && profile.status === 'ready' ? profile.value : undefined;
      const status = view && view.status;
      const signedOut = status === 'signed-out';
      const signedIn = status !== 'signed-out' && (status === 'credential-stored' || (!status && Boolean(ready)));
      const liveName = ready ? ready.name || '' : '';
      const displayName = signedOut ? t('signIn') : liveName || (signedIn ? t('account') : '');
      const avatarSrc = signedIn ? (ready && ready.avatarUrl) || '' : '';

      const [avatarFailed, setAvatarFailed] = React.useState(false);
      React.useEffect(() => {
        setAvatarFailed(false);
      }, [avatarSrc]);

      /*
       * The shipped account menu refreshed profile and balance when Settings
       * opened. Our launcher replaces that menu, so trigger the same refresh
       * from the account section's own inject face when Settings opens.
       */
      React.useEffect(() => {
        if (!props.settingsOpen) return;
        try {
          const entry = ctx.slots
            .entries('settings.section')
            .find((candidate) => candidate.options.id === 'account');
          const operations =
            entry && typeof entry.inject === 'function' ? entry.inject() : undefined;
          if (operations && typeof operations.refreshAccount === 'function') {
            void Promise.resolve(operations.refreshAccount()).catch(() => {});
          }
        } catch {}
      }, [ctx, props.settingsOpen]);

      const openSettings = () => {
        if (signedOut && typeof props.openOnboarding === 'function') {
          props.openOnboarding('deepseek-official');
          return;
        }
        if (typeof props.openSettings === 'function') props.openSettings();
      };

      const initials = signedIn ? initialsOf(liveName) : '';
      const avatar = h(
        'span',
        { className: 'dsh-identity-avatar', 'aria-hidden': 'true' },
        avatarSrc && !avatarFailed
          ? h('img', {
              src: avatarSrc,
              alt: '',
              referrerPolicy: 'no-referrer',
              draggable: false,
              onError: () => setAvatarFailed(true),
            })
          : initials
            ? h('span', { className: 'dsh-identity-initials' }, initials)
            : h(IconUser),
      );

      const accessibleName = displayName || t('menu');
      return h(
        'div',
        {
          className: 'dsh-identity-root',
          'data-collapsed': wide ? 'false' : 'true',
        },
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-identity-trigger',
            'aria-label': accessibleName,
            title: accessibleName,
            onClick: openSettings,
          },
          avatar,
          wide && displayName
            ? h('span', { className: 'dsh-identity-name' }, displayName)
            : null,
        ),
      );
    }

    function Empty() {
      return null;
    }

    return {
      inject: ['slots', 'locale', 'remote', 'remote.account'],
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.plugin = '@local/customized-ui';
          style.dataset.part = 'sidebar';
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => style.remove();
        }, 'customized-ui: sidebar styles');

        /*
         * The Workspaces header's three icon actions open tooltips on hover.
         * Capture-phase blockers keep the shipped Tooltip triggers from firing
         * while leaving clicks untouched; the header is identified by its
         * section label so other headers keep their tooltips.
         */
        ctx.effect(() => {
          const isHeaderAction = (target) => {
            if (!(target instanceof Element)) return false;
            const button = target.closest('button');
            if (button === null) return false;
            const header = button.closest('[class*="sectionHeader"]');
            return header !== null && header.querySelector('[class*="sectionLabel"]') !== null;
          };
          const blockHover = (event) => {
            if (isHeaderAction(event.target)) event.stopPropagation();
          };
          const hoverEvents = ['mouseover', 'pointerover', 'mouseenter', 'pointerenter'];
          for (const type of hoverEvents) document.addEventListener(type, blockHover, true);
          return () => {
            for (const type of hoverEvents) {
              document.removeEventListener(type, blockHover, true);
            }
          };
        }, 'customized-ui: quiet workspaces header tooltips');

        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.plugin = '@local/customized-ui';
          style.dataset.part = 'settings';
          style.textContent = SETTINGS_CSS;
          document.head.appendChild(style);
          return () => style.remove();
        }, 'customized-ui: settings styles');

        ctx.effect(() => ctx.locale.register(NS, { en, zh }), 'customized-ui: locale');

        /* The native account-info link itself becomes the Sign Out button. */
        ctx.effect(() => {
          const root = document.documentElement;
          const activeLocale = () => {
            const locale = ctx.get('locale');
            return locale && typeof locale.getSnapshot === 'function'
              ? locale.getSnapshot().active
              : 'en';
          };
          const isZh = (active) => String(active).toLowerCase().startsWith('zh');
          const labels = () => {
            const chinese = isZh(activeLocale());
            return {
              label: chinese ? zh.signOut : en.signOut,
              busy: chinese ? zh.signingOut : en.signingOut,
              confirm: chinese ? zh.signOutConfirm : en.signOutConfirm,
              failed: chinese ? zh.signOutFailedShort : en.signOutFailedShort,
            };
          };
          const applyLabels = () => {
            const current = labels();
            root.style.setProperty('--cu-signout-label', JSON.stringify(current.label));
            root.style.setProperty('--cu-signout-busy', JSON.stringify(current.busy));
            root.style.setProperty('--cu-signout-confirm', JSON.stringify(current.confirm));
            root.style.setProperty('--cu-signout-failed', JSON.stringify(current.failed));
          };

          const isDark = () =>
            root.getAttribute('data-ds-theme-source') === 'dark' ||
            document.body.hasAttribute('data-ds-dark-theme');

          let disposed = false;
          const timers = new Set();
          const later = (callback, delay) => {
            if (disposed) return 0;
            const id = setTimeout(() => {
              timers.delete(id);
              callback();
            }, delay);
            timers.add(id);
            return id;
          };

          const stateLabel = (anchor) => {
            const current = labels();
            const state = anchor.getAttribute('data-customized-state');
            if (state === 'signing-out') return current.busy;
            if (state === 'failed') return current.failed;
            if (state === 'confirm') return current.confirm;
            return current.label;
          };

          let confirmTimer;
          let confirmAnchor;

          const clearConfirm = (anchor, restoreLabel) => {
            if (confirmTimer) {
              clearTimeout(confirmTimer);
              timers.delete(confirmTimer);
              confirmTimer = undefined;
            }
            if (confirmAnchor === anchor) confirmAnchor = undefined;
            if (!anchor) return;
            if (anchor.getAttribute('data-customized-state') === 'confirm') {
              anchor.removeAttribute('data-customized-state');
            }
            if (restoreLabel && anchor.isConnected) {
              const label = stateLabel(anchor);
              if (anchor.getAttribute('aria-label') !== label) anchor.setAttribute('aria-label', label);
            }
          };

          const sync = () => {
            const panel = document.querySelector('[data-shortcut-modal="settings"]');
            if (!panel) return;
            const anchor = panel.querySelector('a[class*="accountInfo"]');
            if (!anchor) return;
            if (!isDark()) {
              if (confirmAnchor) clearConfirm(confirmAnchor, false);
              if (anchor.dataset.customizedSignout === 'true') {
                delete anchor.dataset.customizedSignout;
                anchor.removeAttribute('role');
                anchor.removeAttribute('aria-label');
              }
              anchor.removeAttribute('data-customized-state');
              anchor.removeAttribute('aria-disabled');
              return;
            }
            if (anchor.dataset.customizedSignout !== 'true') {
              anchor.dataset.customizedSignout = 'true';
              anchor.setAttribute('role', 'button');
            }
            const label = stateLabel(anchor);
            if (anchor.getAttribute('aria-label') !== label) anchor.setAttribute('aria-label', label);
          };

          const finish = (anchor, state, delay) => {
            later(() => {
              if (!anchor.isConnected) return;
              if (anchor.getAttribute('data-customized-state') !== state) return;
              anchor.removeAttribute('data-customized-state');
              anchor.removeAttribute('aria-disabled');
              const label = stateLabel(anchor);
              if (anchor.getAttribute('aria-label') !== label) anchor.setAttribute('aria-label', label);
            }, delay);
          };

          const signOut = async (anchor) => {
            anchor.setAttribute('data-customized-state', 'signing-out');
            anchor.setAttribute('aria-disabled', 'true');
            anchor.setAttribute('aria-label', labels().busy);
            try {
              const remote = ctx.get('remote');
              const account = remote && remote.account;
              if (!account || typeof account.signOut !== 'function') {
                throw new Error('sign out unavailable');
              }
              const result = await account.signOut(accountClient(ctx));
              if (result && result.ok === false) throw new Error('sign out refused');
            } catch (error) {
              if (disposed || !anchor.isConnected) return;
              anchor.removeAttribute('aria-disabled');
              anchor.setAttribute('data-customized-state', 'failed');
              anchor.setAttribute('aria-label', labels().failed);
              finish(anchor, 'failed', 2400);
              return;
            }
            if (disposed) return;
            finish(anchor, 'signing-out', 4000);
          };

          const activate = (anchor) => {
            const state = anchor.getAttribute('data-customized-state');
            if (state === 'signing-out') return;
            if (state === 'confirm') {
              clearConfirm(anchor, false);
              void signOut(anchor);
              return;
            }
            if (confirmAnchor) clearConfirm(confirmAnchor, true);
            anchor.setAttribute('data-customized-state', 'confirm');
            anchor.setAttribute('aria-label', labels().confirm);
            confirmAnchor = anchor;
            confirmTimer = later(() => clearConfirm(anchor, true), 4000);
          };

          const intercept = (event) => {
            if (!isDark() || event.button !== 0) return;
            const target =
              event.target instanceof Element
                ? event.target.closest('a[class*="accountInfo"]')
                : null;
            if (!target || !target.closest('[data-shortcut-modal="settings"]')) return;
            event.preventDefault();
            event.stopPropagation();
            activate(target);
          };

          const cancelConfirm = (event) => {
            if (!confirmAnchor) return;
            if (event.type === 'pointerdown') {
              if (event.target instanceof Node && confirmAnchor.contains(event.target)) return;
            } else if (event.type === 'keydown' && event.key !== 'Escape') {
              return;
            }
            clearConfirm(confirmAnchor, true);
          };

          const onKeyDown = (event) => {
            if (event.key === 'Escape') {
              cancelConfirm(event);
              return;
            }
            if (event.repeat) return;
            if (event.key !== ' ' && event.key !== 'Spacebar' && event.key !== 'Enter') return;
            if (!(event.target instanceof Element)) return;
            const target = event.target.closest('a[class*="accountInfo"]');
            if (!target || !target.closest('[data-shortcut-modal="settings"]') || !isDark()) return;
            event.preventDefault();
            activate(target);
          };

          let frame = 0;
          const scheduleSync = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
              frame = 0;
              sync();
            });
          };

          const observer = new MutationObserver(scheduleSync);
          observer.observe(document.body, { childList: true, subtree: true });
          const themeObserver = new MutationObserver(scheduleSync);
          themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-ds-theme-source'],
          });
          themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-ds-dark-theme'],
          });

          applyLabels();
          sync();
          const locale = ctx.get('locale');
          const unsubscribe =
            locale && typeof locale.subscribe === 'function'
              ? locale.subscribe(() => {
                  applyLabels();
                  scheduleSync();
                })
              : undefined;

          document.addEventListener('click', intercept, true);
          document.addEventListener('pointerdown', cancelConfirm, true);
          document.addEventListener('keydown', onKeyDown, true);
          return () => {
            disposed = true;
            observer.disconnect();
            themeObserver.disconnect();
            if (frame) cancelAnimationFrame(frame);
            for (const id of timers) clearTimeout(id);
            timers.clear();
            document.removeEventListener('click', intercept, true);
            document.removeEventListener('pointerdown', cancelConfirm, true);
            document.removeEventListener('keydown', onKeyDown, true);
            unsubscribe?.();
            root.style.removeProperty('--cu-signout-label');
            root.style.removeProperty('--cu-signout-busy');
            root.style.removeProperty('--cu-signout-confirm');
            root.style.removeProperty('--cu-signout-failed');
          };
        }, 'customized-ui: account sign out');

        const hidden = -1;
        /* Shadow a shipped seat with an empty cell; a list cell reuses its shipped id. */
        const emptySeat = (name, id) =>
          ctx.slots.inject(name, () =>
            ctx.slots.register(
              id ? { name, id, priority: hidden } : { name, priority: hidden },
              Empty,
            ),
          );

        emptySeat('sidebar.brand.mark');
        emptySeat('sidebar.brand.name');
        emptySeat('settings.action', 'open-document');
        ctx.slots.inject('conversation.input.model.label', () =>
          ctx.slots.register(
            { name: 'conversation.input.model.label', priority: hidden },
            ModelLabel,
          ),
        );
        const t = ctx.locale.bind(NS);
        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: 'schedules',
              order: 10,
              priority: hidden,
              label: () => t('tasks'),
            },
            TasksIcon,
          ),
        );
        ctx.slots.inject('settings.launcher', () =>
          ctx.slots.register(
            { name: 'settings.launcher', priority: hidden, locale: NS },
            (props) => h(AccountLauncher, { ...props, ctx }),
          ),
        );
      },
    };
  },
});
