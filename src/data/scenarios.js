// Comprehensive simulation data for TrustBridge: The Virtual Lok Adalat on NewgenONE

export const PERSONAS = [
  {
    id: 'rameshwar',
    name: 'Rameshwar Prasad',
    age: 68,
    role: 'Retired Postal Clerk & Pensioner',
    location: 'Gorakhpur, Rural Uttar Pradesh',
    avatar: '👨🏽‍🦳',
    tag: 'Primary Persona: Silent Sufferer',
    distress: 94,
    badgeColor: 'rose',
    summary: 'Blocked ₹72,000 pension earmarked for spouse\'s emergency chemotherapy at AIIMS. Low digital literacy, vernacular speaker, unable to navigate traditional 20-page grievance portals.',
    inputMethod: 'WhatsApp Voice Note (Bhojpuri / Hindi)',
    caseId: 'TB-2026-UP-8921',
    disputeAmount: '₹72,000',
    slaStandard: '7 to 30 Business Days',
    slaTrustBridge: '2 Hours (Code Red Dynamic Bypass)',
    rawVernacular: 'अरे साहब! हमार पेंशन का 72,000 रुपिया कट गइल बा बैंक से, पर अस्पताल में दवा ना मिल पा रहल बा! पत्नी आईसीयू में बाड़ी, कैंसर का सुई लगवई के बा। ई का हो रहल बा? हम गरीब आदमी कहाँ जाईं?',
    phoneticTranslation: 'Arey Sahab! Hamar pension ka 72,000 rupiya kat gail ba bank se, par aspatal mein dawa na mil pa rahal ba! Patni ICU mein baadi, cancer ka sui lagwai ke ba. Ee ka ho rahal ba? Hum gareeb aadmi kahan jaayi?',
    englishTranslation: 'Sir! My pension amount of ₹72,000 has been debited from the bank, but the hospital is not dispensing medicine! My wife is in the ICU awaiting urgent chemotherapy injections. What is happening? Where does a poor man like me go?',
    evidenceDoc: 'AIIMS Oncology Admission Slip #ONC-4491 & Bank SMS Debit Alert #TXN9042',
    category: 'Critical Unauthorized Debit / ATM Discrepancy'
  },
  {
    id: 'sunita',
    name: 'Sunita Devi',
    age: 34,
    role: 'Rural Self-Help Group (SHG) Treasurer',
    location: 'Madurai District, Tamil Nadu',
    avatar: '👩🏽',
    tag: 'Vernacular Rural Micro-Merchant',
    distress: 88,
    badgeColor: 'amber',
    summary: 'Unauthorized micro-UPI debits of ₹14,500 from collective SHG fertilizer fund. Panic among 18 women members; threats of loan default and microfinance penalty.',
    inputMethod: 'WhatsApp Voice Note (Tamil)',
    caseId: 'TB-2026-TN-4109',
    disputeAmount: '₹14,500',
    slaStandard: '15 Business Days',
    slaTrustBridge: '2 Hours (Code Red Dynamic Bypass)',
    rawVernacular: 'ஐயா வணக்கம்! எங்கள் மகளிர் குழு உர நிதியிலிருந்து 14,500 ரூபாய் எங்கள் அனுமதியின்றி எடுக்கப்பட்டுவிட்டது. அடுத்த வாரம் உரம் வாங்க வேண்டும், இல்லையெனில் பயிர் அழுகிவிடும்! தயவுசெய்து பணத்தை மீட்டுத் தாருங்கள்.',
    phoneticTranslation: 'Ayya vanakkam! Engal magalir kulu ura nidhiyilirundhu 14,500 roobai engal anumadhiyindri edukappattuvittadhu. Adutha vaaram uram vaanga vendum, illaiyenil payir alugividum! Thayavuseidhu panathai meettu thaarungal.',
    englishTranslation: 'Greetings Sir! ₹14,500 from our women\'s SHG fertilizer fund was debited without our authorization. We must purchase fertilizer next week or our seasonal crop will perish! Please retrieve our funds.',
    evidenceDoc: 'UPI Ref #UPI-88392110 & SHG Passbook Statement',
    category: 'Fraudulent UPI Micro-Drain / Social Vulnerability'
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    age: 36,
    role: 'Lead BFSI Compliance & Operations Officer',
    location: 'National Operations Hub, Mumbai',
    avatar: '👩💼',
    tag: 'Secondary Persona: Compliance Officer',
    distress: 45,
    badgeColor: 'cyber-cyan',
    summary: 'Managing 12,000+ monthly escalations across branches. Demands zero-prep audit trails, instant RBI circular compliance, and zero regulatory penalty exposure.',
    inputMethod: 'NewgenONE Ops Command Console',
    caseId: 'OPS-AUDIT-2026-Q1',
    disputeAmount: 'Portfolio ₹18.4 Cr',
    slaStandard: 'Manual escalations backlogged',
    slaTrustBridge: 'Zero-Prep Audit Ready & 76% Automated',
    category: 'Operations Management & RBI Audit Readiness'
  },
  {
    id: 'sen',
    name: 'Dr. A. K. Sen',
    age: 58,
    role: 'RBI Principal Ombudsman Inspector',
    location: 'Reserve Bank of India, New Delhi',
    avatar: '👨💼',
    tag: 'Tertiary Persona: Regulatory Ombudsman',
    distress: 20,
    badgeColor: 'emerald',
    summary: 'Responsible for safeguarding consumer trust, fairness verification, algorithmic explainability, and enforcing the Integrated Ombudsman Scheme 2021.',
    inputMethod: 'Regulatory Inspection API / Ledger Exporter',
    caseId: 'RBI-IOS-REG-2026',
    disputeAmount: 'Systemic Oversights',
    slaStandard: 'Post-facto quarterly audits',
    slaTrustBridge: '100% Explainable Cryptographic Ledger',
    category: 'Regulatory Adjudication & Consumer Rights Enforcement'
  }
];

