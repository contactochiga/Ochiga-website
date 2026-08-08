"use client";

import type { ChangeEvent } from "react";

const inputClass =
  "w-full rounded border border-ochiga-white/15 bg-transparent px-4 py-3 text-base text-ochiga-white placeholder:text-ochiga-white/30 focus:border-ochiga-red focus:outline-none";
const labelClass = "mb-2 block text-sm font-medium text-ochiga-white/80";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-ochiga-red-bright">
      {message}
    </p>
  );
}

export function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  autoComplete,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  maxLength?: number;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {required ? <span className="text-ochiga-red" aria-hidden>*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className={inputClass}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  rows = 5,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  rows?: number;
  maxLength?: number;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {required ? <span className="text-ochiga-red" aria-hidden>*</span> : null}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        rows={rows}
        maxLength={maxLength}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} resize-y`}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required,
  error,
  placeholder = "Select…",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {required ? <span className="text-ochiga-red" aria-hidden>*</span> : null}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} appearance-none`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-ochiga-black">
            {option}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function RadioGroupField({
  id,
  label,
  value,
  onChange,
  options,
  required,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className={labelClass}>
        {label} {required ? <span className="text-ochiga-red" aria-hidden>*</span> : null}
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const optionId = `${id}-${option.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <label
              key={option}
              htmlFor={optionId}
              className={`cursor-pointer rounded border px-4 py-2.5 text-sm transition-colors duration-fast ${
                value === option
                  ? "border-ochiga-red bg-ochiga-red/10 text-ochiga-white"
                  : "border-ochiga-white/15 text-ochiga-white/65 hover:border-ochiga-white/35"
              }`}
            >
              <input
                type="radio"
                id={optionId}
                name={id}
                value={option}
                checked={value === option}
                required={required}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

export function CheckboxGroupField({
  id,
  label,
  values,
  onChange,
  options,
  required,
  error,
}: {
  id: string;
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
  required?: boolean;
  error?: string;
}) {
  const errorId = `${id}-error`;
  function toggle(option: string) {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
    } else {
      onChange([...values, option]);
    }
  }

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className={labelClass}>
        {label} {required ? <span className="text-ochiga-red" aria-hidden>*</span> : null}
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const optionId = `${id}-${option.replace(/\s+/g, "-").toLowerCase()}`;
          const checked = values.includes(option);
          return (
            <label
              key={option}
              htmlFor={optionId}
              className={`cursor-pointer rounded border px-4 py-2.5 text-sm transition-colors duration-fast ${
                checked
                  ? "border-ochiga-red bg-ochiga-red/10 text-ochiga-white"
                  : "border-ochiga-white/15 text-ochiga-white/65 hover:border-ochiga-white/35"
              }`}
            >
              <input
                type="checkbox"
                id={optionId}
                name={id}
                checked={checked}
                onChange={() => toggle(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

export function ConsentField({
  id,
  checked,
  onChange,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ochiga-white/60">
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          required
          aria-required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-ochiga-red"
        />
        <span>
          By submitting this form, you agree that Ochiga may use the information provided to review and
          respond to your enquiry in accordance with our{" "}
          <a href="/privacy" className="text-ochiga-white underline decoration-ochiga-red/60 underline-offset-4">
            Privacy Policy
          </a>
          .
        </span>
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

// Anti-spam trap: a field real visitors never see or fill. Hidden via
// CSS (not `type="hidden"`) so basic bots that fill visible-looking
// inputs still trip it, but screen readers correctly skip it via
// aria-hidden + tabIndex.
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export function ErrorSummary({ errors }: { errors: Record<string, string> }) {
  const entries = Object.entries(errors);
  if (!entries.length) return null;
  return (
    <div role="alert" className="rounded border border-ochiga-red/40 bg-ochiga-red/5 px-5 py-4">
      <p className="text-sm font-medium text-ochiga-red-bright">Please check the following:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ochiga-white/70">
        {entries.map(([field, message]) => (
          <li key={field}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export function SuccessPanel({ message, requestId }: { message: string; requestId?: string }) {
  return (
    <div role="status" className="rounded border border-ochiga-white/15 bg-ochiga-charcoal px-6 py-8 text-center">
      <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">Received</p>
      <p className="mt-4 text-lg leading-relaxed text-ochiga-white">{message}</p>
      {requestId ? <p className="mt-4 text-xs text-ochiga-white/35">Reference: {requestId}</p> : null}
    </div>
  );
}
