/** Prefix a root-relative path with the configured Astro `base` (e.g. `/website/`). */
export function withBase(path = ''): string {
	const base = import.meta.env.BASE_URL.endsWith('/')
		? import.meta.env.BASE_URL
		: `${import.meta.env.BASE_URL}/`;
	const clean = path.replace(/^\//, '');
	return `${base}${clean}`;
}