export const LOK_ADALAT_DEBATE_STEPS = [
  {
    step: 1,
    speaker: 'advocate',
    speakerName: 'Customer Advocate Agent',
    title: 'Nyaya Mitra (Empathy & Rights)',
    avatar: '⚖️',
    color: 'purple',
    badge: 'Agent Studio: Consumer Defense Node',
    timestamp: '14:22:01 IST',
    message: 'Your Honor, complainant Rameshwar Prasad (68) suffered an unauthorized ₹72,000 debit. Algorithmic Empathy Score is 94/100 ("Code Red"). His wife Smt. Shakuntala Devi is in AIIMS Oncology ICU. Traditional 7-day bank routing is life-threatening duress. Under RBI Master Direction Sec 14(b), immediate provisional restitution is demanded.',
    evidence: 'Citing: RBI Master Direction on Customer Protection (Para 6 - Zero Liability of Customer)',
    sentiment: 'High Urgency / Restitution Demanded'
  },
  {
    step: 2,
    speaker: 'defender',
    speakerName: 'Bank Defender Agent',
    title: 'Kosh Pal (Core Banking & Risk Engine)',
    avatar: '🛡️',
    color: 'blue',
    badge: 'Agent Studio: Core Banking Risk Node',
    timestamp: '14:22:04 IST',
    message: 'We acknowledge the medical urgency. However, Core Banking Finacle logs indicate the transaction originated via ATM Terminal #104 in Gorakhpur with two-factor PIN validation. Automated fraud score was initially low (0.18). We request 72 hours for ATM physical cash switch journal reconciliation to rule out voluntary credential sharing.',
    evidence: 'Citing: Finacle CBS Log #TXN-9042 & ATM Hardware Log',
    sentiment: 'Risk Defense / Protocol Adherence'
  },
  {
    step: 3,
    speaker: 'advocate',
    speakerName: 'Customer Advocate Agent',
    title: 'Nyaya Mitra (Empathy & Rights)',
    avatar: '⚖️',
    color: 'purple',
    badge: 'Agent Studio: Consumer Defense Node',
    timestamp: '14:22:08 IST',
    message: 'Rebuttal! The Newgen IDP Telemetry engine has already detected a hardware sensor fault on ATM #104 (dispenser shutter failure at 14:18 IST). Complainant reported within 18 minutes via vernacular WhatsApp audio note. Under Clause 8(a), customer liability is precisely ZERO when fault lies in bank infrastructure. Delaying until Monday is a criminal negligence of empathy.',
    evidence: 'Citing: Telemetry Cluster Incident #4102 & Voice Recording Timestamp',
    sentiment: 'Decisive Counter-Evidence Provided'
  },
  {
    step: 4,
    speaker: 'judge',
    speakerName: 'RBI Judge (Ombudsman) Agent',
    title: 'Dharma Adhyaksha (Statutory Arbitrator)',
    avatar: '🏛️',
    color: 'emerald',
    badge: 'Agent Studio: Ombudsman Decision Engine',
    timestamp: '14:22:12 IST',
    message: 'Both agents stand heard. The evidence is conclusive: 1) Hardware telemetry confirms ATM #104 mechanical shutter failure. 2) Empathy Distress score of 94 triggers the mandatory Dynamic SLA Bypass. Under RBI Integrated Ombudsman Scheme 2021 Section 16(1), the Tribunal issues an immediate Autonomous Binding Award.',
    evidence: 'Citing: RBI Integrated Ombudsman Scheme 2021, Sec 16(1)',
    sentiment: 'Binding Consensus Reached'
  }
];

