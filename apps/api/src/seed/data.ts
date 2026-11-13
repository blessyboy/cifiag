/**
 * SEED CONTENT migrated from the live site https://cifiag.com (WordPress),
 * retrieved 13 November 2026.
 *
 * Only CIFIAG's own content was migrated. Theme demo material on the live site
 * (Australian addresses, "Consultio" branding, lorem-ipsum affiliation text,
 * consulting "services", stock-photo team members) was discarded (PRD 1.2).
 *
 * Every record still needs owner sign-off before launch (PRD 14.2). Items
 * marked "CONFIRM:" in comments were inconsistent or incomplete on the
 * source site. See docs/content-migration.md for the full list.
 */

const owner = "Content lead (to be assigned)";
const reviewAt = new Date("2027-01-31T00:00:00Z");
const base = { owner, reviewAt, status: "published" as const };

export const settings = {
  key: "global",
  // CONFIRM: the PRD says "Institute of Financial and Investment Analysts Ghana";
  // the live site, news coverage and the crest all use the "Chartered" name.
  siteName: "Chartered Institute of Financial and Investment Analysts, Ghana",
  shortName: "CIFIAG",
  tagline: "Competence and Integrity", // motto on the crest
  logo: { src: "/logo.png", alt: "CIFIAG crest" },
  contact: {
    // CONFIRM: the live site also shows "Paradise St, Ring Road Central".
    address: ["Paradise Street, by Apollo Theatre", "Asylum Down, Accra", "Ghana"],
    phones: ["+233 24 761 4941", "+233 54 303 4249", "+233 26 026 9949"],
    // CONFIRM: the live site also lists cifiag.gh@gmail.com and info.cfiag.ifis@gmail.com.
    emails: ["info@cifiag.org"],
    officeHours: "Monday to Friday",
    mapUrl: "https://goo.gl/maps/ea9nsAFtcMidALyT7",
    verified: false,
  },
  social: [],
  primaryMenu: [
    { label: "Home", href: "/", children: [] },
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "Our Team", href: "/about/our-team" },
        { label: "Code of Conduct", href: "/about/code-of-conduct" },
        { label: "News", href: "/news" },
      ],
    },
    {
      label: "Programs",
      href: "/programs",
      children: [
        { label: "Diploma", href: "/programs/diploma" },
        { label: "Advanced Diploma", href: "/programs/advanced-diploma" },
        { label: "Chartered Professional Certification", href: "/programs/chartered-professional-certification" },
        { label: "Program Outlines", href: "/programs/outlines" },
        { label: "Registration Fees", href: "/programs/registration-fees" },
      ],
    },
    {
      label: "Membership",
      href: "/membership",
      children: [
        { label: "Fellows", href: "/membership/fellows" },
        { label: "Full Members", href: "/membership/full-members" },
        { label: "Associate Members", href: "/membership/associate-members" },
        { label: "Students", href: "/membership/students" },
      ],
    },
    {
      label: "Council",
      href: "/council",
      children: [
        { label: "Leadership of the Institute", href: "/council/leadership" },
        { label: "Council Members", href: "/council/members" },
        { label: "Heads of Committee", href: "/council/committee-heads" },
      ],
    },
    { label: "Contact Us", href: "/contact", children: [] },
  ],
  footerMenu: [
    { label: "News", href: "/news", children: [] },
    { label: "Privacy notice", href: "/privacy", children: [] },
    { label: "Terms of use", href: "/terms", children: [] },
    { label: "Accessibility", href: "/accessibility", children: [] },
  ],
  headerAction: { label: "Become A Member", href: "/become-a-member" },
  defaultSeo: {
    title: "CIFIAG",
    description:
      "The Chartered Institute of Financial and Investment Analysts, Ghana (CIFIAG): professional qualifications, membership and ethical standards for financial and investment analysts.",
  },
};

const OBJECTIVE_AND_WRITTEN = "Objective questions and written examination";
const WRITTEN = "Written examinations";

