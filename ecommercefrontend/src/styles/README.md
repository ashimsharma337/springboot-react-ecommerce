# Accessibility and WCAG notes

This folder contains the shared visual tokens in [`_tokens.scss`](./_tokens.scss)
and the storefront's global, responsive styles in [`main.scss`](./main.scss).
The styles support accessibility in the React UI, but CSS alone does not make an
interface accessible. Semantic markup, interaction behavior, content, and
testing all contribute.

## Practices currently used

### Keyboard access and focus

- Interactive links, buttons, and inputs retain native keyboard behavior.
- Global styles provide a visible `:focus-visible` outline for links, buttons,
  and inputs.
- The mobile navigation button exposes its state with `aria-expanded`, has a
  changing accessible name, and opens keyboard-operable navigation links.
- The keynote dialog receives initial focus, supports Escape to close, cycles
  Tab focus through its controls, and returns focus to the invoking control
  when closed.
- The product-detail information tabs expose tab, tab-list, and tab-panel
  relationships and support arrow-key navigation as well as Home and End.
- The search field supports the `Ctrl+K` and `⌘K` shortcuts. The shortcut
  supplements rather than replaces its visible, labeled input.

These are intended to support WCAG 2.2 criteria **2.1.1 Keyboard**, **2.1.2 No
Keyboard Trap**, **2.4.3 Focus Order**, and **2.4.7 Focus Visible**. The focus
indicator's contrast and size have not been formally measured against WCAG
success criteria.

### Structure and accessible names

- Page areas use semantic elements such as `header`, `nav`, `main`, `section`,
  `article`, and `footer`, with a heading hierarchy and section labels.
- Form controls have labels or accessible names. Decorative icons are hidden
  from assistive technology, while icon-only controls have an accessible name.
- Product images have descriptive alternative text. Category images are
  decorative within links whose text provides the category name.
- The keynote uses dialog semantics and a programmatic title. Cart updates,
  empty search results, and newsletter confirmation use status announcements.

These practices support the intent of WCAG **1.1.1 Non-text Content**,
**1.3.1 Info and Relationships**, **2.4.6 Headings and Labels**, **4.1.2 Name,
Role, Value**, and **4.1.3 Status Messages**.

### Responsive presentation and motion

- Layouts adapt to narrow viewports, and the project has been checked for
  horizontal overflow at widths from 320px through desktop sizes.
- The stylesheet honors `prefers-reduced-motion` by disabling most animation
  and transition effects.
- Text is styled with relative and responsive sizing rather than being embedded
  in images.

These choices support WCAG **1.4.4 Resize Text**, **1.4.10 Reflow**, and
**2.3.3 Animation from Interactions**. Responsive checks are not a substitute
for verifying text zoom or reflow with browser zoom and assistive technology.

## Color tokens

[`_tokens.scss`](./_tokens.scss) centralizes the brand and surface colors so
they can be reviewed and adjusted consistently:

| Token | Value | Intended use |
| --- | --- | --- |
| `$primary` | `#004ac6` | Primary actions and links |
| `$ink` | `#0b1c30` | Main text and dark surfaces |
| `$ink-subtle` | `#434655` | Secondary text |
| `$muted` | `#646c7a` | Supporting text and labels |
| `$surface` | `#f8f9ff` | Page background |
| `$surface-tint` | `#eff4ff` | Tinted section and input background |
| `$surface-high` | `#dce9ff` | Highlighted surfaces |
| `$surface-white` | `#fff` | Cards and primary surfaces |

Use the shared tokens instead of introducing one-off colors. WCAG contrast
requirements depend on the foreground/background pairing, text size, and
whether a color conveys information; a token value by itself does not establish
conformance. The palette and focus indicators still need measured contrast
verification in their rendered combinations.

## Known verification limits

The project has not had a complete WCAG conformance audit. Before claiming a
conformance level, test the rendered application for at least:

- Text and non-text contrast, including focus indicators and status colors,
  against WCAG 2.2 **1.4.3**, **1.4.11**, and **2.4.11**.
- Browser text resizing and reflow at 200% and 400% zoom.
- Keyboard-only use and focus order across every control and dialog.
- Screen-reader announcements, including search result changes and form errors.
- Touch target sizing and spacing under **2.5.8 Target Size (Minimum)**.
- The existing login dialog's focus behavior and accessible labeling.

Treat these notes as implementation guidance, not a declaration of WCAG
conformance. Update this document when accessibility behavior or shared tokens
change, and record test methods and results before making conformance claims.