export const VERDICT_DATA = {
  awardId: 'TB-AWARD-2026-UP-8921-FINAL',
  timestamp: 'Today at 14:22:15 IST (Adjudicated in 3.4 seconds)',
  status: 'EXECUTED VIA NEWGEN BPM',
  hash: '0x8f2d9c1e7a4b6352de80124c8901be339d6a2f84cb7100e4',
  provisions: [
    {
      title: 'Full Provisional Credit Restitution',
      amount: '₹72,000.00',
      action: 'Immediate NEFT/IMPS credit dispatched to Rameshwar Prasad Account #****4491 via Newgen BPM Core Banking API hook.'
    },
    {
      title: 'Statutory Token Goodwill Relief',
      amount: '₹2,500.00',
      action: 'Automated compensation for severe medical duress as per RBI Guidelines on ATM Failure Turnaround.'
    },
    {
      title: 'Hardware Audit & Liability Allocation',
      amount: 'Vendor Recourse',
      action: 'Liability automatically transferred from customer to ATM Cash Management Partner #NCR-Ops-04.'
    },
    {
      title: 'Omnichannel CCM Dispatch',
      amount: 'Instant Delivery',
      action: 'Vernacular Hindi WhatsApp voice audio + official bilingual PDF award letter generated by Newgen CCM.'
    }
  ],
  newgenPillarsTriggered: [
    'Agent Studio: Consensus Arbitration Engine',
    'Low-Code BPM: Core Banking API Microservice Execution',
    'CCM: Omnichannel Vernacular WhatsApp & SMS Notification'
  ]
};