export const programs = [
  {
    ...base,
    slug: "diploma",
    title: "Diploma",
    award: "Professional Diploma – Finance and Investment",
    summary: "The entry-level qualification (Part 1a), open to school leavers and mature students.",
    overview: [
      "The Professional Diploma in Finance and Investment is the first stage of the CIFIAG qualification route. It builds a foundation in accounting, marketing, communication, management and business law.",
      "Successful students progress to the Advanced Professional Diploma.",
    ],
    audience: "School leavers (SSCE), RSA Stage 2 holders and mature students.",
    stages: [
      {
        name: "Part 1a – Professional Diploma",
        courses: [
          "Introduction to Accounting",
          "Fundamentals of Marketing",
          "Business Communication",
          "Management",
          "Business Law 1",
        ],
        examMode: OBJECTIVE_AND_WRITTEN,
        entry: ["SSCE", "RSA Stage 2", "Mature students"],
        exemptions: [
          "ACCA Part 1, ICA Part 1, CIMA 1",
          "HND or degree in Marketing, Purchasing, Human Resources, Management or similar",
        ],
      },
    ],
    duration: null,
    delivery: "CIFIAG Lecture Hall, Accra",
    intakeStatus: "pending",
    nextIntake: null,
    order: 1,
  },
  {
    ...base,
    slug: "advanced-diploma",
    title: "Advanced Diploma",
    award: "Advanced Professional Diploma – Finance and Investment",
    summary: "Part 1b: corporate finance, financial management, law, economics and leadership.",
    overview: [
      "The Advanced Professional Diploma deepens the foundation from the Diploma with corporate finance, financial management and managerial economics.",
      "It leads on to Part 2 (Intermediate) of the Chartered Professional Certification.",
    ],
    audience: "Holders of the CIFIAG Professional Diploma or an equivalent business qualification.",
    stages: [
      {
        name: "Part 1b – Advanced Professional Diploma",
        courses: [
          "Corporate Finance 1",
          "Financial Management",
          "Business Law 2",
          "Managerial Economics",
          "Leadership and Management",
        ],
        examMode: OBJECTIVE_AND_WRITTEN,
        entry: ["CIFIAG Professional Diploma", "Diploma in Business Studies", "RSA Stage 3"],
        exemptions: [],
      },
    ],
    duration: null,
    delivery: "CIFIAG Lecture Hall, Accra",
    intakeStatus: "pending",
    nextIntake: null,
    order: 2,
  },
  {
    ...base,
    slug: "chartered-professional-certification",
    title: "Chartered Professional Certification",
    award: "Chartered Financial and Investment Analyst",
    summary: "Parts 2 to 4: Intermediate, Professional 1 (Associate) and Professional 2 (Chartered), leading to Fellowship.",
    overview: [
      "The Chartered Professional Certification takes candidates from the Intermediate level through to Chartered membership of the Institute.",
      "Passing Part 3 leads to Associate membership and passing Part 4 leads to Chartered membership. Exemptions are available for holders of related professional qualifications and degrees.",
    ],
    audience: "Finance, investment, accounting and banking professionals and graduates.",
    stages: [
      {
        name: "Part 2 – Intermediate",
        courses: [
          "Corporate Finance 2",
          "International Financial Reporting Standards 1",
          "Advanced Financial Management",
          "Investment Decision Analysis",
        ],
        examMode: WRITTEN,
        entry: [
          "CIFIAG Advanced Professional Diploma",
          "HND or degree in Marketing, Purchasing, Human Resources or Management",
          "ACCA Part 1, ICA Part 1, CIMA 1 or similar",
        ],
        exemptions: [
          "ACCA Part 2, ICA Part 2, CIMA Part 2 or similar",
          "HND or degree in Finance, Investment, Accounting or Banking",
        ],
      },
      {
        name: "Part 3 – Professional 1 (Associate Member)",
        courses: [
          "Financial Statement Analysis",
          "Financial Markets and Analysis",
          "Policy Evaluation A",
          "International Financial Reporting Standards 2",
          "Financial Modelling",
        ],
        examMode: WRITTEN,
        entry: [
          "CIFIAG Part 2",
          "ACCA Part 2, ICA Part 2, CIMA Part 2",
          "HND or degree in Finance, Investment, Accounting or Banking",
        ],
        exemptions: ["MBA or MSc in Finance, Accounting, Banking, Economics or similar", "ICA, ACCA, CIMA"],
      },
      {
        name: "Part 4 – Professional 2 (Chartered Member)",
        courses: ["Portfolio Risk Analysis", "Derivatives Analysis", "Ethics and Standards", "Project or research work"],
        examMode: WRITTEN,
        entry: ["CIFIAG Part 3"],
        exemptions: ["Granted on the basis of related courses"],
      },
      {
        name: "Fellowship",
        courses: ["Publications, research and contributions to society as a Chartered member"],
        examMode: "Seminar and continuing professional development (CPD)",
        // CONFIRM: the live site says "work experience less than 4 years"; probably "not less than 4 years".
        entry: ["CIFIAG Chartered member with diverse professional work experience (minimum period to be confirmed)"],
        exemptions: [],
      },
    ],
    duration: null,
    delivery: "CIFIAG Lecture Hall, Accra",
    intakeStatus: "pending",
    nextIntake: null,
    order: 3,
  },
];

const memberRights = [
  "Use of designatory letters for your grade: cfia (Associate Member), M.cfia (Full Member) or F.cfia (Fellow).",
  "A membership certificate and, where you meet the requirements, a practising licence to set up professional practice.",
  "The Institute's journal and other publications, and participation in Institute activities.",
  "The right to vote and be voted for in elections.",
  "Use of the Institute's library.",
];

const memberObligations = [
  "Uphold the integrity, vision and objectives of the Institute at all times.",
  "Pay all dues to the Institute without delay.",
  "Keep knowledge and skills up to date by attending Institute seminars, workshops and conferences.",
  "Act in line with guidelines issued by the Institute and abide by the Professional Code of Conduct.",
];

