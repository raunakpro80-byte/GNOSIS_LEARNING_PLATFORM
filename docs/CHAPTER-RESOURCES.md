# Chapter libraries and owner-supplied content

The sidebar has **Lectures**, **NCERT Books**, **Notes** and Learning progress. The search bar and the old personal-notes sidebar entry have been removed. Personal notes already saved in the legacy lesson workspace are retained.

Every library follows the same path: section → selected subject → numbered chapter. Lectures add **Detailed** and **One-shot** sections. Class 11 and Class 12 have separate chapter catalogs. Subject choices apply across the dashboard, all three libraries, legacy lesson access and progress. PCB has no Mathematics resources. PCMB has all four subjects. A direct URL for an unselected subject shows a course-access message.

Target exam is derived automatically when selecting subjects and when existing preferences load: Mathematics → JEE; Biology → NEET; both → JEE + NEET; neither → Boards. This does not add or remove subjects. An empty selection shows a choose-subjects prompt. Classes other than 11/12 show a class-selection prompt.

## Content status

Four owner-supplied notes PDFs are available in **Class 11 → Physics → Notes**. The chapter list marks these notes as available. Four textbook chapter PDFs are also available under **Class 11 → NCERT Books → Physics**. Eight supplied YouTube lectures are available in the Detailed and One-shot sections for the same chapters. Class 11 Chemistry chapters 1–4 also have supplied Detailed lectures. Other resources remain empty until supplied.

| Chapter                      | Supplied notes                      | Pages |
| ---------------------------- | ----------------------------------- | ----- |
| 1. Units and Measurements    | Units_and_Dimensions_Notes.pdf      | 40    |
| 2. Motion in a Straight Line | Motion_in_a_Straight_Line_Notes.pdf | 23    |
| 3. Motion in a Plane         | Motion_in_a_Plane_Notes.pdf         | 20    |
| 4. Laws of Motion            | Newton's Laws of Motion _Notes.pdf  | 25    |

Web copies are stored in `public/notes/class-11/physics/`. The three files above the upload limit use readable 180 DPI image-based web copies; all 108 pages and page dimensions are retained. The Laws of Motion PDF retains its original page content. The owner's original files are unchanged.

The previously approved Ohm’s Law demonstration remains a separate legacy lesson; it is not presented as a complete chapter lecture or textbook.

When the owner supplies files, add the approved PDFs to `public/` (or use reviewed HTTPS PDF URLs) and fill `lib/chapter-resources.ts`. The key is `class/subject/chapter`, for example `11/physics/1`. Set `bookPdf` and `notesPdf` to the supplied file paths, and `detailedVideoId` and `oneShotVideoId` to the supplied YouTube video IDs. Leave absent resources null. The library has PDF and video viewers ready for those values; an absent value always renders an honest empty section. Never put secrets in this public manifest. Full-book PDFs would need splitting into chapters or an explicit page mapping before being treated as chapter PDFs.

## Supplied textbook chapters

The four owner-supplied PDFs are copied unchanged to `public/books/class-11/physics/`. They are separate from the handwritten notes and retain their original searchable text, diagrams and pages. The chapter list shows **PDF available**; each chapter opens in the existing PDF reader.

| Chapter                      | Supplied file     | Pages |
| ---------------------------- | ----------------- | ----- |
| 1. Units and Measurements    | class 11 ch 1.pdf | 12    |
| 2. Motion in a Straight Line | ch 2.pdf          | 14    |
| 3. Motion in a Plane         | ch 3.pdf          | 22    |
| 4. Laws of Motion            | ch 4.pdf          | 22    |

## Supplied detailed lectures

The owner assigned these YouTube videos to **Class 11 → Physics → Detailed**, chapters 1–4. The chapter and format cards show availability from the resource manifest. The corresponding One-shot lectures are listed below. The videos are embedded on interaction using the existing player and include an Open on YouTube link. No transcript has been supplied, and no timestamp synchronization is claimed.

| Chapter                      | Detailed video                              |
| ---------------------------- | ------------------------------------------- |
| 1. Units and Measurements    | https://www.youtube.com/watch?v=Rcdf1W-0F_Q |
| 2. Motion in a Straight Line | https://www.youtube.com/watch?v=LWeOOFvxrd0 |
| 3. Motion in a Plane         | https://www.youtube.com/watch?v=-N7eYNzRMOM |
| 4. Laws of Motion            | https://www.youtube.com/watch?v=8hG2gbmf7sU |

## Supplied one-shot lectures

The owner assigned these videos to **Class 11 → Physics → One-shot**, chapters 1–4. Each format card shows Video available and opens the matching player. Detailed lectures retain their separate video assignments.

| Chapter                      | One-shot video                              |
| ---------------------------- | ------------------------------------------- |
| 1. Units and Measurements    | https://www.youtube.com/watch?v=v3rx_lBBvCk |
| 2. Motion in a Straight Line | https://www.youtube.com/watch?v=joMDsZgx2a0 |
| 3. Motion in a Plane         | https://www.youtube.com/watch?v=qN8pSP8o_uY |
| 4. Laws of Motion            | https://www.youtube.com/watch?v=yjb5MgEkzic |

## Supplied Chemistry detailed lectures

The owner assigned these videos to **Class 11 → Chemistry → Detailed**, chapters 1–4. Chemistry follows the saved subject selection, and both the chapter list and format cards show availability. Other Chemistry resources remain empty until supplied.

| Chapter                                                     | Detailed video                              |
| ----------------------------------------------------------- | ------------------------------------------- |
| 1. Some Basic Concepts of Chemistry                         | https://www.youtube.com/watch?v=ZdzrnPawYf4 |
| 2. Structure of Atom                                        | https://www.youtube.com/watch?v=t0YvTa26TSs |
| 3. Classification of Elements and Periodicity in Properties | https://www.youtube.com/watch?v=A8UE8We3FiI |
| 4. Chemical Bonding and Molecular Structure                 | https://www.youtube.com/watch?v=VTFEPlwgqZY |

## Chapter references

Names and numbering follow the rationalised NCERT 2026–27 contents pages, checked October 17, 2026. These links are references for the chapter index; only the four owner-supplied chapters listed above are attached textbook files in the application. The index is not a claim of complete JEE/NEET examination syllabus coverage. A supplied book with different numbering should be reviewed before replacing the catalog.

- Class 11 Physics: [Part I](https://ncert.nic.in/textbook/pdf/keph1ps.pdf), [Part II](https://ncert.nic.in/textbook/pdf/keph2ps.pdf).
- Class 12 Physics: [Part I](https://ncert.nic.in/textbook/pdf/leph1ps.pdf), [Part II](https://ncert.nic.in/textbook/pdf/leph2ps.pdf).
- Class 11 Chemistry: [Part I](https://ncert.nic.in/textbook/pdf/kech1ps.pdf), [Part II](https://ncert.nic.in/textbook/pdf/kech2ps.pdf).
- Class 12 Chemistry: [Part I](https://ncert.nic.in/textbook/pdf/lech1ps.pdf), [Part II](https://ncert.nic.in/textbook/pdf/lech2ps.pdf).
- Mathematics: [Class 11](https://ncert.nic.in/textbook/pdf/kemh1ps.pdf), [Class 12 Part I](https://ncert.nic.in/textbook/pdf/lemh1ps.pdf), [Class 12 Part II](https://ncert.nic.in/textbook/pdf/lemh2ps.pdf).
- Biology: [Class 11](https://ncert.nic.in/textbook/pdf/kebo1ps.pdf), [Class 12](https://ncert.nic.in/textbook/pdf/lebo1ps.pdf).
