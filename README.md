# SOKR Design System

Shared UI components and patterns for SOKR-related apps.

This document currently covers:

- Buttons
- MultiSelect
- PeopleSelect (people picker)
- PersonChip (people chip/badge)
- Layout shell & navigation (AppShell, Sidebar, SidebarNav, TopBar)
- EnvironmentBadge
- Card

---

## Button

`Button` is a styled wrapper around the native `<button>` with variants that match the SOKR app.

**Import**

```ts
import { Button } from "@sokr/design-system";
```

**Props (simplified)**

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary" // alias for "default" (main action)
    | "secondary"
    | "outline"
    | "ghost"
    | "default"
    | "destructive"
    | "link"
    | "sokr-primary"
    | "sokr-secondary"
    | "sokr-cta"
    | "sokr-filter-selected"
    | "sokr-ai";
}
```

**Core usage**

```tsx
// "default" and "primary" map to the same main action style
<Button>Save</Button>
<Button variant="default">Save</Button>
<Button variant="primary">Save</Button>

<Button variant="secondary">Secondary</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Low emphasis</Button>
<Button variant="link">Inline link-style action</Button>
```

Use `default`/`primary` for main actions, `secondary` or `outline` for secondary actions, `ghost` for low‑emphasis actions, and `link` for inline textual actions.

**SOKR-specific variants**

These mirror the SOKR style‑guide at `/style-guide/buttons` in the main app.

```tsx
// Marketing / hero CTAs
<Button variant="sokr-primary">Primary CTA</Button>
<Button variant="sokr-secondary">Secondary CTA</Button>
<Button variant="sokr-cta">Call to action</Button>

// Filter / toggle selected state
<Button variant="sokr-filter-selected">Selected filter</Button>

// AI button (animated style supplied by the host app CSS)
<Button variant="sokr-ai">SOKR AI</Button>
```

`sokr-ai` expects the host app to include the `sokr-ai-button` + optional `is-working` utility classes from the main SOKR stylesheet.

---

## MultiSelect

`MultiSelect` is a generic, text‑searchable multi‑select dropdown. It does not know about people; it works with any options.

**Import**

```ts
import { MultiSelect } from "@sokr/design-system";
```

**Props (simplified)**

```ts
interface MultiSelectOption {
  value: string;
  label: React.ReactNode;
  searchText?: string; // used for filtering
}

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  loading?: boolean;
  className?: string;
}
```

**Usage**

```tsx
const [values, setValues] = useState<string[]>([]);

<MultiSelect
  value={values}
  onChange={setValues}
  options={[
    { value: "opt-1", label: "Option One", searchText: "option one" },
    { value: "opt-2", label: "Option Two", searchText: "option two" },
  ]}
  placeholder="Select options"
/>
```

Use `MultiSelect` whenever you need a generic multi‑select with search.

---

## PeopleSelect (People Picker)

`PeopleSelect` is a **people picker** built on top of `MultiSelect`. It renders options with avatars and names.

**Import**

```ts
import { PeopleSelect } from "@sokr/design-system";
```

**Props (simplified)**

```ts
interface PeopleSelectOption {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string | null;
  isCurrentUser?: boolean;
}

interface PeopleSelectProps {
  options: PeopleSelectOption[];
  value: string[];              // selected person IDs
  onChange: (ids: string[]) => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}
```

**Usage**

```tsx
const [assignees, setAssignees] = useState<string[]>([]);

<PeopleSelect
  options={members.map(m => ({
    id: m.id,
    name: m.name,
    email: m.email,
    avatarUrl: m.avatar,
    isCurrentUser: m.id === currentUserId,
  }))}
  value={assignees}
  onChange={setAssignees}
  placeholder="Select people"
/>
```

Use `PeopleSelect` in any SOKR app when you need a **multi‑person picker** with consistent visuals.

---

## PersonChip (People Chip / Badge)

`PersonChip` is a small pill used to represent a person: avatar + name. It is visual‑only; it does not fetch data.

**Import**

```ts
import { PersonChip } from "@sokr/design-system";
```

**Props**

```ts
export type PersonChipSize = "sm" | "md" | "lg";
export type PersonChipVariant = "default" | "selected" | "muted";