export const membershipCategories = [
  {
    ...base,
    slug: "students",
    name: "Students",
    designation: null,
    summary: "For people registered on a CIFIAG program, from the Professional Diploma to Part 4.",
    eligibility: ["Registration on a CIFIAG program (Diploma, Advanced Diploma or Chartered Professional Certification)."],
    benefits: ["Tuition at the CIFIAG Lecture Hall and access to Institute seminars and events."],
    obligations: ["Pay registration and examination fees.", "Abide by the Institute's rules and Professional Code of Conduct."],
    evidence: ["Copies of certificates for the entry qualification you are relying on."],
    applicationMode: "open",
    order: 1,
  },
  {
    ...base,
    slug: "associate-members",
    name: "Associate Members",
    designation: "cfia",
    summary: "For candidates who have passed Part 3 (Professional 1) of the Chartered Professional Certification.",
    eligibility: ["Pass in Part 3 – Professional 1 (Associate Member), or exemption through an approved qualification."],
    benefits: memberRights,
    obligations: memberObligations,
    evidence: ["Examination results or certificates supporting any exemption."],
    applicationMode: "open",
    order: 2,
  },
  {
    ...base,
    slug: "full-members",
    name: "Full Members",
    designation: "M.cfia",
    summary: "For qualified financial and investment analysts with relevant professional experience.",
    // CONFIRM: whether Full Member corresponds to passing Part 4 (Chartered Member).
    eligibility: ["Eligibility rules to be confirmed by the membership lead."],
    benefits: memberRights,
    obligations: memberObligations,
    evidence: ["Evidence requirements to be confirmed by the membership lead."],
    applicationMode: "open",
    order: 3,
  },
  {
    ...base,
    slug: "fellows",
    name: "Fellows",
    designation: "F.cfia",
    summary: "For Chartered members with a record of publications, research and contribution to society.",
    eligibility: [
      "CIFIAG Chartered member with diverse professional work experience.",
      "Publications, research and contributions to society.",
      "Completion of the Fellowship seminar and CPD requirements.",
    ],
    benefits: memberRights,
    obligations: memberObligations,
    evidence: ["Evidence of publications, research and professional contribution."],
    applicationMode: "open",
    order: 4,
  },
];

type Group = "leadership" | "council" | "committee-heads" | "staff" | "past-presidents";
const person = (
  name: string,
  position: string,
  group: Group,
  order: number,
  extra: { biography?: string; portrait?: { src: string; alt: string } } = {},
) => ({ ...base, name, position, group, order, biography: extra.biography ?? "", portrait: extra.portrait ?? null });

const animPrempeh = {
  // CONFIRM spelling: "Amatey" on the council page, "Amateye" in news articles.
  name: "Dr. Daniel Amatey Anim-Prempeh",
  biography:
    "Business strategist, development economist and financial and investment analyst. Director of Research and Economic Analysis at the Business and Financial Times and a part-time lecturer at Accra Business School.",
  portrait: { src: "/images/people/daniel-anim-prempeh.png", alt: "Dr. Daniel Amatey Anim-Prempeh" },
};

export const people = [
  // Principal office holders
  person(animPrempeh.name, "President and Chairman of Council", "leadership", 1, animPrempeh),
  person("Dr. Gabriel Odeh Apotey", "Vice President", "leadership", 2, {
    portrait: { src: "/images/people/gabriel-odeh-apotey.jpg", alt: "Dr. Gabriel Odeh Apotey" },
  }),
  person("Dr. Moses O. Agoro", "Chief Executive Officer", "leadership", 3),
  person("Dr. Isaac Ntiamoah", "Registrar and Secretary of Council", "leadership", 4),

  // Council members
  person("Dr. Moses Adu-Gyimah", "Council Member", "council", 1),
  person("Engr. Astu Gatsu", "Council Member", "council", 2),
  person("Samuel Eghan", "Council Member", "council", 3), // CONFIRM: listed as "Samuel Eghan Samuel"

  // Past presidents
  person("Dr. Hammond Kwabena-Stephen", "Immediate Past President", "past-presidents", 1),
  person("Dr. Joyce Roseline Aryee", "Past President", "past-presidents", 2),
  person("The late Dr. Patrick Ocloo Seshie", "Past President", "past-presidents", 3),

  // Heads of committee
  person("Mr. Henry Ugah", "Director of Membership Admission and Student Affairs", "committee-heads", 1),
  person("Gloria Ohemaa Addison", "Head, Ethics and Privileges Committee", "committee-heads", 2),
  person("Michael Hammond", "Head, Finance and Accounts Committee", "committee-heads", 3),
  person("Dr. Samuel Amoako", "Head, Education and Examination Committee", "committee-heads", 4),
  person("Mr. Isaac Ewuah", "Head, Research and Publication Committee", "committee-heads", 5),
  person("Dr. Gabriel Apotey", "Head, Disciplinary Committee", "committee-heads", 6),

  // Secretariat (live "Our Team" page held only theme demo people)
  person("Dr. Moses O. Agoro", "Chief Executive Officer", "staff", 1),
  person("Dr. Isaac Ntiamoah", "Registrar", "staff", 2),
  person("Mr. Henry Ugah", "Programmes Manager", "staff", 3),
];

