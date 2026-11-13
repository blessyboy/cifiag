# Home page hero slides

Current slides:

- `metad-high-table.jpg`: the high table at the METAD training and investiture ceremony
- `investiture-ceremony.jpg`: newly inducted members and fellows in academic dress

Confirm consent from the people pictured before launch.

## Image guidelines

- **Size:** 1920 × 800 px (landscape, about 2.4:1). The image is cropped to fill the banner, so keep the subject
  towards the **right-hand side**. The left side sits behind the heading and is darkened for readability.
- **Format:** JPEG or WebP, ideally under 300 KB each (the site must work on low-bandwidth connections).
- **Count:** 1 to 8 slides. With one slide there are no slider controls. With none, the brand gradient is shown.
- **Rights:** confirm usage rights and consent for anyone pictured before publishing.

## How to swap them in

1. Put the files here, for example `slide-1.jpg`, `slide-2.jpg`.
2. Update the `slides` list of the home page hero in `apps/api/src/seed/data.ts`
   (later this will be done in the CMS):

   ```ts
   slides: [
     { src: "/images/hero/slide-1.jpg", alt: "" },
     { src: "/images/hero/slide-2.jpg", alt: "" },
   ],
   slideIntervalMs: 7000, // 4000–15000
   ```

   Leave `alt` empty: the images are decorative backgrounds behind the heading.