export const GHOST_GRIEVANCE_DATA = {
  activeIncidents: [
    {
      id: 'INC-4102',
      title: 'ATM #104 Cash Dispenser Jam Cluster',
      location: 'Civil Lines Branch, Gorakhpur (Zone 4)',
      timeDetected: '12 mins ago',
      severity: 'Critical',
      affectedCount: 142,
      totalAmountLocked: '₹8,54,000',
      status: 'AUTONOMOUSLY HEALED',
      preventedCount: 142,
      progress: 100,
      rootCause: 'Optical shutter relay sensor timeout during cash dispensing cycle',
      actionTaken: 'Newgen BPM executed 142 automated reversals to core banking in 48 seconds; proactive WhatsApp notifications dispatched before first complaint.'
    },
    {
      id: 'INC-4103',
      title: 'UPI Switch Switchover Latency Spike',
      location: 'National NPCI Gateway Route 02',
      timeDetected: '4 mins ago',
      severity: 'High',
      affectedCount: 89,
      totalAmountLocked: '₹2,14,300',
      status: 'REVERSING (84%)',
      preventedCount: 75,
      progress: 84,
      rootCause: 'Transient 504 Gateway Timeout during UPI 2.0 mandate execution',
      actionTaken: 'Automated pending-reversal buffer initiated; 75/89 credits settled within 180 seconds.'
    },
    {
      id: 'INC-4104',
      title: 'IMPS Outward Queue De-synchronization',
      location: 'West Bengal & Odisha Rural Grameen Gateway',
      timeDetected: 'Just now',
      severity: 'Moderate',
      affectedCount: 34,
      totalAmountLocked: '₹95,200',
      status: 'DETECTED / ENQUEUED',
      preventedCount: 12,
      progress: 35,
      rootCause: 'Grameen Bank core ledger sync delayed past 300ms SLA threshold',
      actionTaken: 'Pre-emptive queue retry with auto-notification to account holders.'
    }
  ],
  aggregateStats: {
    grievancesPreventedTotal: 1842,
    capitalProtected: '₹1.18 Cr',
    penaltiesSaved: '₹34.2 Lakh',
    avgPreemptionLatency: '1.2 minutes'
  }
};

export const REGULATORY_DIFF_DATA = {
  circularNumber: 'RBI/2026/88 - Master Direction on Digital Payments',
  issuingAuthority: 'Reserve Bank of India (Dept. of Payment & Settlement Systems)',
  ingestedTimestamp: 'Today, 09:15:22 IST (via Newgen IDP Ingestion Pipe)',
  title: 'Mandatory 24-Hour Autonomous Reversal for Failed Digital & ATM Transactions',
  changes: [
    {
      field: 'TAT for ATM Failed Dispense Reversal',
      before: 'T + 5 Business Days (Manual branch verification required)',
      after: 'T + 2 Hours (Autonomous telemetry-triggered reversal)',
      impact: 'Reduces customer dispute window by 96%; eliminates manual operations overhead',
      status: 'AUTO-COMPILED INTO BPM RULES'
    },
    {
      field: 'Customer Liability for Delay',
      before: '₹100/day penalty only after T+5 days upon complaint receipt',
      after: 'Proactive penalty clock starts automatically if unreversed at T+24h',
      impact: 'Shifts compliance from reactive penalty payment to pre-emptive avoidance',
      status: 'AUTO-COMPILED INTO BPM RULES'
    },
    {
      field: 'Vernacular Communication Mandate',
      before: 'English/Hindi standard SMS format',
      after: 'Mandatory vernacular audio/text notification in 14 regional languages',
      impact: 'Directly handled by Newgen CCM multichannel dynamic generation',
      status: 'AUTO-COMPILED INTO CCM TEMPLATES'
    }
  ],
  auditSignature: 'SHA256: 4e9a88c2f10b7d883921ea029384bcda991024'
};