// Fees as published on the live site (GHS). Amounts are integer pesewas.
// CONFIRM: the source shows no effective date; these may be the 2023 schedule.
const fee = (audience: string, item: string, cedis: number, order: number) => ({
  ...base,
  audience,
  item,
  amountMinor: cedis * 100,
  currency: "GHS",
  notes: "",
  order,
});

export const fees = [
  fee("Professional Diploma", "Student form", 100, 1),
  fee("Professional Diploma", "Student registration", 2000, 2),
  fee("Professional Diploma", "Examination", 1500, 3),
  fee("Advanced Professional Diploma", "Registration", 2000, 4),
  fee("Advanced Professional Diploma", "Examination", 1700, 5),
  fee("Part 2: Intermediate", "Registration", 2000, 6),
  fee("Part 2: Intermediate", "Examination", 1800, 7),
  fee("Part 2: Intermediate", "Subscription", 200, 8),
  fee("Part 3: Professional 1 – Associate", "Registration", 2000, 9),
  fee("Part 3: Professional 1 – Associate", "Examination", 2200, 10),
  fee("Part 3: Professional 1 – Associate", "Subscription", 350, 11),
  fee("Part 4: Professional 2 – Chartered", "Registration", 2500, 12),
  fee("Part 4: Professional 2 – Chartered", "Examination", 2500, 13),
  fee("Part 4: Professional 2 – Chartered", "Subscription", 350, 14),
];

export const documents: Array<Record<string, unknown>> = [];

const p = (text: string) => ({ type: "paragraph", text });
const BFT = { name: "Business and Financial Times (thebftonline.com)", url: "https://thebftonline.com" };