interface PersonChipProps {
  id?: string;
  name: string;
  avatarUrl?: string | null;
  initials?: string;
  size?: PersonChipSize;        // default "sm"
  variant?: PersonChipVariant;  // default "default"
  className?: string;
  showName?: boolean;           // default true
  onClick?: () => void;
}
```

**Usage**

```tsx
<PersonChip
  name="Sandilya Venkatesh"
  avatarUrl="/path/to/avatar.jpg"
  size="sm"
  variant="default"
/>

<PersonChip
  name="Alex Johnson"
  size="md"
  variant="selected"
  onClick={() => console.log("Chip clicked")}
/>

<PersonChip
  name="Priya N"
  initials="PN"
  size="sm"
  variant="muted"
  showName={false} // avatar‑only chip
/>
```

Use `PersonChip` anywhere you need a compact, consistent representation of a person (e.g., in lists, cards, or inline next to tasks).

---

## Layout & Navigation

These components define a standard page chrome for SOKR apps: sidebar on the left, top bar at the top, and main content area.

### AppShell

High‑level layout shell that arranges an optional sidebar and top bar around your main content.

**Import**

```ts
import { AppShell } from "@sokr/design-system";
```

**Props**

```ts
interface AppShellProps {
  sidebar?: React.ReactNode;  // left column
  topBar?: React.ReactNode;   // header above content
  children: React.ReactNode;  // main content
}
```

**Usage**

```tsx
<AppShell
  sidebar={<Sidebar>...nav...</Sidebar>}
  topBar={<TopBar title="Dashboard" rightSlot={<EnvironmentBadge label="STAGING" />} />}
>
  <main className="p-4 md:p-6 lg:p-8">
    {/* page content here */}
  </main>
</AppShell>
```

### Sidebar

Vertical container for navigation and workspace controls.

**Import**

```ts
import { Sidebar } from "@sokr/design-system";
```

**Props**

```ts
interface SidebarProps {
  children: React.ReactNode;
  collapsed?: boolean; // default false; controls width (w-64 vs w-16)
}
```

**Usage**

```tsx
<Sidebar collapsed={false}>
  <div className="p-3 font-bold">SOKR</div>
  <SidebarNav>
    {/* nav items here */}
  </SidebarNav>
</Sidebar>
```

### SidebarNav & SidebarNavItem

`SidebarNav` is a simple vertical stack; `SidebarNavItem` is the clickable row.

**Import**

```ts
import { SidebarNav, SidebarNavItem } from "@sokr/design-system";
```

**Props (simplified)**

```ts
interface SidebarNavItemProps {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  asChild?: boolean;        // render inside a custom link component
  children?: React.ReactNode;
}

interface SidebarNavProps {
  children: React.ReactNode;
  className?: string;
}
```

**Usage**

```tsx
<SidebarNav>
  <SidebarNavItem
    label="Dashboard"
    active={currentRoute === "/dashboard"}
    onClick={() => navigate("/dashboard")}
  />
  <SidebarNavItem
    label="Things to do"
    active={currentRoute === "/things-to-do"}
    onClick={() => navigate("/things-to-do")}
  />
</SidebarNav>
```

If you need to integrate with a router link component, use `asChild` and pass your own element as `children`.

### TopBar

Simple page header with a title on the left and an optional right slot (e.g. buttons, environment badge, user menu).

**Import**

```ts
import { TopBar } from "@sokr/design-system";
```

**Props**

```ts
interface TopBarProps {
  title: string;
  rightSlot?: React.ReactNode;
}
```

**Usage**

```tsx
<TopBar
  title="My Focus"
  rightSlot={
    <div className="flex items-center gap-2">
      <EnvironmentBadge label="STAGING" />
      <Button variant="primary">New Objective</Button>
    </div>
  }
/>
```

---

## EnvironmentBadge

Small label used to show environment (e.g. STAGING, DEV) in headers.

**Import**

```ts
import { EnvironmentBadge } from "@sokr/design-system";
```

**Props**

```ts
interface EnvironmentBadgeProps {
  label: string;
}
```

**Usage**

```tsx
<EnvironmentBadge label="STAGING" />
```

Use this wherever you want to consistently indicate the current environment.

---

## Card

Simple panel/card container used for settings, detail sections, and style‑guide blocks.

**Import**

```ts
import { Card } from "@sokr/design-system";
```

**Props**

```ts
interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "selected"; // controls background & border emphasis
}
```

**Usage**

```tsx
<Card title="Workspace Settings">
  <p className="text-sm text-muted-foreground">
    Configure workspace name, default objective types, and more.
  </p>