export const IMPACT_METRICS = [
  {
    id: 'sla',
    title: '% reduction in processing time',
    value: '82%',
    subtitle: 'From 168 Hours (7 Days) → 2.1 Hours Avg (Code Red: 45 Mins)',
    highlight: 'High-distress cases solved in under 45 mins via Dynamic SLA Bypass',
    trend: '82% faster resolution',
    trendType: 'positive',
    category: 'Processing Efficiency',
    benchmark: 'Industry Avg: 168 Hours (7 Days) | TrustBridge: 2.1 Hours',
    pillar: 'Low-Code BPM & Agent Studio'
  },
  {
    id: 'manual',
    title: '% reduction in manual effort',
    value: '76%',
    subtitle: '14,000+ Officer Hours Saved Monthly via Multi-Agent Swarm',
    highlight: 'Autonomous Tier-1 & Tier-2 grievance adjudication without human touch',
    trend: '-76% manual escalations',
    trendType: 'positive',
    category: 'Operational Effort',
    benchmark: 'Previous Escalations: 18,400/mo | Now: 4,416/mo',
    pillar: 'Agent Studio Lok Adalat Swarm'
  },
  {
    id: 'decisioning',
    title: 'Faster turnaround / decisioning',
    value: '4.2 Hours',
    subtitle: 'Autonomous Consensus Reached in 3.4 Seconds; End-to-End in 4.2h',
    highlight: 'Instant core banking restitution dispatch via Newgen BPM hooks',
    trend: '97.5% faster turnaround',
    trendType: 'positive',
    category: 'Decisioning Speed',
    benchmark: 'Legacy Decisioning: 7 to 30 Days | TrustBridge: 4.2 Hours',
    pillar: 'Agent Studio & Low-Code BPM'
  },
  {
    id: 'compliance',
    title: 'Improved compliance / audit readiness',
    value: '100%',
    subtitle: 'Zero-Prep Real-Time Explainability Ledger with Cryptographic SHA-256',
    highlight: 'Zero regulatory non-compliance penalty risk under RBI Integrated Ombudsman Scheme',
    trend: '0 RBI Penalties',
    trendType: 'positive',
    category: 'Compliance & Audit',
    benchmark: 'Pre-Audit Prep: 14 Days → Zero-Prep Real-Time Ledger',
    pillar: 'Content Services & IDP'
  },
  {
    id: 'csat',
    title: 'Better customer experience',
    value: '+38 pts',
    subtitle: 'Rural Trust Score Jump from -12 to +26 NPS (94.2% CSAT)',
    highlight: 'Captures "Silent Sufferers" via vernacular voice AI in 14 Indian languages',
    trend: '+38 pts NPS Uplift',
    trendType: 'positive',
    category: 'Customer Experience',
    benchmark: 'Vernacular Accessibility: 99.4% speech recognition accuracy',
    pillar: 'Newgen CCM & IDP'
  },
  {
    id: 'savings',
    title: 'Cost savings or productivity gain',
    value: '₹14.8 Cr',
    subtitle: '₹8.2 Cr Penalty Avoidance + ₹6.6 Cr Operations Cost Savings',
    highlight: '380% First-Year ROI with full payback achieved in 4.2 months',
    trend: '380% Y1 ROI',
    trendType: 'positive',
    category: 'Financial Productivity',
    benchmark: 'Annualized Savings for Mid-to-Large Commercial/PSU Bank',
    pillar: 'Entire NewgenONE Suite'
  }
];

