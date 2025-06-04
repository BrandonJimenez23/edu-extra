export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				"blue-ribbon": {
					50: "#eff6ff", // Muy claro
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6", // Base
					600: "#2563eb", // Hover
					700: "#1d4ed8", // Active
					800: "#1e40af", // Más oscuro
					900: "#1e3a8a", // Muy oscuro
				},
				emerald: {
					50: "#ecfdf5",
					100: "#d1fae5",
					200: "#a7f3d0",
					300: "#6ee7b7",
					400: "#34d399",
					500: "#10b981",
					600: "#059669",
					700: "#047857",
					800: "#065f46",
					900: "#064e3b",
					950: "#022c22",
				},
				sunglow: {
					50: "#fffce8",
					100: "#fef6c2",
					200: "#fdef8d",
					300: "#fce752",
					400: "#fbd725",
					500: "#facc15",
					600: "#e3b80e",
					700: "#c89e0b",
					800: "#9b7d0a",
					900: "#7a630a",
					950: "#453605",
				},
				"coral-red": {
					50: "#fff1f2",
					100: "#ffe4e6",
					200: "#fecdd3",
					300: "#fda4af",
					400: "#fb7185",
					500: "#f43f5e",
					600: "#e11d48",
					700: "#be123c",
					800: "#9f1239",
					900: "#881337",
					950: "#4c0519",
				},
				dark: "#333333",
				neutral: {
					50: "#f9fafb",
					100: "#f3f4f6",
					200: "#e5e7eb",
					300: "#d1d5db",
					400: "#9ca3af",
					500: "#6b7280",
					600: "#4b5563",
					700: "#374151",
					800: "#1f2937",
					900: "#111827",
				},
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"], // para textos base
				heading: ["Poppins", "sans-serif"], // para títulos
			},
		},
	},
	plugins: [],
};