</Card>

<Card
  title="Current Objective"
  variant="selected"
  className="mt-4"
>
  {/* highlighted card */}
</Card>
```

Use `variant="selected"` to visually emphasize the current or focused item.

---

## Using These Components in Other SOKR Apps

1. **Install the design system** in your app:

```bash
npm install @sokr/design-system
```

2. **Ensure your app includes the shared Tailwind / CSS setup**
   The components assume SOKR‑style Tailwind classes and CSS variables (e.g. `bg-background`, `text-muted-foreground`). Your app should share the same base Tailwind config and global styles as the main SOKR app.

3. **Build person data in your app**, then pass it to `PeopleSelect` / `PersonChip`:

```tsx
import { PeopleSelect, PersonChip } from "@sokr/design-system";

const members = [
  { id: "u-1", name: "Alex Johnson", email: "alex@example.com", avatarUrl: "/avatars/alex.jpg" },
  { id: "u-2", name: "Priya N", email: "priya@example.com", avatarUrl: "/avatars/priya.jpg" },
];

const [selectedIds, setSelectedIds] = useState<string[]>([]);

<PeopleSelect
  options={members}
  value={selectedIds}
  onChange={setSelectedIds}
/>

<div className="flex gap-2 mt-4">
  {members.map(m => (
    <PersonChip
      key={m.id}
      name={m.name}
      avatarUrl={m.avatarUrl}
      size="sm"
      variant={selectedIds.includes(m.id) ? "selected" : "default"}
    />
  ))}
</div>
```

With this setup, all SOKR‑related apps can share the same button styles, multi‑select interactions, and people chips/pickers, while keeping data fetching and business logic inside each app.

---

## Shared Theme Tokens & Global Styles

The design system exposes the **same CSS variables (design tokens)** used by the main SOKR app so that apps like AiCRM can match the visual style exactly.

### 1. How the tokens are provided

The package-level stylesheet `@sokr/design-system/styles.css` imports two files:

- `src/tokens.css` – defines the `:root { --primary, --card, --radius, ... }` variables copied from SOKR
- `src/styles.css` – component-specific classes (e.g. `.sokr-btn`)

When your app imports `@sokr/design-system/styles.css`, all the core SOKR theme tokens are attached to `:root` and are available to any components that rely on them.

### 2. How to use the tokens in a consuming app (e.g. AiCRM)

1. Install the design system (if not already):

   ```bash
   npm install @sokr/design-system
   ```

2. Import the shared stylesheet once in your app's global CSS file (for example, `src/styles/globals.css` or `src/app/globals.css`):

   ```css
   @import "@sokr/design-system/styles.css";
   ```

   This ensures that:
   - The full SOKR token set is available on `:root` (e.g. `--primary`, `--primary-foreground`, `--card`, `--radius`, etc.).
   - All design-system components (`Button`, `Card`, `MultiSelect`, `PeopleSelect`, etc.) render with the **same colors, borders, radii, and spacing** as in the SOKR app.

3. Use components from the design system as usual:

   ```tsx
   import { Button, Card, MultiSelect, PeopleSelect } from "@sokr/design-system";

   function Example() {
     return (
       <Card>
         <Card title="Example">
           <MultiSelect value={[]} onChange={() => {}} options={[]} />
           <PeopleSelect value={[]} onChange={() => {}} options={[]} />
           <Button variant="primary">Save</Button>
         </Card>
       </Card>
     );
   }
   ```

As long as your app imports `@sokr/design-system/styles.css`, you do **not** need to redefine any of the shared CSS variables. They are already set to the canonical values from SOKR.

> Note: If a future app needs a different look, it can optionally override specific CSS variables *after* importing `@sokr/design-system/styles.css`, but for AiCRM and other SOKR-branded apps, you should keep the defaults to maintain visual parity.