// Republished articles. CONFIRM: B&FT permission to republish in full.
export const news = [
  {
    ...base,
    slug: "cifiag-urges-newly-inducted-members-to-adhere-to-high-professional-standards",
    title: "CIFIAG urges newly inducted members to adhere to high professional standards",
    summary:
      "At its 7th induction ceremony, CIFIAG welcomed 45 new members and urged them to provide sound, non-partisan analysis to guide policy and grow the economy.",
    category: "news",
    publishAt: new Date("2023-04-05T12:19:11Z"),
    source: BFT,
    body: [
      p("The Chartered Institute of Financial and Investment Analysts Ghana (CIFIAG) has urged its newly inducted members to adhere to high professional standards and be mindful of the intrusion of partisan politics in their effort to provide critical analysis capable of growing the economy."),
      p("According to the President of CIFIAG, Dr. Daniel Amateye Anim-Prempeh, professionals are not speaking and writing enough to address critical issues of the economy – a situation he believes might be the result of political victimisation or the intrusion of partisan politics."),
      p("However, he said, irrespective of where inductees might work, there is a need to provide sound analysis to guide policy decisions and contribute toward the growth of businesses and the economy; adding that they must not substitute professionalism for partisan politics."),
      p("“My call is for all members to rise up and contribute toward national development, providing sound alternative and credible policy direction to government. We must contribute to transformation of the economy by writing on issues of the economy to give more insights.”"),
      p("He made these remarks at the 7th induction ceremony of CIFIAG, themed ‘Post COVID-19 Economic Recovery Agenda: the Role of the Financial and Investment Analyst’ in Accra."),
      p("The 45 new inductees included 6 Doctoral/Senior Fellows, 5 fellow members, 8 full members, 18 associate members, 1 professional advanced diploma (intermediate) and 7 inductees under professional diploma. Sandra Beecham from the category of associate members was recognised as having the best examination scores in Financial and Investment Analysis."),
      p("Dr. Isaac Ntiamoah, registrar of CIFIAG, also called on organisations to put in place the needed resources to ensure financial and investment analysts work effectively. He said the recent collapse of some banking institutions would have been prevented or reduced if professional financial analysts were engaged and offered the necessary resources to work effectively."),
      p("According to Director of the institute, Dr. Moses Agoro, CIFIAG is concerned with improving economic direction for prosperity; to develop from time-to-time ethics in finance and investment to meet national, regional and international standards."),
      p("“Professional Analysts are hybrid professionals, multi-tasking day-to-day to make the economy worthwhile – especially the financial investment sector – yet distinct from several other professions,” he stated."),
    ],
  },
  {
    ...base,
    slug: "dr-anim-prempeh-appointed-president-of-cifiag",
    title: "Dr. Anim-Prempeh appointed President of CIFIAG",
    summary:
      "Dr. Daniel Amateye Anim-Prempeh, Director of Research and Economic Analysis at the B&FT, has been appointed President of the Institute.",
    category: "news",
    publishAt: new Date("2023-04-05T12:31:05Z"),
    source: BFT,
    body: [
      p("Dr. Daniel Amateye Anim-Prempeh, Director of Research and Economic Analysis at the Business and Financial Times (B&FT), has been appointed as President of the Chartered Institute of Financial and Investment Analysts Ghana (CIFIAG)."),
      p("Dr. Anim-Prempeh is a business strategist, development economist, organizational transformation strategist and a financial and investment analyst. He has a deep understanding of credit and financial management as well as internal control mechanisms due to his experience in the financial and banking sector."),
      p("He served as the Vice President of the Council of the Chartered Institute of Financial and Investment Analysts Ghana, as well as the Director of Economic Affairs, Center for Greater Impact Africa."),
      p("Dr. Anim-Prempeh, who holds LLB, PGDE, MA, MEd and MPhil degrees, is also a part-time lecturer at Accra Business School. He is a member of the Institute of Financial Consultants, USA, the Chartered Association of Business Administration Canada, and Chartered Management Consultants Canada."),
      p("Commenting on his appointment, Dr. Anim-Prempeh said that under his leadership, programs will be designed to benefit both micro and macro businesses and government agencies, and that the Institute will regularly arrange Continuous Professional Development (CPD) seminars and workshops to prepare members to face the challenges in the economy."),
      p("“As an institute, we will be very vocal and engage stakeholders professionally to provide sound analysis towards growing the economy. We will analyse the data that businesses will find difficult to understand and appreciate, and explain it in a manner that will help the business community.”"),
      p("He added that the Institute will push policies that help the economy and benefit citizens, and provide an alternative and credible policy direction to government."),
    ],
  },
  {
    ...base,
    slug: "cifiag-pays-courtesy-call-on-management-of-the-gse",
    title: "CIFIAG pays courtesy call on management of the GSE",
    summary:
      "A CIFIAG delegation visited the Ghana Stock Exchange to discuss deeper collaboration, including joint training and financial literacy initiatives.",
    category: "news",
    publishAt: new Date("2023-04-05T12:35:42Z"),
    source: BFT,
    body: [
      p("A delegation from the Chartered Institute of Financial & Investment Analysts, Ghana (CIFIAG) has paid a courtesy call on the Ghana Stock Exchange (GSE), to among other things discuss ways to deepen collaboration between the Accra bourse and the Institute."),
      p("The visiting party comprised President of the Institute Dr. Daniel Amateye Anim-Prempeh; Registrar/Secretary to its governing council, Dr. Isaac Ntiamoah; Programmes Manager, Henry Ugah; and a Fellow of the Institute, Gloria Addison."),
      p("“We are concerned with aggressively driving the agenda of finance and investment, and we know we cannot do that without a key stakeholder such as the stock exchange,” Dr. Anim-Prempeh noted."),
      p("Describing the capital market as the bedrock of the nation’s economy, Dr. Ntiamoah said the ever-evolving business landscape requires well-trained professionals who are competent in analysis, valuation and report writing, and who have a high ethical standard. CIFIAG currently has more than 800 paid-up members."),
      p("He added that the Institute is eager to explore areas of shared interest with the Exchange, including joint training programmes and other platforms for public engagement on financial literacy."),
      p("Managing Director of the GSE, Ekow Afedzie, stated that the Exchange has as part of its core mandates the training of capital market participants and the wider public, and indicated the Exchange’s openness to collaborate with well-qualified persons and institutions to improve financial literacy."),
      p("CIFIAG is a professional training institute targeting investment bankers, economic analysts, financial accountants, statisticians and other investment practitioners. It was incorporated in 2011."),
    ],
  },
];

