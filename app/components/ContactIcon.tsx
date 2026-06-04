import type React from "react";

type ContactIconName = "email" | "phone" | "whatsapp" | "location" | "website" | "instagram" | "facebook";

const paths: Record<ContactIconName, React.ReactNode> = {
  email: (
    <>
      <path d="M4 7.5h16v10H4z" />
      <path d="m4 8 8 5.5L20 8" />
    </>
  ),
  phone: (
    <path d="M8.2 4.8 10 8.7l-1.5 1.2c.9 1.9 2.4 3.4 4.4 4.4l1.2-1.5 3.9 1.8-.7 3.3c-.2.8-.9 1.3-1.7 1.3C9.6 19.2 4.8 14.4 4.8 8.4c0-.8.5-1.5 1.3-1.7z" />
  ),
  whatsapp: (
    <>
      <path d="M5.1 19 6 15.8a7 7 0 1 1 2.4 2.3z" />
      <path d="M9.2 8.5c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c.7 1.2 1.6 2.1 2.9 2.6l.6-.7c.2-.2.4-.3.7-.2l1.5.7c.3.1.4.3.4.6v.4c0 .5-.4.9-.8 1.1-.7.3-2.9.2-5.3-2.1-2.3-2.3-2.6-4.5-2.3-5.2z" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <path d="M12 13.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z" />
    </>
  ),
  website: (
    <>
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
      <path d="M4.5 12h15" />
      <path d="M12 4c2 2.2 3 4.8 3 8s-1 5.8-3 8c-2-2.2-3-4.8-3-8s1-5.8 3-8z" />
    </>
  ),
  instagram: (
    <>
      <path d="M7.5 4.8h9A2.7 2.7 0 0 1 19.2 7.5v9a2.7 2.7 0 0 1-2.7 2.7h-9a2.7 2.7 0 0 1-2.7-2.7v-9a2.7 2.7 0 0 1 2.7-2.7z" />
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" />
      <path d="M16.8 7.2h.01" />
    </>
  ),
  facebook: (
    <path d="M14 8.2h2V5h-2.4c-2.7 0-4.1 1.6-4.1 4v2H7v3.2h2.5V21H13v-6.8h2.5L16 11h-3V9.3c0-.7.3-1.1 1-1.1z" />
  ),
};

export default function ContactIcon({ name }: { name: ContactIconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
