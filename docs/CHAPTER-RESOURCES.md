# Chapter libraries and owner-supplied content

The sidebar has **Lectures**, **NCERT Books**, **Notes** and Learning progress. The search bar and the old personal-notes sidebar entry have been removed. Personal notes already saved in the legacy lesson workspace are retained.

Every library follows the same path: section → selected subject → numbered chapter. Lectures add **Detailed** and **One-shot** sections. Class 11 and Class 12 have separate chapter catalogs. Subject choices apply across the dashboard, all three libraries, legacy lesson access and progress. PCB has no Mathematics resources. PCMB has all four subjects. A direct URL for an unselected subject shows a course-access message.

Target exam is derived automatically when selecting subjects and when existing preferences load: Mathematics → JEE; Biology → NEET; both → JEE + NEET; neither → Boards. This does not add or remove subjects. An empty selection shows a choose-subjects prompt. Classes other than 11/12 show a class-selection prompt.

## Content status

All 106 chapter slots are empty. No textbook PDFs, chapter notes or new videos have been downloaded, generated or attached. Each slot clearly says that content is coming soon. The previously approved Ohm’s Law demonstration remains a separate legacy lesson; it is not presented as a complete chapter lecture or textbook.

When the owner supplies files, add the approved PDFs to `public/` (or use reviewed HTTPS PDF URLs) and fill `lib/chapter-resources.ts`. The key is `class/subject/chapter`, for example `11/physics/1`. Set `bookPdf` and `notesPdf` to the supplied file paths, and `detailedVideoId` and `oneShotVideoId` to the supplied YouTube video IDs. Leave absent resources null. The library has PDF and video viewers ready for those values; an absent value always renders an honest empty section. Never put secrets in this public manifest. Full-book PDFs would need splitting into chapters or an explicit page mapping before being treated as chapter PDFs.

## Chapter references

Names and numbering follow the rationalised NCERT 2026–27 contents pages, checked October 17, 2026. These links are references for the chapter index; they are not attached textbook files in the application. The index is not a claim of complete JEE/NEET examination syllabus coverage. A supplied book with different numbering should be reviewed before replacing the catalog.

- Class 11 Physics: [Part I](https://ncert.nic.in/textbook/pdf/keph1ps.pdf), [Part II](https://ncert.nic.in/textbook/pdf/keph2ps.pdf).
- Class 12 Physics: [Part I](https://ncert.nic.in/textbook/pdf/leph1ps.pdf), [Part II](https://ncert.nic.in/textbook/pdf/leph2ps.pdf).
- Class 11 Chemistry: [Part I](https://ncert.nic.in/textbook/pdf/kech1ps.pdf), [Part II](https://ncert.nic.in/textbook/pdf/kech2ps.pdf).
- Class 12 Chemistry: [Part I](https://ncert.nic.in/textbook/pdf/lech1ps.pdf), [Part II](https://ncert.nic.in/textbook/pdf/lech2ps.pdf).
- Mathematics: [Class 11](https://ncert.nic.in/textbook/pdf/kemh1ps.pdf), [Class 12 Part I](https://ncert.nic.in/textbook/pdf/lemh1ps.pdf), [Class 12 Part II](https://ncert.nic.in/textbook/pdf/lemh2ps.pdf).
- Biology: [Class 11](https://ncert.nic.in/textbook/pdf/kebo1ps.pdf), [Class 12](https://ncert.nic.in/textbook/pdf/lebo1ps.pdf).