export const pages = [
  {
    ...base,
    slug: "home",
    title: "Home",
    summary: "Professional qualifications, membership and ethical standards for financial and investment analysts in Ghana.",
    sections: [
      {
        type: "hero",
        heading: "Competence and integrity in financial and investment analysis",
        // CIFIAG event photographs (see apps/web/public/images/hero/README.md).
        // CONFIRM: consent of the people pictured for use on the website.
        slides: [
          { src: "/images/hero/metad-high-table.jpg", alt: "" }, // METAD / investiture high table
          { src: "/images/hero/investiture-ceremony.jpg", alt: "" }, // newly inducted members and fellows
        ],
        slideIntervalMs: 7000,
        summary:
          "The Chartered Institute of Financial and Investment Analysts, Ghana regulates and develops the profession, from the Professional Diploma to Chartered membership and Fellowship.",
        actions: [
          { label: "Explore programs", href: "/programs", variant: "primary" },
          { label: "Become a member", href: "/become-a-member", variant: "secondary" },
        ],
      },
      {
        type: "richText",
        blocks: [
          { type: "heading", level: 2, text: "Welcome from the Chief Executive Officer" },
          p("Professional analysts are hybrid professionals, multi-tasking day to day to make the economy worthwhile, especially the financial and investment sectors, yet distinct from other professions such as accountancy, economics and audit."),
          p("At CIFIAG we are concerned with:"),
          {
            type: "list",
            ordered: false,
            items: [
              "Regulating the activities of the financial and investment analysis profession in Ghana.",
              "Securing the professional status needed to promote the study and development of the art and science of finance and investment in private practice, industry, commerce and the public sector.",
              "Economic direction for prosperity.",
              "Developing ethics in finance and investment that meet national, regional and international standards.",
            ],
          },
          p("Dr. Moses O. Agoro, Chief Executive Officer"),
        ],
      },
      {
        type: "cardGrid",
        heading: "Programs",
        intro: "A structured route from the Professional Diploma to Chartered membership.",
        source: "programs",
        columns: 3,
        emptyState: "No programs are open for applications right now. Check back soon or contact us.",
      },
      {
        type: "cardGrid",
        heading: "Membership",
        intro: "Choose the membership grade that matches your qualifications and experience.",
        source: "membershipCategories",
        columns: 4,
      },
      {
        type: "cardGrid",
        heading: "Latest news",
        source: "news",
        limit: 3,
        columns: 3,
        emptyState: "There are no current news items or notices.",
      },
      {
        type: "callToAction",
        heading: "Ready to join the Institute?",
        text: "Register for a program or apply for membership.",
        actions: [{ label: "Become a member", href: "/become-a-member", variant: "primary" }],
      },
    ],
  },
  {
    ...base,
    slug: "about",
    title: "About Us",
    summary: "Who we are, our mission and the objectives of the Institute.",
    sections: [
      {
        type: "richText",
        blocks: [
          p("The Chartered Institute of Financial and Investment Analysts, Ghana (CIFIAG) is a professional body for investment bankers, economic analysts, financial accountants, statisticians and other investment practitioners. It was incorporated in 2011 and, as of 2023, had more than 800 paid-up members."),
          { type: "heading", level: 2, text: "Our mission: S.T.O.C.K." },
          p("Strive Technically and Operationally to Contribute to Knowledge."),
          {
            type: "list",
            ordered: false,
            items: [
              "To provide an umbrella, a voice and a chartered body that brings together investment and financial experts, building their capacity and keeping them informed of the latest developments in practice.",
              "To develop professional and technical expertise in the economic, financial and investment sectors of the Ghanaian economy through professionalism, humanitarian effort, educational advancement, cooperation and understanding.",
              "To provide good governance, welfare and direction for all members on the principles of equity, fairness and due process.",
              "To develop a formidable institution that acts as a catalyst and agent of change in financial and investment analysis, relevant globally.",
            ],
          },
          { type: "heading", level: 2, text: "Objectives of the Institute" },
          {
            type: "list",
            ordered: false,
            items: [
              "To provide an organisation, national and international in scope, for all investment and financial analysts and managers in all sectors.",
              "To develop standards in finance and investment that meet national and international standards.",
              "To secure the professional status needed to promote the study and development of the art and science of finance and investment in private practice, industry, commerce and the public sector.",
              "To admit to membership only people who qualify by examination and have practical experience.",
              "To regulate the discipline and professional conduct of members.",
              "To hold conferences, workshops, seminars and symposia on financial and investment analysis, and to publish papers, books, lectures and other materials.",
              "To promote high professional standards through regular publication of the Institute's journal.",
              "To keep abreast of new regulations and policies affecting the industry, and to monitor the economy for its effect on earnings.",
              "To protect the interests of members.",
            ],
          },
        ],
      },
      {
        type: "callToAction",
        heading: "Professional standards",
        text: "All members are bound by the Institute's Professional Code of Conduct.",
        actions: [
          { label: "Read the code of conduct", href: "/about/code-of-conduct", variant: "primary" },
          { label: "Meet the Council", href: "/council", variant: "secondary" },
        ],
      },
    ],
  },
  {
    ...base,
    slug: "about/code-of-conduct",
    title: "Professional Code of Conduct",
    summary: "The code of professional ethics approved by the governing Council and binding on all members.",
    sections: [
      {
        type: "richText",
        blocks: [
          p("Members undertake to abide by the rules and regulations of the Institute. Members shall not use their authority or office for personal gain, and shall uphold the profession of financial and investment analysis by:"),
          {
            type: "list",
            ordered: false,
            items: [
              "Being thoroughly transparent and rejecting any business practice that might reasonably be deemed improper, fraudulent or corrupt.",
              "Optimising the resources for which they are responsible, for the maximum benefit of their employing organisation.",
              "Maintaining integrity at all times in all business and transactions, within and outside their employing organisation.",
              "Promoting the Institute and displaying professional competence among those for whom they are responsible.",
              "Complying with the letter and the spirit of the law of the country in which they practise.",
              "Following guidance on professional practice issued by the Institute from time to time.",
            ],
          },
          { type: "heading", level: 2, text: "Guidance" },
          {
            type: "list",
            ordered: false,
            items: [
              "Accuracy of information: information provided in the course of duty must be true and fair, and must not mislead.",
              "Confidential information: information received in the course of duty must be kept confidential and never used for personal gain.",
              "Gifts: gifts other than items of very small value, such as diaries or calendars, must not be accepted where they could be seen to influence a decision.",
              "Interests: any interest that others might see as affecting impartiality must be declared.",
              "Advice: advice given by members must be professional, sound and in utmost good faith.",
            ],
          },
          { type: "heading", level: 2, text: "Discipline" },
          p("The constitution of the Institute mandates the Disciplinary Committee to investigate, consider and determine cases of members reported to have breached the code of conduct. Where gross misconduct is established, a member may, depending on the gravity of the offence, be admonished, reprimanded, suspended or removed from the Institute's register."),
        ],
      },
    ],
  },
  {
    ...base,
    slug: "about/our-team",
    title: "Our Team",
    summary: "The secretariat that runs the Institute day to day.",
    sections: [{ type: "cardGrid", source: "people", filter: { group: "staff" }, columns: 3, emptyState: "Team profiles will be published soon." }],
  },
  {
    ...base,
    slug: "news",
    title: "News",
    summary: "News and notices from the Institute.",
    sections: [{ type: "cardGrid", source: "news", columns: 3, emptyState: "There are no news items yet." }],
  },
  {
    ...base,
    slug: "programs",
    title: "Programs",
    summary: "Compare program routes, courses, entry requirements, exemptions and fees.",
    sections: [
      { type: "cardGrid", source: "programs", columns: 3 },
      {
        type: "dataTable",
        caption: "The CIFIAG qualification route",
        source: "static",
        columns: [
          { key: "stage", label: "Stage" },
          { key: "program", label: "Program" },
          { key: "outcome", label: "Leads to" },
        ],
        rows: [
          { stage: "Part 1a", program: "Professional Diploma", outcome: "Advanced Professional Diploma" },
          { stage: "Part 1b", program: "Advanced Professional Diploma", outcome: "Part 2 – Intermediate" },
          { stage: "Part 2", program: "Intermediate", outcome: "Part 3 – Professional 1" },
          { stage: "Part 3", program: "Professional 1", outcome: "Associate Member (cfia)" },
          { stage: "Part 4", program: "Professional 2", outcome: "Chartered Member" },
          { stage: "Fellowship", program: "Seminar and CPD", outcome: "Fellow (F.cfia)" },
        ],
      },
      {
        type: "callToAction",
        heading: "Fees and program outlines",
        text: "See registration, examination and subscription fees, and the program calendar.",
        actions: [
          { label: "Registration fees", href: "/programs/registration-fees", variant: "primary" },
          { label: "Program outlines", href: "/programs/outlines", variant: "secondary" },
        ],
      },
    ],
  },
  {
    ...base,
    slug: "programs/outlines",
    title: "Program Outlines",
    summary: "The Institute's calendar of training, examinations and events. Past years are kept for reference.",
    sections: [
      {
        type: "richText",
        blocks: [p("The program outline for the current year has not yet been published. The 2023 outline is shown below for reference.")],
      },
      {
        type: "dataTable",
        caption: "Program outline for 2023 (archived)",
        source: "static",
        columns: [
          { key: "program", label: "Program" },
          { key: "date", label: "Date" },
          { key: "topic", label: "Topic or level" },
          { key: "delivery", label: "Delivery" },
        ],
        rows: [
          {
            program: "Mandatory Educational and Development Training (METAD), all members – session 1",
            date: "25 March",
            topic: "Financial and investment analysts' perspective on overcoming economic turbulence and recovery (Ghana in focus)",
            delivery: "CIFIAG Lecture Hall / Zoom",
          },
          {
            program: "METAD – session 2",
            date: "29 July",
            topic: "Energy and power sustainability drive in developing economies",
            delivery: "Zoom",
          },
          {
            program: "Membership training – session 1",
            date: "4 March – 29 April",
            topic: "Professional Part 1 (Associate) and Professional Part 2 (Chartered)",
            delivery: "CIFIAG Lecture Hall",
          },
          {
            program: "Membership training – session 2",
            date: "From 8 July", // CONFIRM: end date incomplete on source ("8th July – 26th")
            topic: "Professional Part 1 (Associate) and Professional Part 2 (Chartered)",
            delivery: "CIFIAG Lecture Hall",
          },
          { program: "Examinations – first sitting", date: "3 June – 1 July", topic: "Part 1 and Part 2", delivery: "CIFIAG Lecture Hall" },
          { program: "Examinations – second sitting", date: "9 September – 7 October", topic: "Part 1 and Part 2", delivery: "CIFIAG Lecture Hall" },
          { program: "Publication of members in good standing", date: "July", topic: "", delivery: "Newspaper and CIFIAG website" },
          {
            program: "Annual conference and induction of members",
            date: "25 November",
            topic: "Investiture of newly registered members and City University graduation",
            delivery: "UDS Guest House Hall",
          },
        ],
      },
    ],
  },
  {
    ...base,
    slug: "programs/registration-fees",
    title: "Registration Fees",
    summary: "Registration, examination and subscription fees for each stage, in Ghana cedis. The payment structure is flexible.",
    sections: [
      { type: "dataTable", caption: "Fees by program stage", source: "fees" },
      {
        type: "richText",
        blocks: [p("The payment structure is flexible. Contact the Institute to discuss payment arrangements.")],
      },
    ],
  },
  {
    ...base,
    slug: "membership",
    title: "Membership",
    summary: "Membership grades, eligibility, rights and obligations, and how to apply.",
    sections: [
      { type: "cardGrid", source: "membershipCategories", columns: 2 },
      {
        type: "richText",
        blocks: [
          { type: "heading", level: 2, text: "Rights of members" },
          { type: "list", ordered: false, items: memberRights },
          { type: "heading", level: 2, text: "Obligations of members" },
          {
            type: "list",
            ordered: false,
            items: [
              ...memberObligations,
              "Be a worthy ambassador of the Institute wherever and whenever.",
              "Avoid defamatory statements or attitudes harmful to the progress of the Institute.",
            ],
          },
        ],
      },
    ],
  },
  {
    ...base,
    slug: "council",
    title: "Council",
    summary: "The Institute's governing Council, its office holders and committee heads.",
    sections: [
      { type: "cardGrid", heading: "Leadership of the Institute", source: "people", filter: { group: "leadership" }, columns: 4 },
      { type: "cardGrid", heading: "Council Members", source: "people", filter: { group: "council" }, columns: 3 },
      { type: "cardGrid", heading: "Heads of Committee", source: "people", filter: { group: "committee-heads" }, columns: 3 },
    ],
  },
  {
    ...base,
    slug: "council/leadership",
    title: "Leadership of the Institute",
    summary: "The Institute's principal office holders and past presidents.",
    sections: [
      { type: "cardGrid", heading: "Office holders", source: "people", filter: { group: "leadership" }, columns: 2 },
      { type: "cardGrid", heading: "Past presidents", source: "people", filter: { group: "past-presidents" }, columns: 3 },
    ],
  },
  {
    ...base,
    slug: "council/members",
    title: "Council Members",
    summary: "Members of the governing Council.",
    sections: [
      { type: "cardGrid", heading: "Office holders", source: "people", filter: { group: "leadership" }, columns: 4 },
      { type: "cardGrid", heading: "Members", source: "people", filter: { group: "council" }, columns: 3 },
    ],
  },
  {
    ...base,
    slug: "council/committee-heads",
    title: "Heads of Committee",
    summary: "The members who lead the Institute's standing committees.",
    sections: [{ type: "cardGrid", source: "people", filter: { group: "committee-heads" }, columns: 3 }],
  },
  {
    ...base,
    slug: "contact",
    title: "Contact Us",
    summary: "Visit, call or email the Institute's Accra office.",
    sections: [{ type: "contactDetails", heading: "Accra office" }],
  },
  {
    ...base,
    slug: "become-a-member",
    title: "Become A Member",
    summary: "Register for a program or apply for membership of the Institute.",
    sections: [
      {
        type: "richText",
        blocks: [
          { type: "heading", level: 2, text: "How to apply" },
          {
            type: "list",
            ordered: true,
            items: [
              "Choose whether you are registering for a program or applying for a membership grade.",
              "Check the entry requirements and exemptions for your route.",
              "Complete your details and provide only the documents your route requires.",
              "Review and submit your application. You will receive a reference number by email.",
            ],
          },
          p("Online applications will open in a later release. Until then, please contact the Institute by phone or at info@cifiag.org."),
        ],
      },
      {
        type: "callToAction",
        heading: "Not sure which route is right for you?",
        actions: [
          { label: "Compare programs", href: "/programs", variant: "primary" },
          { label: "Compare membership grades", href: "/membership", variant: "secondary" },
        ],
      },
    ],
  },
  {
    ...base,
    slug: "privacy",
    title: "Privacy Notice",
    summary: "How the Institute handles personal data.",
    sections: [{ type: "richText", blocks: [p("The approved privacy notice will be published here following review by the Institute's data protection owner and counsel.")] }],
  },
  {
    ...base,
    slug: "terms",
    title: "Terms of Use",
    summary: "Terms for using this website.",
    sections: [{ type: "richText", blocks: [p("The approved terms of use will be published here.")] }],
  },
  {
    ...base,
    slug: "accessibility",
    title: "Accessibility Statement",
    summary: "Our commitment to an accessible website.",
    sections: [
      {
        type: "richText",
        blocks: [
          p("We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA."),
          p("If you find content you cannot access, please contact us at info@cifiag.org and tell us the page address and the problem you met."),
        ],
      },
    ],
  },
];