export const PPT_SLIDES = [
  {
    slideNumber: 1,
    title: 'Title & One-Line Pitch',
    subtitle: 'TrustBridge: The Virtual Lok Adalat • Presented by Team NexusNodes',
    screenTarget: 'hero',
    bullets: [
      'The World\'s First Autonomous Multi-Agent Adjudicator & Self-Healing Ombudsman for BFSI.',
      'Developed by Team NexusNodes: 👑 Ragavendra M (Team Leader), 👑 Ashwin M (Team Member 1), 👑 Venkataraam VG (Team Member 2), 👑 Sruthi G (Team Member 3).',
      'Built natively on the 4 pillars of the NewgenONE Enterprise Platform (IDP, Agent Studio, BPM, CCM).',
      'Transforms grievance redressal from static ticket routing into autonomous, empathetic, pre-emptive arbitration.'
    ],
    speakerNotes: 'Good day judges, we are Team NexusNodes led by Ragavendra M with Ashwin, Venkataraam, and Sruthi. We present TrustBridge: a paradigm shift combining NewgenONE with multi-agent adversarial arbitration.'
  },
  {
    slideNumber: 2,
    title: 'Problem Statement: The Empathy & Efficiency Gap',
    subtitle: 'Why Current BFSI Redressal Systems Fail',
    screenTarget: 'intake',
    bullets: [
      'Blind to "Silent Sufferers": Rural & elderly citizens with low digital literacy cannot navigate complex web portals.',
      'Devoid of Empathy: A ₹500 subscription refund receives identical SLA treatment to a pensioner\'s blocked medical fund.',
      'Rigid & Costly: When RBI issues new circulars, banks take weeks of manual IT recoding, leading to hefty regulatory fines.'
    ],
    speakerNotes: 'Highlight the human toll. Show how an elderly pensioner whose chemotherapy money is stuck gets trapped in automated email replies. Show the stark contrast between standard SLA vs life-or-death urgency.'
  },
  {
    slideNumber: 3,
    title: 'Target Personas & User Ecosystem',
    subtitle: 'Designed for Every Stakeholder in the Justice Chain',
    screenTarget: 'hero',
    bullets: [
      'Primary: Rameshwar Prasad (68, Rural Pensioner) — WhatsApp voice note in Hindi, low digital literacy, emergency hospital funds.',
      'Secondary: Priya Sharma (BFSI Compliance Officer) — Drowning in 12k monthly complaints, zero-prep audit trail need.',
      'Tertiary: Dr. A.K. Sen (RBI Ombudsman Regulator) — Demands algorithmic explainability, fairness proof, and zero regulatory non-compliance.'
    ],
    speakerNotes: 'Emphasize that TrustBridge isn\'t just customer-facing; it links the rural citizen directly with bank operations and statutory regulators through an unassailable audit chain.'
  },
  {
    slideNumber: 4,
    title: 'Solution Overview: TrustBridge on NewgenONE',
    subtitle: 'From Reactive Ticket Routing to Autonomous Pre-emptive Arbitration',
    screenTarget: 'architecture',
    bullets: [
      'Multimodal Vernacular Intake: Ingests audio, video, and paper documents via Newgen IDP.',
      'Algorithmic Empathy Engine: Real-time vulnerability scoring that triggers 2-hour Dynamic SLA Bypasses.',
      'Virtual Lok Adalat Swarm: 3 AI agents (Advocate, Defender, Judge) debating to consensus.',
      'Pre-Emptive Ghost Grievances: Systemic telemetry-triggered self-healing before a user even complains.'
    ],
    speakerNotes: 'Position TrustBridge as the synthesis of empathetic AI and enterprise-grade process orchestration on NewgenONE.'
  },
  {
    slideNumber: 5,
    title: 'NewgenONE Platform Capabilities Used',
    subtitle: 'Architected Specifically Around Newgen\'s Four Pillars',
    screenTarget: 'architecture',
    bullets: [
      'Content Services & IDP ("The Senses"): Transcribes vernacular audio, extracts OCR from hospital slips, parses RBI PDF circulars.',
      'Agent Studio ("The Brain"): Powers the Algorithmic Empathy Engine and the 3-Agent Adversarial Lok Adalat Swarm.',
      'Low-Code BPM ("The Nervous System"): Dynamic SLA bypass routing, Core Banking API orchestration, batch refunds.',
      'CCM ("The Voice"): Generates personalized vernacular WhatsApp audio, SMS, and cryptographically verified legal award letters.'
    ],
    speakerNotes: 'Walk through the 4-pillar table. Judges will see how every single feature cleanly maps to NewgenONE enterprise components.'
  },
  {
    slideNumber: 6,
    title: 'End-to-End User Journey Walkthrough',
    subtitle: 'Live Interactive Flow from Voice Note to Restitution',
    screenTarget: 'intake',
    bullets: [
      'Step 1: Rameshwar sends a 20-second Hindi voice note on WhatsApp describing his ICU crisis.',
      'Step 2: Newgen IDP transcribes audio and extracts AIIMS admission document.',
      'Step 3: Empathy score hits 94/100 -> Instant "Code Red" SLA bypass (7 days -> 2 hours).',
      'Step 4: Dispute enters Agent Studio Lok Adalat for multi-agent arbitration.',
      'Step 5: ₹72,000 provisional restitution credited via Newgen BPM, with WhatsApp confirmation.'
    ],
    speakerNotes: 'Demonstrate the customer flow. Play the simulated voice waveform and watch the real-time translation and empathy meter spike.'
  },
  {
    slideNumber: 7,
    title: 'Where AI is Embedded in the Workflow',
    subtitle: 'Deeply Integrated Intelligence, Not Gimmicky Wrappers',
    screenTarget: 'lok-adalat',
    bullets: [
      'Empathy Tone Analysis: Evaluates linguistic duress, financial vulnerability, and hospital urgency.',
      'Adversarial Multi-Agent Debate: Customer Advocate argues consumer rights; Bank Defender verifies core banking logs; RBI Judge mediates statutory law.',
      'Explainability Ledger: Tamper-evident, timestamped transcript proving algorithmic fairness for statutory inspection.'
    ],
    speakerNotes: 'Focus on the debate arena. Show how 3 distinct agents with conflicting objectives converge into an equitable consensus with a verifiable audit ledger.'
  },
  {
    slideNumber: 8,
    title: 'System Architecture & Data Flow',
    subtitle: 'Enterprise-Grade Event-Driven Architecture',
    screenTarget: 'architecture',
    bullets: [
      'Reactive Channel: WhatsApp / Web / Branch Voice Ingestion -> IDP Pipeline.',
      'Proactive Channel: ATM / UPI Telemetry Event Stream -> BPM Ghost Trigger.',
      'Orchestration Layer: Newgen Low-Code BPM connecting Finacle/BaNCS CBS APIs.',
      'Audit & Security: Cryptographic hashing of every decision step for zero-prep RBI audits.'
    ],
    speakerNotes: 'Click "Trace Packet Flow" on screen 6 to show how data moves smoothly across IDP, Agent Studio, BPM, and CCM in real-time.'
  },
  {
    slideNumber: 9,
    title: 'Tangible Quantified Outcomes',
    subtitle: 'Demonstrated Impact Across Efficiency, Cost, and Inclusion',
    screenTarget: 'impact',
    bullets: [
      '82% Reduction in Processing Time: Standard 7-day turnaround compressed to 2.1 hours.',
      '76% Reduction in Manual Escalation: 14,000+ officer hours saved per month.',
      '₹14.8 Cr Annual Savings: ₹8.2 Cr in penalty avoidance plus ₹6.6 Cr in operational efficiencies.',
      '100% Explainable Audit Readiness: 0 regulatory non-compliance notices under RBI Integrated Ombudsman Scheme.'
    ],
    speakerNotes: 'Walk through the metrics dashboard and use the interactive ROI calculator to illustrate multi-crore savings for a typical bank.'
  },
  {
    slideNumber: 10,
    title: 'Core Differentiators & Innovation',
    subtitle: 'Why TrustBridge is Not Just Another Ticket Router',
    screenTarget: 'lok-adalat',
    bullets: [
      'From Ticket Router to Arbitrator: Competitors merely assign tickets; TrustBridge deliberates and executes binding restitution.',
      'From Reactive to Pre-Emptive: Self-healing "Ghost Grievance" engine cures outages before customers complain.',
      'Zero-Day Regulatory Self-Updating: IDP ingests regulatory PDFs and auto-updates BPM workflow rules with zero developer lag.'
    ],
    speakerNotes: 'Contrast legacy ticketing tools (ServiceNow/Freshdesk) with TrustBridge\'s autonomous multi-agent adjudication and self-healing telemetry.'
  },
  {
    slideNumber: 11,
    title: 'Commercial Viability & Roadmap',
    subtitle: 'Ready for Rollout Across Indian BFSI & CPGRAMS',
    screenTarget: 'impact',
    bullets: [
      'Market Size: 1.8 Billion annual digital disputes across Indian UPI, ATM, and credit networks.',
      'Deployment Model: Packaged NewgenONE Accelerator for PSBs, Private Banks, NBFCs, and Regulatory Portals.',
      'Phase 2 Expansion: IRDAI Insurance Claims Arbitration & CPGRAMS Central Public Grievance Portal integration.'
    ],
    speakerNotes: 'Close with the high-impact vision: restoring faith in digital banking for 1.4 billion Indians with NewgenONE at the core.'
  }
];
